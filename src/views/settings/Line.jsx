import React, { useState, useEffect } from 'react';
import { BASE_URL } from 'config/constant';
import axios from 'axios';
import { Row, Col, Card, Table, Form, Button, Modal } from 'react-bootstrap';

const Line = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [lines, setLines] = useState([]);
  const [selectedLine, setSelectedLine] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    warehouse_id: ''
  });

  const token = localStorage.getItem('token');
  const headers = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  // Fetch all lines
  const getLines = async () => {
    try {
      const response = await axios.get(`${BASE_URL}lines`, headers);
      setLines(response.data.data);
    } catch (error) {
      console.error('Error fetching lines:', error);
    }
  };

  // Fetch warehouses for dropdown
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
    getLines();
  }, []);

  const handleAddShow = (editStatus, line = null) => {
    setEdit(editStatus);
    setShowAdd(true);
    if (editStatus && line) {
      setSelectedLine(line);
      setFormData({
        name: line.name,
        warehouse_id: line.warehouse_id
      });
    } else {
      setFormData({ name: '', warehouse_id: '' });
    }
  };

  const handleAddClose = () => {
    setShowAdd(false);
    setEdit(false);
    setSelectedLine(null);
    setFormData({ name: '', warehouse_id: '' });
  };

  const handleDeleteShow = (line) => {
    setSelectedLine(line);
    setShowDelete(true);
  };

  const handleDeleteClose = () => {
    setShowDelete(false);
    setSelectedLine(null);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Create or Update line
  const handleSave = async () => {
    try {
      if (edit && selectedLine) {
        await axios.put(`${BASE_URL}lines/${selectedLine.id}`, formData, headers);
      } else {
        await axios.post(`${BASE_URL}lines`, formData, headers);
      }
      handleAddClose();
      getLines(); // Refresh
    } catch (error) {
      console.error('Error saving line:', error);
    }
  };

  // Delete line
  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}lines/${selectedLine.id}`, headers);
      handleDeleteClose();
      getLines(); // Refresh
    } catch (error) {
      console.error('Error deleting line:', error);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header className='d-flex justify-content-between align-items-center'>
              <Card.Title as="h5">Lines</Card.Title>
              <Button variant="primary" onClick={() => handleAddShow(false)}>Add Line</Button>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Line Name</th>
                    <th>Warehouse</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((line, index) => (
                    <tr key={line.id}>
                      <td>{index + 1}</td>
                      <td>{line.name}</td>
                      <td>{line.warehouse?.name || line.warehouse_id}</td>
                      <td>
                        <div className="d-flex gap-2 actions-btns">
                          <span className="feather icon-edit edit" onClick={() => handleAddShow(true, line)}></span>
                          <span className="feather icon-trash-2 delete" onClick={() => handleDeleteShow(line)}></span>
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
          <Modal.Title>{edit ? "Edit" : "Add"} Line</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="lineName">
                  <Form.Label>Line Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter line name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="warehouseID">
                  <Form.Label>Warehouse</Form.Label>
                  <Form.Control
                    as="select"
                    name="warehouse_id"
                    value={formData.warehouse_id}
                    onChange={handleChange}
                  >
                    <option value="">Select warehouse</option>
                    {warehouses.map((warehouse) => (
                      <option key={warehouse.id} value={warehouse.id}>
                        {warehouse.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
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
          <Modal.Title>Delete Line</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this line?</p>
          <strong className='danger-txt' style={{ fontWeight: '700' }}>Note:</strong> This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default Line;
