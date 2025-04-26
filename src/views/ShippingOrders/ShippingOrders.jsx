import React, { useState } from 'react';
import { Row, Col, Card, Table, Tabs, Tab, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ShippingOrders = () => {
  const [scheduleTime, setScheduleTime] = useState(null);
  return (
    <React.Fragment>
      <Tabs variant="pills" defaultActiveKey="allDocks" className='custom-tabs'>
        <Tab eventKey="allDocks" title="All Docks">
          <Card className='mb-4'>
            <Card.Body className='px-3 pb-0 pt-3'>
              <Form className="dock-form">
                <Row className='align-items-end'>
                  <Col md={3}>
                    <Form.Group className="select-group mb-3" controlId="salesOrder">
                      <Form.Label>Sales Order</Form.Label>
                      <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="select-group mb-3" controlId="salesOrder">
                      <Form.Label>Sales Order</Form.Label>
                      <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3 dateTimeInput" controlId="scheduleTime">
                      <Form.Label>Schedule Time</Form.Label>
                      <br />
                      <DatePicker
                        selected={scheduleTime}
                        onChange={(date) => setScheduleTime(date)}
                        showTimeSelect
                        dateFormat="yyyy/MM/dd h:mm aa"
                        className="form-control"
                        placeholderText="Select Schedule time"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Button className='w-100 mb-3' variant="success">
                      <span className='feather icon-calendar me-2'></span>
                      Assign Shipping
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
          <Card className='mb-4'>
            <Card.Header className='d-flex justify-content-between align-items-center'>
              <Card.Title as="h5">Shipping Queue</Card.Title>
            </Card.Header>
            <Card.Body className='px-3 pb-0 pt-3'>
              <Row className='m-0'>

                <Col className='shipping-queue-item p-0' md={12}>
                  <Row className='m-0'>
                    <Col md={'auto'}>
                      <span className='shipping-number'>SO-2025-001</span>
                    </Col>
                    <Col>
                      <span className='dock-number'>Dock 1</span>
                    </Col>
                    <Col md={2}>
                      <span className='shipping-time'>09:00 AM</span>
                    </Col>
                  </Row>
                </Col>
                <Col className='shipping-queue-item p-0' md={12}>
                  <Row className='m-0'>
                    <Col md={'auto'}>
                      <span className='shipping-number'>SO-2025-001</span>
                    </Col>
                    <Col>
                      <span className='dock-number'>Dock 1</span>
                    </Col>
                    <Col md={2}>
                      <span className='shipping-time'>09:00 AM</span>
                    </Col>
                  </Row>
                </Col>

              </Row>
            </Card.Body>
          </Card>
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
                  <tr>
                    <th scope="row">SO-2025-001</th>
                    <td>Acme Corp</td>
                    <td>2025-01-15 09:00</td>
                    <td>Dock 1</td>
                    <td>
                      <span className="badge bg-warning">In Progress</span>
                    </td>
                    <td>
                      <div className="d-flex gap-2 actions-btns">
                        <span className="feather icon-edit edit"></span>
                        <span className="feather icon-trash-2 delete"></span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="docksOne" title="Docks 1">
        <Card className='mb-4'>
            <Card.Body className='px-3 pb-0 pt-3'>
              <Form className="dock-form">
                <Row className='align-items-end'>
                  <Col md={3}>
                    <Form.Group className="select-group mb-3" controlId="salesOrder">
                      <Form.Label>Sales Order</Form.Label>
                      <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="select-group mb-3" controlId="salesOrder">
                      <Form.Label>Sales Order</Form.Label>
                      <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3 dateTimeInput" controlId="scheduleTime">
                      <Form.Label>Schedule Time</Form.Label>
                      <br />
                      <DatePicker
                        selected={scheduleTime}
                        onChange={(date) => setScheduleTime(date)}
                        showTimeSelect
                        dateFormat="yyyy/MM/dd h:mm aa"
                        className="form-control"
                        placeholderText="Select Schedule time"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Button className='w-100 mb-3' variant="success">
                      <span className='feather icon-calendar me-2'></span>
                      Assign Shipping
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
          <Card className='mb-4'>
            <Card.Header className='d-flex justify-content-between align-items-center'>
              <Card.Title as="h5">Shipping Queue</Card.Title>
            </Card.Header>
            <Card.Body className='px-3 pb-0 pt-3'>
              <Row className='m-0'>

                <Col className='shipping-queue-item p-0' md={12}>
                  <Row className='m-0'>
                    <Col md={'auto'}>
                      <span className='shipping-number'>SO-2025-001</span>
                    </Col>
                    <Col>
                      <span className='dock-number'>Dock 1</span>
                    </Col>
                    <Col md={2}>
                      <span className='shipping-time'>09:00 AM</span>
                    </Col>
                  </Row>
                </Col>
                <Col className='shipping-queue-item p-0' md={12}>
                  <Row className='m-0'>
                    <Col md={'auto'}>
                      <span className='shipping-number'>SO-2025-001</span>
                    </Col>
                    <Col>
                      <span className='dock-number'>Dock 1</span>
                    </Col>
                    <Col md={2}>
                      <span className='shipping-time'>09:00 AM</span>
                    </Col>
                  </Row>
                </Col>

              </Row>
            </Card.Body>
          </Card>
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
                  <tr>
                    <th scope="row">SO-2025-001</th>
                    <td>Acme Corp</td>
                    <td>2025-01-15 09:00</td>
                    <td>Dock 1</td>
                    <td>
                      <span className="badge bg-warning">In Progress</span>
                    </td>
                    <td>
                      <div className="d-flex gap-2 actions-btns">
                        <span className="feather icon-edit edit"></span>
                        <span className="feather icon-trash-2 delete"></span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="docksTwo" title="Docks 2">
        <Card className='mb-4'>
            <Card.Body className='px-3 pb-0 pt-3'>
              <Form className="dock-form">
                <Row className='align-items-end'>
                  <Col md={3}>
                    <Form.Group className="select-group mb-3" controlId="salesOrder">
                      <Form.Label>Sales Order</Form.Label>
                      <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="select-group mb-3" controlId="salesOrder">
                      <Form.Label>Sales Order</Form.Label>
                      <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3 dateTimeInput" controlId="scheduleTime">
                      <Form.Label>Schedule Time</Form.Label>
                      <br />
                      <DatePicker
                        selected={scheduleTime}
                        onChange={(date) => setScheduleTime(date)}
                        showTimeSelect
                        dateFormat="yyyy/MM/dd h:mm aa"
                        className="form-control"
                        placeholderText="Select Schedule time"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Button className='w-100 mb-3' variant="success">
                      <span className='feather icon-calendar me-2'></span>
                      Assign Shipping
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
          <Card className='mb-4'>
            <Card.Header className='d-flex justify-content-between align-items-center'>
              <Card.Title as="h5">Shipping Queue</Card.Title>
            </Card.Header>
            <Card.Body className='px-3 pb-0 pt-3'>
              <Row className='m-0'>

                <Col className='shipping-queue-item p-0' md={12}>
                  <Row className='m-0'>
                    <Col md={'auto'}>
                      <span className='shipping-number'>SO-2025-001</span>
                    </Col>
                    <Col>
                      <span className='dock-number'>Dock 1</span>
                    </Col>
                    <Col md={2}>
                      <span className='shipping-time'>09:00 AM</span>
                    </Col>
                  </Row>
                </Col>
                <Col className='shipping-queue-item p-0' md={12}>
                  <Row className='m-0'>
                    <Col md={'auto'}>
                      <span className='shipping-number'>SO-2025-001</span>
                    </Col>
                    <Col>
                      <span className='dock-number'>Dock 1</span>
                    </Col>
                    <Col md={2}>
                      <span className='shipping-time'>09:00 AM</span>
                    </Col>
                  </Row>
                </Col>

              </Row>
            </Card.Body>
          </Card>
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
                  <tr>
                    <th scope="row">SO-2025-001</th>
                    <td>Acme Corp</td>
                    <td>2025-01-15 09:00</td>
                    <td>Dock 1</td>
                    <td>
                      <span className="badge bg-warning">In Progress</span>
                    </td>
                    <td>
                      <div className="d-flex gap-2 actions-btns">
                        <span className="feather icon-edit edit"></span>
                        <span className="feather icon-trash-2 delete"></span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="docksThree" title="Docks 3">
        <Card className='mb-4'>
            <Card.Body className='px-3 pb-0 pt-3'>
              <Form className="dock-form">
                <Row className='align-items-end'>
                  <Col md={3}>
                    <Form.Group className="select-group mb-3" controlId="salesOrder">
                      <Form.Label>Sales Order</Form.Label>
                      <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="select-group mb-3" controlId="salesOrder">
                      <Form.Label>Sales Order</Form.Label>
                      <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3 dateTimeInput" controlId="scheduleTime">
                      <Form.Label>Schedule Time</Form.Label>
                      <br />
                      <DatePicker
                        selected={scheduleTime}
                        onChange={(date) => setScheduleTime(date)}
                        showTimeSelect
                        dateFormat="yyyy/MM/dd h:mm aa"
                        className="form-control"
                        placeholderText="Select Schedule time"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Button className='w-100 mb-3' variant="success">
                      <span className='feather icon-calendar me-2'></span>
                      Assign Shipping
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
          <Card className='mb-4'>
            <Card.Header className='d-flex justify-content-between align-items-center'>
              <Card.Title as="h5">Shipping Queue</Card.Title>
            </Card.Header>
            <Card.Body className='px-3 pb-0 pt-3'>
              <Row className='m-0'>

                <Col className='shipping-queue-item p-0' md={12}>
                  <Row className='m-0'>
                    <Col md={'auto'}>
                      <span className='shipping-number'>SO-2025-001</span>
                    </Col>
                    <Col>
                      <span className='dock-number'>Dock 1</span>
                    </Col>
                    <Col md={2}>
                      <span className='shipping-time'>09:00 AM</span>
                    </Col>
                  </Row>
                </Col>
                <Col className='shipping-queue-item p-0' md={12}>
                  <Row className='m-0'>
                    <Col md={'auto'}>
                      <span className='shipping-number'>SO-2025-001</span>
                    </Col>
                    <Col>
                      <span className='dock-number'>Dock 1</span>
                    </Col>
                    <Col md={2}>
                      <span className='shipping-time'>09:00 AM</span>
                    </Col>
                  </Row>
                </Col>

              </Row>
            </Card.Body>
          </Card>
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
                  <tr>
                    <th scope="row">SO-2025-001</th>
                    <td>Acme Corp</td>
                    <td>2025-01-15 09:00</td>
                    <td>Dock 1</td>
                    <td>
                      <span className="badge bg-warning">In Progress</span>
                    </td>
                    <td>
                      <div className="d-flex gap-2 actions-btns">
                        <span className="feather icon-edit edit"></span>
                        <span className="feather icon-trash-2 delete"></span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </React.Fragment>
  );
};

export default ShippingOrders;
