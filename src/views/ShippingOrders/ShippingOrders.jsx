import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from 'config/constant';
import { Row, Col, Card, Table, Tabs, Tab, Modal, Button, Form } from 'react-bootstrap';
import AssignShipping from 'components/AssignShipping/AssignShipping';

const ShippingOrders = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [docksList, setDocksList] = useState([]);
  const [docksShippingList, setDocksShippingList] = useState([]);
  const [salesOrdersList, setSalesOrdersList] = useState([]);
  const [refreahData, setRefreahData] = useState([]);
  const [formData, setFormData] = useState([{
    id: null,
    status: ""
  }]);


  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docksRes = await axios.get(`${BASE_URL}docks`, config);
        const ordersRes = await axios.get(`${BASE_URL}orders`, config);

        setDocksList(docksRes.data.data.all);
        setDocksShippingList(docksRes.data.data.shipping);
        setSalesOrdersList(ordersRes.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [refreahData]);

  const tabs = [
    { key: 'allDocks', title: 'All Docks', filter: () => true },
    { key: 'docksOne', title: 'Docks 1', filter: item => item.name === 'dock1' },
    { key: 'docksTwo', title: 'Docks 2', filter: item => item.name === 'dock2' },
    { key: 'docksThree', title: 'Docks 3', filter: item => item.name === 'dock3' },
  ];


  const handleEditOrder = (item) => {
    setShowEditModal(true);
    setFormData({
      id: item.id,
      status: item.status
    });
  }

  const handleDeleteOrder = (item) => {
    setShowDeleteModal(true);
    setFormData({
      id: item.id,
    });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}docks/${formData.id}`, {
        status: formData.status,
        _method: 'put',
      }, config);
      setShowEditModal(false);
      setRefreahData(prev => !prev); // trigger refresh
    } catch (error) {
      console.error('Error updating dock:', error);
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}docks/${formData.id}`, config);
      setShowDeleteModal(false);
      setRefreahData(prev => !prev); // refresh data
    } catch (error) {
      console.error('Error deleting dock:', error);
    }
  };

  const ShippingQueue = ({ list }) => (
    <Card className='mb-4'>
      <Card.Header className='d-flex justify-content-between align-items-center'>
        <Card.Title as="h5">Shipping Queue</Card.Title>
      </Card.Header>
      <Card.Body className='px-3 pb-0 pt-3'>
        <Row className='m-0'>
          {list.length > 0 ? list.map((item, index) => (
            <Col key={index} className='shipping-queue-item p-0' md={12}>
              <Row className='m-0'>
                <Col md={'auto'}>
                  <span className='shipping-number'>{item.code}</span>
                </Col>
                <Col>
                  <span className='dock-number'>{item.name}</span>
                </Col>
                <Col md={2}>
                  <span className='shipping-time'>{item.time}</span>
                </Col>
              </Row>
            </Col>
          )) : (
            <span className='shipping-number dark-txt text-center pb-3'>No Shipping Queue</span>
          )}
        </Row>
      </Card.Body>
    </Card>
  );

  const DocksTable = ({ list }) => (
    <Card className='table-card'>
      <Card.Body className='px-0 pb-0 pt-3'>
        <Table responsive hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Scheduled Time</th>
              <th>Dock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? list.map((item, index) => (
              <tr key={index}>
                <th scope="row">{item.order.code}</th>
                <td>{item.customer.name}</td>
                <td>{item.time}</td>
                <td>{item.name}</td>
                <td>
                  <span
                    className={`badge ${item.status === 'loading'
                        ? 'bg-warning'
                        : item.status === 'shipping'
                          ? 'bg-primary'
                          : item.status === 'shipped'
                            ? 'bg-success'
                            : 'bg-secondary'
                      }`}
                  >
                    {item.status}
                  </span>

                </td>
                <td>
                  <div className="d-flex gap-2 actions-btns">
                    <span className="feather icon-edit edit" onClick={() => handleEditOrder(item)}></span>
                    <span className="feather icon-trash-2 delete" onClick={() => handleDeleteOrder(item)}></span>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );


  return (
    <>
      <Card className='mb-4'>
        <Card.Body className='px-3 pb-0 pt-3'>
          <AssignShipping list={salesOrdersList} onAssign={() => setRefreahData(!refreahData)} />
        </Card.Body>
      </Card>

      <Tabs variant="pills" defaultActiveKey="allDocks" className='custom-tabs'>
        {tabs.map(({ key, title, filter }) => {
          const filteredDocks = docksList.filter(filter);
          const filteredShipping = docksShippingList.filter(filter);
          return (
            <Tab eventKey={key} title={title} key={key}>
              <ShippingQueue list={filteredShipping} />
              <DocksTable list={filteredDocks} />
            </Tab>
          );
        })}
      </Tabs>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, status: e.target.value }))
                    }
                  >
                    <option value="">Select Status</option>
                    <option value="loading">Loading</option>
                    <option value="shipping">Shipping</option>
                    <option value="shipped">Shipped</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteModal} onHide={setShowDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this Order?</p>
          <strong className="danger-txt" style={{ fontWeight: `700` }}>
            Note:
          </strong>{' '}
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShippingOrders;
