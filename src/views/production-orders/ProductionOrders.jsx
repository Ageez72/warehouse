import React, { useState } from 'react';
import { Row, Col, Card, Table, Tabs, Tab, Form, Button, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const productionOrders = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  
  const [startDate, setStartDate] = useState(new Date("2025/04/25 6:00 PM"));
  const [endDate, setEndDate] = useState(null);

  const handleEditOrder = (editSatus) => {
    setEdit(editSatus);
  };
  const handleHideEditOrder = (editSatus) => {
    setEdit(false);
  };


  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = () => setShowDelete(true);
  return (
    <React.Fragment>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body className='p-3'>
              <Form>
                <h5>New Production Order</h5>
                <Form.Group className="mb-3" controlId="salesOrder">
                  <Form.Label>Sales Order</Form.Label>
                  <Form.Control as="select" disabled={edit}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="product">
                  <Form.Label>Product</Form.Label>
                  <Form.Control as="select" disabled={edit}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="size">
                      <Form.Label>Size</Form.Label>
                      <Form.Control as="select" disabled={edit}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group>

                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="quantity">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control type="number" placeholder="Enter quantity" disabled={edit} />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="warehouse">
                  <Form.Label>Warehouse</Form.Label>
                  <Form.Control as="select" disabled={edit}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="productionLine">
                  <Form.Label>Production Line</Form.Label>
                  <Form.Control as="select" disabled={edit}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Priority">
                  <Form.Label>Priority</Form.Label>
                  <Form.Control as="select" disabled={edit}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="status">
                  <Form.Label>Status</Form.Label>
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
                    <Form.Group className="mb-3" controlId="startDate">
                      <Form.Label>Start Date</Form.Label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        dateFormat="yyyy/MM/dd h:mm aa"
                        className="form-control"
                        placeholderText="Select start date & time"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="endDate">
                      <Form.Label>End Date</Form.Label>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        showTimeSelect
                        dateFormat="yyyy/MM/dd h:mm aa"
                        className="form-control"
                        placeholderText="Select end date & time"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Col>
                  <Button className='w-100' variant="primary" onClick={handleHideEditOrder}>
                    <span className='feather icon-plus me-2'></span>
                    Create Order
                  </Button>
                </Col>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body className='p-0'>
              <Tabs variant="pills" defaultActiveKey="active">
                <Tab eventKey="active" title="ACTIVE">
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Order #</th>
                        <th>Product</th>
                        <th>Size</th>
                        <th>Qty</th>
                        <th>Produced</th>
                        <th>Line</th>
                        <th>Progress</th>
                        <th>Status</th>
                        <th>Start Date - Time</th>
                        <th>End Date - Time</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">PO-101</th>
                        <td>Widget A</td>
                        <td>Medium</td>
                        <td>500</td>
                        <td>-</td>
                        <td>Line 1</td>
                        <td>
                          <div className="progress" style={{ height: '7px' }}>
                            <div
                              className={`progress-bar`}
                              role="progressbar"
                              style={{ width: `50%` }}
                              aria-valuenow={70}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            />
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-warning">In Progress</span>
                        </td>
                        <td>2025/10/01 - 10:00 AM</td>
                        <td>2025/10/15 - 10:00 AM</td>
                        <td>
                          <div className="d-flex gap-2 actions-btns">
                            <span className="feather icon-edit edit" onClick={() => handleEditOrder(true)}></span>
                            <span className="feather icon-trash-2 delete" onClick={handleDeleteShow}></span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Tab>
                <Tab eventKey="completed" title="COMPLETED">
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Order #</th>
                        <th>Product</th>
                        <th>Size</th>
                        <th>Qty</th>
                        <th>Produced</th>
                        <th>Line</th>
                        <th>Progress</th>
                        <th>Status</th>
                        <th>Start Date - Time</th>
                        <th>End Date - Time</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">PO-101</th>
                        <td>Widget A</td>
                        <td>Medium</td>
                        <td>500</td>
                        <td>-</td>
                        <td>Line 1</td>
                        <td>
                          <div className="progress" style={{ height: '7px' }}>
                            <div
                              className={`progress-bar progress-c-green`}
                              role="progressbar"
                              style={{ width: `100%` }}
                              aria-valuenow={100}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            />
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-success">Completed</span>
                        </td>
                        <td>2025/10/01 - 10:00</td>
                        <td>2025/10/15 - 10:00</td>
                        <td>
                          <div className="d-flex gap-2 actions-btns">
                            {/* <span className="feather icon-edit edit"></span> */}
                            <span className="feather icon-trash-2 delete"></span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={showDelete} onHide={handleDeleteClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete this user?
          </p>
          <strong className='danger-txt' style={{ fontWeight: `700` }}>Note:</strong> This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteClose}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default productionOrders;
