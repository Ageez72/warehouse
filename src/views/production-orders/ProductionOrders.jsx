import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Table, Tabs, Tab, Form, Button, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { BASE_URL } from 'config/constant';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer } from 'react-toastify';
import { showToast } from 'components/ToastNotifier/ToastNotifier';
const handleAdd = () => showToast('success', 'add');
const handleEdit = () => showToast('edit', 'edit');
const handleDelete = () => showToast('delete', 'delete');
const handleError = () => showToast('error', 'error');
const handleUpdateError = () => showToast('updateError', 'updateError');
const handleCreateError = () => showToast('createError', 'createError');
const handleValidation = () => showToast('info', 'validation');

const productionOrders = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [salesOrders, setSalesOrders] = useState([]);
  const [salesOrdersProducts, setSalesOrdersProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [productionLine, setProductionLine] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [productionOrdersList, setProductionOrdersList] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [counter, setCounter] = useState(0);
  const [counterStatus, setCounterStatus] = useState("stop");
  const [counterPrevStatus, setCounterPrevStatus] = useState("");
  const [intervalId, setIntervalId] = useState(null);

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  const getSalesOrders = async () => {
    try {
      const response = await axios.get(`${BASE_URL}orders`, config);
      setSalesOrders(response.data.data.data);
    } catch (error) {
      handleError()
    }
  };

  const getSalesOrdersProducts = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}order-products/${id}`, config);
      setSalesOrdersProducts(response.data.data);
    } catch (error) {
      handleError()
    }
  };

  const getWarehouses = async (id, detailsID) => {
    getProductionDetails(detailsID)
    try {
      const response = await axios.get(`${BASE_URL}warehouses?product_id=${id}`, config);
      setWarehouses(response.data.data);
    } catch (error) {
      handleError()
    }
  };

  const getProductionDetails = (id) => {
    for (let i = 0; i < salesOrdersProducts.length; i++) {
      const element = salesOrdersProducts[i];
      if (id == element.id) {
        document.getElementById('size').value = element.size_id;
        document.getElementById('quantity').value = element.quantity;
      }
    }
  }

  const getProductionLine = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}lines?warehouse_id=${id}`, config);
      setProductionLine(response.data.data);
    } catch (error) {
      handleError()
    }
  };

  const getSizes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}sizes`, config);
      setSizes(response.data.data);
    } catch (error) {
      handleError()
    }
  };

  const getPriority = async () => {
    try {
      const response = await axios.get(`${BASE_URL}priorities`, config);
      setPriorities(response.data.data);
    } catch (error) {
      handleError()
    }
  };

  const getProductsOrdersList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}productions`, config);
      setProductionOrdersList(response.data.data);
      // setCounter(response.data.data[0].produced);
      setStartDate(response.data.data[0].start)
      setEndDate(response.data.data[0].end)
    } catch (error) {
      handleError()
    }
  };

  const getCountStatus = async () => {
    try {
      const response = await axios.get(`https://spartanapi.ngrok.app/line-1/status`);
      setCounter(response.data.status.length);
      setCounterStatus(response.data.current)
      setCounterPrevStatus(response.data.before)
      console.log(response.data.status.length);

      // if (response.data.before === "stop" && response.data.current === "start" || response.data.before === "push" && response.data.current === "start") {
      //   const id = setInterval(getCountStatusInterval, 15000); // 30000 ms = 30 Seconds
      //   setIntervalId(id);
      // }
    } catch (error) {
      handleError()
    }
  };

  const getCountStatusInterval = async () => {
    try {
      const response = await axios.get(`https://spartanapi.ngrok.app/line-1/status`);
      console.log(response.data.status.length);
      setCounter(response.data.status.length);
      setCounterStatus(response.data.current)
      setCounterPrevStatus(response.data.before)
    } catch (error) {
      handleError()
    }
  };

  useEffect(() => {
    getSalesOrders();
    getSizes();
    getPriority();
    getProductsOrdersList();
    getCountStatus();
  }, []);

  function formatDate(dateTimeString) {
    const date = new Date(dateTimeString);
    return date;
  }

  const resetForm = () => {
    document.getElementById('salesOrder').value = "";
    document.getElementById('product').value = "";
    document.getElementById('size').value = "";
    document.getElementById('quantity').value = "";
    document.getElementById('warehouse').value = "";
    document.getElementById('productionLine').value = "";
    document.getElementById('priority').value = "";
    document.getElementById('status')?.value;
  }

  const handleCreateProductionOrder = () => {
    const salesOrder = document.getElementById('salesOrder').value;
    const product = document.getElementById('product').value;
    const size = document.getElementById('size').value;
    const quantity = document.getElementById('quantity').value;
    const warehouse = document.getElementById('warehouse').value;
    const productionLine = document.getElementById('productionLine').value;
    const priority = document.getElementById('priority').value;
    const status = document.getElementById('status')?.value;

    let data;

    if (edit) {
      const startDateValue = startDate ? formatDate(startDate) : null;
      const endDateValue = endDate ? formatDate(endDate) : null;
      data = {
        status,
        start: formatDate(startDateValue),
        end: formatDate(endDateValue),
      };
    } else {
      data = {
        order_id: salesOrder,
        order_product_id: product && JSON?.parse(product).id,
        size,
        quantity,
        warehouse_id: warehouse,
        line_id: productionLine,
        priority_id: priority,
        status,
      };
    }

    if (edit) {
      data._method = "put";
    }
    if (!edit) {
      if (!salesOrder || !product || !size || !quantity || !priority) {
        handleValidation()
        return;
      }
    }

    if (edit && editingOrder) {
      axios.post(`${BASE_URL}productions/${editingOrder.id}`, data, config)
        .then(() => {
          setEdit(false);
          setEditingOrder(null);
          getProductsOrdersList();
          handleEdit()
          resetForm()
        })
        .catch((error) => {
          handleUpdateError()
        });
    } else {
      axios.post(`${BASE_URL}productions`, data, config)
        .then(() => {
          getProductsOrdersList();
          handleAdd()
          resetForm()
        })
        .catch((error) => {
          handleCreateError()
        });
    }
  };


  const handleEditProductionOrder = (order) => {
    setEdit(true);
    setEditingOrder(order);

    // Pre-fill the form manually (you might also consider controlled components for scalability)
    document.getElementById('salesOrder').value = order.order_id;
    getSalesOrdersProducts(order.order_id);

    setTimeout(() => {
      document.getElementById('product').value = JSON.stringify({ product_id: order.product.id, id: order.order_product_id });
      getWarehouses(order.product.id);

      setTimeout(() => {
        document.getElementById('warehouse').value = order.warehouse_id;
        getProductionLine(order.warehouse_id);

        setTimeout(() => {
          document.getElementById('productionLine').value = order.line_id;
        }, 300);
      }, 300);
    }, 300);

    document.getElementById('size').value = order.size.id;
    document.getElementById('quantity').value = order.quantity;
    document.getElementById('priority').value = order.priority_id;

    setTimeout(() => {
      document.getElementById('status').value = order.status;
    }, 300);

    setStartDate(order.start ? formatDate(order.start) : new Date());
    setEndDate(order.end ? formatDate(order.end) : new Date());
  };


  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = () => setShowDelete(true);

  const handleDeleteProductionOrder = async () => {
    console.log(selectedOrder);

    try {
      await axios.delete(`${BASE_URL}productions/${selectedOrder.id}`, config);
      let filteredData = productionOrdersList.filter(order => order.id !== selectedOrder.id)
      setProductionOrdersList(filteredData);
      handleDeleteClose();
      handleDelete()
    } catch (err) {
      handleError()
    }
  }

  const updateCountStatus = async (status, id) => {
    try {
      const response = await axios.post(`https://spartanapi.ngrok.app/line-1/${status}`);
      console.log(response.data);
      setCounter(response.data.status.length);
    } catch (error) {
      // handleError()
    }
  };


  const handleCounter = (e, status, order) => {
      const playBtn = document.querySelector("span.play");
      const stopBtn = document.querySelector("span.stop");

    // if (e && status !== "stop") {
    //   handleToggle(e, status)
    // } else {
    //   playBtn.classList.add("active");
    //   pauseBtn.classList.remove("active");
    //   parent.classList.remove("playing")
    // }

    if(status === 'play') {
      playBtn.classList.add("disabled")
      stopBtn.classList.remove("disabled")
    } else if(status === 'stop') {
      playBtn.classList.remove("disabled")
      stopBtn.classList.add("disabled")
    }else {
      playBtn.classList.remove("disabled")
      stopBtn.classList.remove("disabled")
    }

    if (status === "pause" || status === "play") {
      if (!intervalId) {
        const id = setInterval(getCountStatusInterval, 15000); // 30000 ms = 30 Seconds
        setIntervalId(id);
      }
    } else if (status === "stop") {
      if (intervalId) {
        clearInterval(intervalId);  // Stop the interval
        setIntervalId(null);
      }
    }
    console.log(status);
    console.log(counterStatus);
    console.log(counterPrevStatus);

    if (status === "play") { 
           
      axios.post(`${BASE_URL}productions/${order.id}`, {
        _method: "put",
        start: startDate || new Date(),
        status: "running"
      }, config)
        .then((res) => {
          getProductsOrdersList();
        })
        .catch((error) => {
          handleUpdateError()
        });
      updateCountStatus('start', order.id)
    } else if (status === "pause") {
      axios.post(`${BASE_URL}productions/${order.id}`, {
        _method: "put",
        produced: counter,
        end: new Date(),
      }, config)
        .then((res) => {
          getProductsOrdersList()
        })
        .catch((error) => {
          handleUpdateError()
        });
      updateCountStatus('push', order.id)
    } else if (status === "stop") {
      axios.post(`${BASE_URL}productions/${order.id}`, {
        _method: "put",
        produced: counter,
        end: new Date(),
      }, config)
        .then((res) => {
          getProductsOrdersList()
        })
        .catch((error) => {
          handleUpdateError()
        });
      updateCountStatus('stop', order.id)
    }
  }


  const handleToggle = (e, status) => {
    const parent = e.currentTarget.closest(".play-pause-btns");
    const playBtn = parent.querySelector(".play");
    const pauseBtn = parent.querySelector(".pause");

    // Toggle active class
    if (status === "play") {
      playBtn.classList.remove("active");
      pauseBtn.classList.add("active");
      parent.classList.add("playing")
    } else {
      playBtn.classList.add("active");
      pauseBtn.classList.remove("active");
      parent.classList.remove("playing")
    }
  };

  console.log(counter);
  
  return (
    <React.Fragment>
      <ToastContainer />
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body className='p-3'>
              <Form>
                <h5>New Production Order</h5>
                <Form.Group className="select-group mb-3" controlId="salesOrder">
                  <Form.Label>Sales Order <span className='required'>*</span></Form.Label>
                  <Form.Control as="select" disabled={edit} onChange={(e) => getSalesOrdersProducts(e.target.value)}>
                    <option value="">Select Sales Order</option>
                    {
                      salesOrders.map((order, index) => (
                        <option key={index} value={order.id}>{order.code}</option>
                      ))
                    }
                  </Form.Control>
                </Form.Group>
                <Form.Group className="select-group mb-3" controlId="product">
                  <Form.Label>Product <span className='required'>*</span></Form.Label>
                  <Form.Control
                    as="select"
                    disabled={edit}
                    onChange={(e) => {
                      const selected = JSON.parse(e.target.value);
                      getWarehouses(selected.product_id, selected.id);
                    }}
                  >
                    <option value="">Select Product</option>
                    {
                      salesOrdersProducts.map((product, index) => (
                        <option
                          key={index}
                          value={JSON.stringify({ product_id: product.product_id, id: product.id })}
                        >
                          {product.product.name}
                        </option>
                      ))
                    }
                  </Form.Control>
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="select-group mb-3" controlId="size">
                      <Form.Label>Size <span className='required'>*</span></Form.Label>
                      <Form.Control as="select" disabled={true}>
                        <option value="">Select Size</option>
                        {
                          sizes.map((size, index) => (
                            <option key={index} value={size.id}>{size.name}</option>
                          ))
                        }
                      </Form.Control>
                    </Form.Group>

                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="quantity">
                      <Form.Label>Quantity (Box) <span className='required'>*</span></Form.Label>
                      <Form.Control type="number" placeholder="Enter quantity" disabled={true} />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="select-group mb-3" controlId="warehouse">
                  <Form.Label>Warehouse</Form.Label>
                  <Form.Control as="select" disabled={edit} onChange={(e) => getProductionLine(e.target.value)}>
                    <option value="">Select Warehouse</option>
                    {
                      warehouses.map((warehouse, index) => (
                        <option key={index} value={warehouse.id}>{warehouse.name}</option>
                      ))
                    }
                  </Form.Control>
                </Form.Group>
                <Form.Group className="select-group mb-3" controlId="productionLine">
                  <Form.Label>Production Line</Form.Label>
                  <Form.Control as="select" disabled={edit}>
                    <option value="">Select Production Line</option>
                    {productionLine.map((line, index) => (
                      <option key={index} value={line.id}>{line.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group className="select-group mb-3" controlId="priority">
                  <Form.Label>Priority <span className='required'>*</span></Form.Label>
                  <Form.Control as="select" disabled={edit}>
                    <option value="">Select Priority</option>
                    {
                      priorities.map((priority, index) => (
                        <option key={index} value={priority.id}>{priority.name}</option>
                      ))
                    }
                  </Form.Control>
                </Form.Group>
                {
                  edit && (
                    <>
                      <Form.Group className="select-group mb-3" controlId="status">
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select">
                          <option value="">Select Status</option>
                          <option value="not started">Pending</option>
                          <option value="running">In Progress</option>
                          <option value="finished">Completed</option>
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
                    </>
                  )
                }
                <Col>
                  <Button className='w-100' variant="primary" onClick={handleCreateProductionOrder}>
                    <span className='feather icon-plus me-2'></span>
                    {edit ? 'Update Order' : 'Create Order'}
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
                        {/* <th>Progress</th> */}
                        <th>Status</th>
                        <th>Start Date - Time</th>
                        <th>End Date - Time</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        productionOrdersList.filter((status) => status.status !== "finished").map((order, i) => (
                          <tr key={order.id}>
                            <th scope="row">{order.order.code}</th>
                            <td>{order.product.code}</td>
                            <td>{order.size.name}</td>
                            <td>{order.quantity}</td>
                            <td>{i === 0 ? counter : "-"}</td>
                            <td>{order?.line?.name ? order?.line?.name : "-"}</td>
                            {/* <td>
                              <div className="progress" style={{ height: '7px' }}>
                                <div
                                  className={`progress-bar ${order.status === "not started" ? "bg-warning" : ""}`}
                                  role="progressbar"
                                  style={{ width: `${order.status === "not started" ? `0%` : "50%"}` }}
                                  aria-valuenow={`${order.status === "not started" ? `0` : "50"}`}
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                />
                              </div>
                            </td> */}
                            <td>
                              <span className={`badge ${order.status === "not started" ? "bg-warning" : "bg-primary"}`}>{order.status === "not started" ? "Pending" : "In Progress"}</span>
                            </td>
                            <td>{order.start ? order.start : "-"}</td>
                            <td>{order.end ? order.end : "-"}</td>
                            <td>
                              <div className="d-flex gap-2 actions-btns align-items-center">
                                {
                                  i === 0 && (
                                    <>
                                    <div className={`d-flex gap-2 align-items-center play-pause-btns playing`}>
                                      <span className={`feather icon-play play active`} title="Play" onClick={(e) => handleCounter(e, "play", order)}></span>
                                      <span className={`feather icon-pause pause active`} title="Pause" onClick={(e) => handleCounter(e, "pause", order)}></span>
                                    </div>
                                    <span className="feather icon-stop-circle stop" title='Stop' onClick={(e) => handleCounter(e, "stop", order)}></span>
                                    </>
                                  )
                                }
                                {/* <span className="feather icon-edit edit" onClick={() => handleEditProductionOrder(order)}></span> */}
                                <span className="feather icon-trash-2 delete" onClick={() => { handleDeleteShow(); setSelectedOrder(order) }}></span>
                              </div>
                            </td>
                          </tr>
                        ))
                      }
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
                      {
                        productionOrdersList.filter((status) => status.status === "finished").map((order) => (
                          <tr key={order.id}>
                            <th scope="row">{order.order.code}</th>
                            <td>{order.product.code}</td>
                            <td>{order.size.name}</td>
                            <td>{order.quantity}</td>
                            <td>-</td>
                            <td>{order.line.name}</td>
                            <td>
                              <div className="progress" style={{ height: '7px' }}>
                                <div
                                  className={`progress-bar bg-success`}
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
                            <td>{order.start ? order.start : "-"}</td>
                            <td>{order.end ? order.end : "-"}</td>
                            <td>
                              <div className="d-flex gap-2 actions-btns">
                                <span className="feather icon-trash-2 delete" onClick={handleDeleteShow}></span>
                              </div>
                            </td>
                          </tr>
                        ))
                      }
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
          <Button variant="danger" onClick={handleDeleteProductionOrder}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default productionOrders;
