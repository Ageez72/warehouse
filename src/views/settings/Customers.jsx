import React, { useState, useEffect } from 'react';
import { BASE_URL } from 'config/constant';
import axios from 'axios';
import { Row, Col, Card, Table, Form, Button, Modal } from 'react-bootstrap';

const Customers = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customerIdToDelete, setCustomerIdToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const token = localStorage.getItem('token');

  // Fetch customers from the API
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}customers`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setCustomers(response.data.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Handle Add/ Edit customer modal
  const handleAddShow = (editStatus, customer = {}) => {
    setShowAdd(true);
    setEdit(editStatus);
    setFormData({
      name: customer.name || '',
      email: customer.email || '',
      phone: customer.phone || '',
      id: customer.id || '',
    });
  };

  const handleAddClose = () => {
    setShowAdd(false);
    setEdit(false);
  };

  // Handle delete confirmation
  const handleDeleteShow = (customerId) => {
    setCustomerIdToDelete(customerId);
    setShowDelete(true);
  };

  const handleDeleteClose = () => {
    setCustomerIdToDelete(null);
    setShowDelete(false);
  };

  const handleDeleteCustomer = async () => {
    try {
      await axios.delete(`${BASE_URL}customers/${customerIdToDelete}`,{
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setCustomers(customers.filter((customer) => customer.id !== customerIdToDelete));
      handleDeleteClose();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle add/edit form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        // Edit customer
        await axios.put(`${BASE_URL}customers/${formData.id}`, formData, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        // Add new customer
        await axios.post(`${BASE_URL}customers`, formData, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      }
      fetchCustomers(); // Re-fetch customers after add/edit
      handleAddClose();
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <Card.Title as="h5">Customers</Card.Title>
              <Button variant="primary" onClick={() => handleAddShow(false)}>
                Add Customer
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => (
                    <tr key={customer.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.phone}</td>
                      <td>
                        <div className="d-flex gap-2 actions-btns">
                          <span
                            className="feather icon-edit edit"
                            onClick={() => handleAddShow(true, customer)}
                          ></span>
                          <span
                            className="feather icon-trash-2 delete"
                            onClick={() => handleDeleteShow(customer.id)}
                          ></span>
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

      <Modal show={showAdd} onHide={handleAddClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{edit ? 'Edit' : 'Add'} Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={edit} // Disable on edit
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleAddClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={handleDeleteClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this customer?</p>
          <strong className="danger-txt" style={{ fontWeight: `700` }}>
            Note:
          </strong>{' '}
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteCustomer}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default Customers;
