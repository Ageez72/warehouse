import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from 'config/constant';

const Size = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [sizeName, setSizeName] = useState('');
  const [selectedSizeId, setSelectedSizeId] = useState(null);

  const token = localStorage.getItem('token');
  const headers = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  const getSizes = async () => {
    try {
      const res = await axios.get(`${BASE_URL}sizes`, headers);
      setSizes(res.data.data);
    } catch (err) {
      console.error('Error fetching sizes:', err);
    }
  };

  useEffect(() => {
    getSizes();
  }, []);

  const handleAddShow = (editStatus = false, size = null) => {
    setEdit(editStatus);
    setSizeName(editStatus && size ? size.name : '');
    setSelectedSizeId(editStatus && size ? size.id : null);
    setShowAdd(true);
  };

  const handleAddClose = () => {
    setShowAdd(false);
    setEdit(false);
    setSizeName('');
    setSelectedSizeId(null);
  };

  const handleDeleteShow = (id) => {
    setSelectedSizeId(id);
    setShowDelete(true);
  };

  const handleDeleteClose = () => {
    setShowDelete(false);
    setSelectedSizeId(null);
  };

  const handleSave = async () => {
    try {
      if (edit) {
        await axios.put(`${BASE_URL}sizes/${selectedSizeId}`, { name: sizeName }, headers);
      } else {
        await axios.post(`${BASE_URL}sizes`, { name: sizeName }, headers);
      }
      await getSizes();
      handleAddClose();
    } catch (error) {
      console.error('Error saving size:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}sizes/${selectedSizeId}`, headers);
      await getSizes();
      handleDeleteClose();
    } catch (error) {
      console.error('Error deleting size:', error);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header className='d-flex justify-content-between align-items-center'>
              <Card.Title as="h5">Sizes</Card.Title>
              <Button variant="primary" onClick={() => handleAddShow(false)}>
                Add Size
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sizes?.map((size, idx) => (
                    <tr key={size.id}>
                      <td>{idx + 1}</td>
                      <td>{size.name}</td>
                      <td>
                        <div className="d-flex gap-2 actions-btns">
                          <span className="feather icon-edit edit" onClick={() => handleAddShow(true, size)}></span>
                          <span className="feather icon-trash-2 delete" onClick={() => handleDeleteShow(size.id)}></span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add/Edit Modal */}
      <Modal show={showAdd} onHide={handleAddClose} centered >
        <Modal.Header closeButton>
          <Modal.Title>{edit ? "Edit" : "Add"} Size</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter size name"
                value={sizeName}
                onChange={(e) => setSizeName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDelete} onHide={handleDeleteClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Size</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this size?</p>
          <strong className='danger-txt' style={{ fontWeight: 700 }}>Note:</strong> This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default Size;
