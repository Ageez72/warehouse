import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from 'config/constant';
import axios from 'axios';
import { Row, Col, Card, Table, Button, Modal, Form, Pagination } from 'react-bootstrap';

const SalesOrders = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [salesOrdersList, setSalesOrdersList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [selectedOrderId, setSelectedOrderId] = useState(null);


  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const getSalesOrders = async (i) => {
    try {            
      const res = await axios.get(`${BASE_URL}orders?page=${i ? i : page}&limit=${limit}`, config);
      setSalesOrdersList(res.data.data.data);
      setTotal(res.data.data.meta.total);
      setLimit(res.data.data.meta.per_page);
      setPage(res.data.data.meta.current_page);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
    setTimeout(() => {
      
      getSalesOrders(newPage)
    }, 100);
  };


  useEffect(() => {
    getSalesOrders();
  }, []);

  const handleAddShow = (editSatus) => {
    setShowAdd(true);
    setEdit(editSatus);
  };

  const handleAddClose = () => {
    setShowAdd(false);
    setEdit(false);
  };

  const handleDeleteClose = () => setShowDelete(false);

  const handleDeleteShow = (orderId) => {
    setSelectedOrderId(orderId);
    setShowDelete(true);
  };

  const handleDeleteOrder = async () => {
    try {
      await axios.delete(`${BASE_URL}orders/${selectedOrderId}`, config);
      setSalesOrdersList(salesOrdersList.filter(order => order.id !== selectedOrderId));
      setShowDelete(false);
    } catch (err) {
      console.error('Error deleting order:', err);
    }
  };




  let active = page;
  let items = [];
  for (let number = 1; number <= 3; number++) {
    items.push(
      <Pagination>
        <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous
        </Pagination.Prev>
        {[...Array(Math.ceil(total / limit))].map((_, number) => (
          <Pagination.Item key={number + 1} active={number + 1 === page} onClick={() => handlePageChange(number + 1)}>
            {number + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page >= Math.ceil(total / limit)}>
          Next
        </Pagination.Next>
      </Pagination>
    );
  }

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header className='d-flex justify-content-between align-items-center'>
              <Card.Title as="h5">Sales Orders</Card.Title>
              <Button variant="primary" className='p-0 m-0'>
                <Link type="button" to="/create-sales-order" className='text-white text-decoration-none' style={{ padding: "10px 20px" }}>
                  <span className='feather icon-plus me-2'></span>
                  Add Sales Order
                </Link>
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Products</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    salesOrdersList?.map((order, idx) => (
                      <tr key={order.id}>
                        <th scope="row">{order.id}</th>
                        <td>{order.customer.name}</td>
                        <td>{order.products.length}</td>
                        <td>
                          <span className={`badge bg-${order.status === 'Shipped' ? 'success' : 'warning'}`}>{order.status}</span>
                        </td>
                        <td>
                          <div className="d-flex gap-2 actions-btns">
                            {/* <span className="feather icon-edit edit" onClick={() => handleAddShow(true)}></span> */}
                            <span className="feather icon-trash-2 delete" onClick={() => handleDeleteShow(order.id)}></span>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
              <Col className='justify-content-end d-flex mt-2'>
                <Pagination>
                  <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                    Previous
                  </Pagination.Prev>
                  {[...Array(Math.ceil(total / limit))].map((_, number) => (
                    <Pagination.Item key={number + 1} active={number + 1 === page} onClick={() => handlePageChange(number + 1)}>
                      {number + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page >= Math.ceil(total / limit)}>
                    Next
                  </Pagination.Next>
                </Pagination>

              </Col>
            </Card.Body>
          </Card>

        </Col>
      </Row>

      <Modal show={showAdd} onHide={handleAddClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{edit ? "Edit" : "Create"} Sales Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='mb-3'>Create a new sales order by selecting products and customer details</p>
          <Form>
            <Row>
              <Col md={6}>
                <Card>
                  <Card.Body className='p-3 pb-0'>
                    <h5>Customer Information</h5>
                    <Form.Group className="select-group mb-3" controlId="exampleForm.roleID">
                      <Form.Label>Select Customer</Form.Label>
                      <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group>
                  </Card.Body>
                </Card>

                <Card>
                  <Card.Body className='p-3'>
                    <h5>Add Products</h5>
                    <Form.Group className="select-group mb-3" controlId="exampleForm.roleID">
                      <Form.Label>Product Name</Form.Label>
                      <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="select-group mb-3" controlId="exampleForm.roleID">
                          <Form.Label>Size</Form.Label>
                          <Form.Control as="select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="select-group mb-3" controlId="exampleForm.roleID">
                          <Form.Label>Color</Form.Label>
                          <Form.Control as="select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Quantity</Form.Label>
                          <Form.Control type="text" placeholder="Quantity" />
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Button className='w-100' variant="primary" onClick={handleAddClose}>
                          <span className='feather icon-plus me-2'></span>
                          Add to Order
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card>
                  <Card.Body className='p-3 pb-0'>
                    <h5>Order Summary</h5>
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Size</th>
                          <th>Qty</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Product A</th>
                          <td>Medium</td>
                          <td>2</td>
                          <td>
                            <div className="d-flex gap-2 actions-btns">
                              <span className="feather icon-trash-2 delete" onClick={handleDeleteShow}></span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body className='p-3'>
                    <Row className='justify-content-between'>
                      <Col md={6}>
                        <p className='mb-0 dark-txt'>Total Items:</p>
                      </Col>
                      <Col className='text-end' md={6}>
                        <b className='dark-txt'>5</b>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
                <Col>
                  <Button className='w-100' variant="success" onClick={handleAddClose}>
                    <span className='feather icon-plus me-2'></span>
                    Add to Order
                  </Button>
                </Col>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={handleDeleteClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Sales Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete this Sales Order?
          </p>
          <strong className='danger-txt' style={{ fontWeight: `700` }}>Note:</strong> This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteOrder}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default SalesOrders;
