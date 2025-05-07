import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from 'config/constant';
import axios from 'axios';
import { Row, Col, Card, Table, Button, Modal, Form, Pagination } from 'react-bootstrap';

const SalesOrders = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [viewedDetails, setViewedDetails] = useState(false);
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

  const handleAddShow = (order) => {
    setShowDetails(true);    
    setViewedDetails(order)
  };

  const handleAddClose = () => {
    setShowDetails(false);
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
                        <th scope="row">{order.code}</th>
                        <td>{order.customer.name}</td>
                        <td>{order.products.length}</td>
                        <td>
                          <span className={`badge bg-${order.status === 'Shipped' ? 'success' : 'warning'}`}>{order.status}</span>
                        </td>
                        <td>
                          <div className="d-flex gap-2 actions-btns">
                            <span className="feather icon-eye view" onClick={() => handleAddShow(order)}></span>
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

      <Modal show={showDetails} onHide={handleAddClose} centered size="xl">
        <Modal.Body>
            <Row>
              <Col md={12}>
                <Card>
                  <Card.Body className='p-3 pb-0'>
                    <h5>Sales Order Summary</h5>
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Size</th>
                          <th>Qty</th>
                          <th>Color</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                    viewedDetails?.products?.map((prod, idx) => (
                      <tr key={prod.id}>
                        <th scope="row">{prod.product.name}</th>
                        <td>{prod.size.name}</td>
                        <td>{prod.quantity}</td>
                        <td>{prod.color.name}</td>
                      </tr>
                    ))
                  }
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
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
