import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from 'config/constant';

const Color = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [colors, setColors] = useState([]);
  const [colorName, setColorName] = useState('');
  const [selectedColorId, setSelectedColorId] = useState(null);

  const token = localStorage.getItem('token');
  const headers = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  const getColors = async () => {
    try {
      const res = await axios.get(`${BASE_URL}colors`, headers);
      setColors(res.data.data);
    } catch (err) {
      console.error('Error fetching colors:', err);
    }
  };

  useEffect(() => {
    getColors();
  }, []);

  const handleAddShow = (editStatus = false, color = null) => {
    setEdit(editStatus);
    setColorName(editStatus && color ? color.name : '');
    setSelectedColorId(editStatus && color ? color.id : null);
    setShowAdd(true);
  };

  const handleAddClose = () => {
    setShowAdd(false);
    setEdit(false);
    setColorName('');
    setSelectedColorId(null);
  };

  const handleDeleteShow = (id) => {
    setSelectedColorId(id);
    setShowDelete(true);
  };

  const handleDeleteClose = () => {
    setShowDelete(false);
    setSelectedColorId(null);
  };

  const handleSave = async () => {
    try {
      if (edit) {
        await axios.put(`${BASE_URL}colors/${selectedColorId}`, { name: colorName }, headers);
      } else {
        await axios.post(`${BASE_URL}colors`, { name: colorName }, headers);
      }
      await getColors();
      handleAddClose();
    } catch (error) {
      console.error('Error saving color:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}colors/${selectedColorId}`, headers);
      await getColors();
      handleDeleteClose();
    } catch (error) {
      console.error('Error deleting color:', error);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header className='d-flex justify-content-between align-items-center'>
              <Card.Title as="h5">colors</Card.Title>
              <Button variant="primary" onClick={() => handleAddShow(false)}>
                Add color
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
                  {colors?.map((color, idx) => (
                    <tr key={color.id}>
                      <td>{idx + 1}</td>
                      <td>{color.name}</td>
                      <td>
                        <div className="d-flex gap-2 actions-btns">
                          <span className="feather icon-edit edit" onClick={() => handleAddShow(true, color)}></span>
                          <span className="feather icon-trash-2 delete" onClick={() => handleDeleteShow(color.id)}></span>
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
          <Modal.Title>{edit ? "Edit" : "Add"} Color</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter color name"
                value={colorName}
                onChange={(e) => setColorName(e.target.value)}
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
          <Modal.Title>Delete Color</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this Color?</p>
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

export default Color;
