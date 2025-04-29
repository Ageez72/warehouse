import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Form, Button, Modal } from 'react-bootstrap';
import { BASE_URL } from 'config/constant';
import axios from 'axios';

const Warehouses = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [formData, setFormData] = useState({ name: '' });
  const [selectedId, setSelectedId] = useState(null);
  const token = localStorage.getItem('token');
  const headers = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
  // Fetch Warehouses
  const getWarehouses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}warehouses`, headers);
      setWarehouses(response.data.data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  useEffect(() => {
    getWarehouses();
  }, []);

  const handleAddShow = (editStatus = false, warehouse = null) => {
    setEdit(editStatus);
    setShowAdd(true);
    if (editStatus && warehouse) {
      setFormData({ name: warehouse.name });
      setSelectedId(warehouse.id);
    } else {
      setFormData({ name: '' });
      setSelectedId(null);
    }
  };

  const handleAddClose = () => {
    setShowAdd(false);
    setFormData({ name: '' });
    setSelectedId(null);
    setEdit(false);
  };

  const handleDeleteShow = (id) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  const handleDeleteClose = () => {
    setShowDelete(false);
    setSelectedId(null);
  };

  // Create or Update
  const handleSave = async () => {
    try {
      if (edit) {
        await axios.put(`${BASE_URL}warehouses/${selectedId}`, formData, headers);
      } else {
        await axios.post(`${BASE_URL}warehouses`, formData, headers);
      }
      handleAddClose();
      getWarehouses();
    } catch (error) {
      console.error('Error saving warehouse:', error);
    }
  };

  // Delete
  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}warehouses/${selectedId}`, headers);
      handleDeleteClose();
      getWarehouses();
    } catch (error) {
      console.error('Error deleting warehouse:', error);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header className='d-flex justify-content-between align-items-center'>
              <Card.Title as="h5">Warehouses</Card.Title>
              <Button variant="primary" onClick={() => handleAddShow(false)}>
                Add Warehouse
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
                  {warehouses.map((warehouse, index) => (
                    <tr key={warehouse.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{warehouse.name}</td>
                      <td>
                        <div className="d-flex gap-2 actions-btns">
                          <span className="feather icon-edit edit" onClick={() => handleAddShow(true, warehouse)}></span>
                          <span className="feather icon-trash-2 delete" onClick={() => handleDeleteShow(warehouse.id)}></span>
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
      <Modal show={showAdd} onHide={handleAddClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{edit ? 'Edit' : 'Add'} Warehouse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter warehouse name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddClose}>Close</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDelete} onHide={handleDeleteClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Warehouse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this warehouse?</p>
          <strong className='danger-txt' style={{ fontWeight: `700` }}>Note:</strong> This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default Warehouses;
