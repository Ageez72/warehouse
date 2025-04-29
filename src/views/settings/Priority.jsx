import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from 'config/constant';

const Priority = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [priorities, setPriorities] = useState([]);
  const [priorityName, setPriorityName] = useState('');
  const [selectedPriorityId, setSelectedPriorityId] = useState(null);

  const token = localStorage.getItem('token');
  const headers = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  const getPriorities = async () => {
    try {
      const res = await axios.get(`${BASE_URL}priorities`, headers);
      setPriorities(res.data.data);
    } catch (err) {
      console.error('Error fetching priorities:', err);
    }
  };

  useEffect(() => {
    getPriorities();
  }, []);

  const handleAddShow = (editStatus = false, priority = null) => {
    setEdit(editStatus);
    setPriorityName(editStatus && priority ? priority.name : '');
    setSelectedPriorityId(editStatus && priority ? priority.id : null);
    setShowAdd(true);
  };

  const handleAddClose = () => {
    setShowAdd(false);
    setEdit(false);
    setPriorityName('');
    setSelectedPriorityId(null);
  };

  const handleDeleteShow = (id) => {
    setSelectedPriorityId(id);
    setShowDelete(true);
  };

  const handleDeleteClose = () => {
    setShowDelete(false);
    setSelectedPriorityId(null);
  };

  const handleSave = async () => {
    try {
      if (edit) {
        await axios.put(`${BASE_URL}priorities/${selectedPriorityId}`, { name: priorityName }, headers);
      } else {
        await axios.post(`${BASE_URL}priorities`, { name: priorityName }, headers);
      }
      await getPriorities();
      handleAddClose();
    } catch (error) {
      console.error('Error saving priority:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}priorities/${selectedPriorityId}`, headers);
      await getPriorities();
      handleDeleteClose();
    } catch (error) {
      console.error('Error deleting priority:', error);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header className='d-flex justify-content-between align-items-center'>
              <Card.Title as="h5">Priorities</Card.Title>
              <Button variant="primary" onClick={() => handleAddShow(false)}>
                Add priority
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
                  {priorities?.map((priorityName, idx) => (
                    <tr key={priorityName.id}>
                      <td>{idx + 1}</td>
                      <td>{priorityName.name}</td>
                      <td>
                        <div className="d-flex gap-2 actions-btns">
                          <span className="feather icon-edit edit" onClick={() => handleAddShow(true, priorityName)}></span>
                          <span className="feather icon-trash-2 delete" onClick={() => handleDeleteShow(priorityName.id)}></span>
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
          <Modal.Title>{edit ? "Edit" : "Add"} Priority</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter priority name"
                value={priorityName}
                onChange={(e) => setPriorityName(e.target.value)}
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
          <Modal.Title>Delete Priority</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this Priority?</p>
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

export default Priority;
