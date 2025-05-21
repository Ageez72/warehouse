import React, { useRef, useState, useEffect } from 'react';
import QRCodeImage from 'components/QRCodeImage/QRCodeImage';
import { Row, Col, Card, Table, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from 'config/constant';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastContainer } from 'react-toastify';
import { showToast } from 'components/ToastNotifier/ToastNotifier';

const handleAdd = () => showToast('success', 'add');
const handleDelete = () => showToast('delete', 'delete');
const handleError = () => showToast('error', 'error');
const handleSubmitError = () => showToast('submitError', 'submitError');
const handleValidation = () => showToast('info', 'validation');

const Palletizing = () => {
  const qrRef = useRef();
  const [showDelete, setShowDelete] = useState(false);
  const [orderType, setOrderType] = useState("Production Order");
  const [salesOrdersList, setSalesOrdersList] = useState([]);
  const [palletizingList, setPalletizingList] = useState([]);
  const [productionOrders, setProductionOrders] = useState([]);
  const [prodOrderDetails, setProdOrderDetails] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [lines, setLines] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [formData, setFormData] = useState({
    salesOrder: "",
    productionOrder: "",
    palletCapacity: "",
    warehouseFrom: "",
    warehouseTo: "",
    lineID: "",
  });

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  const getPalletizingList = async () => {
    try {
      const palletsResponse = await axios.get(`${BASE_URL}pallets `, config);

      setPalletizingList(palletsResponse.data.data);
    } catch (error) {
      console.error('Error fetching Palletizing List:', error);
    }
  };
  const getOrderList = async () => {
    try {
      const salesOrdersResponse = await axios.get(`${BASE_URL}orders`, config);

      setSalesOrdersList(salesOrdersResponse.data.data.data);
    } catch (error) {
      console.error('Error fetching Palletizing List:', error);
    }
  };
  const getWarehouses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}warehouses `, config);
      setWarehouses(response.data.data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };
  const getLines = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}lines?warehouse_id=${id}`, config);
      setLines(response.data.data);
    } catch (error) {
      console.error('Error fetching getLines:', error);
    }
  };

  useEffect(() => {
    getPalletizingList();
    getOrderList();
    // getProductionOrders();
    getWarehouses();
  }, []);

  const handleCreatePallet = async () => {
    let palletData;
    if (orderType === "Production Order") {
      palletData = {
        production_id: document.getElementById('productionOrder').value,
        quantity: document.getElementById('palletCapacity').value,
        warehouse_from_id: document.getElementById('warehouseFrom').value,
        warehouse_to_id: document.getElementById('warehouseTo').value,
        line_id: document.getElementById('lineID').value
      };
    } else {
      palletData = {
        quantity: document.getElementById('palletCapacity').value,
        warehouse_from_id: document.getElementById('warehouseFrom').value,
        warehouse_to_id: document.getElementById('warehouseTo').value,
        line_id: document.getElementById('lineID').value
      };
    }

    // Check if all required fields are filled
    for (let key in palletData) {
      if (!palletData[key]) {
        handleValidation()
        return;
      }
    }

    try {
      const response = await axios.post(`${BASE_URL}pallets`, palletData, config);
      handleAdd()
      if (orderType === "Production Order") {
        resetForm("sales");
      }else {
        resetForm();
      }
      getPalletizingList();
    } catch (error) {
      // handleSubmitError()
    }
  }

  const getSalesOrdersProducts = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}productions?order_id=${id}`, config);
      setProductionOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProductionOrders([]);
    }
  };

  const getProductionOrderInfo = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}productions/${id}`, config);
      setProdOrderDetails([response.data.data]);
    } catch (error) {
      setProdOrderDetails([])
      // handleError();
    }
  };

  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = () => setShowDelete(true);

  const handleDeleteProductionOrder = async () => {
    try {
      await axios.delete(`${BASE_URL}pallets/${selectedOrder.id}`, config);
      setPalletizingList(palletizingList.filter(order => order.id !== selectedOrder.id));
      handleDeleteClose();
      handleDelete()
      location.reload();
    } catch (err) {
      handleError()
    }
  }
  const resetForm = (sales) => {
    if(sales){
      // document.getElementById('salesOrder').value = "";
      // document.getElementById('productionOrder').value = "";
    }
    document.getElementById('palletCapacity').value = "";
    document.getElementById('warehouseFrom').value = "";
    document.getElementById('warehouseTo').value = "";
    document.getElementById('lineID').value = "";
    setOrderType("Production Order");
    setProdOrderDetails([]);
    setProductionOrders([]);
    setLines([]);
  }

  console.log(formData);


  return (
    <React.Fragment>
      <ToastContainer />
      <Row>
        <Col md={6} className="mb-3">
          <Card>
            <Card.Header>
              <Card.Title as="h5">Pallet Configuration</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Check inline
                    type="radio"
                    label="Production Order"
                    name="orderType"
                    id="supportedRadio21"
                    value="Production Order"
                    checked={orderType === "Production Order"}
                    onChange={(e) => setOrderType(e.target.value)}
                  />
                  <Form.Check inline
                    type="radio"
                    label="Random Palletizing"
                    name="orderType"
                    id="supportedRadio22"
                    value="Random Palletizing"
                    checked={orderType === "Random Palletizing"}
                    onChange={(e) => setOrderType(e.target.value)}
                  />
                </Form.Group>
                {orderType === "Production Order" && (
                  <>
                    <Form.Group className="select-group mb-3" controlId="salesOrder">
                      <Form.Label>Sales Order</Form.Label>
                      <Form.Control as="select" onChange={(e) => {
                        getSalesOrdersProducts(e.target.value)
                        setFormData({ ...formData, salesOrder: e.target.value })
                      }} value={formData.salesOrder}>
                        <option value="">Select Sales Order</option>
                        {
                          salesOrdersList?.map((order, index) => (
                            <option key={index} value={order.id}>{order.code}</option>
                          ))
                        }
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className="select-group mb-3" controlId="productionOrder">
                      <Form.Label>Production Order</Form.Label>
                      <Form.Control as="select" value={formData.productionOrder}
                        onChange={(e) => {
                          setFormData({ ...formData, productionOrder: e.target.value })
                          getProductionOrderInfo(e.target.value);
                        }}
                      >
                        <option value="">Select Production Order</option>
                        {
                          productionOrders.map((product, index) => (
                            <option
                              key={index}
                              value={product.id}
                            >
                              {product.product.name}
                            </option>
                          ))
                        }
                      </Form.Control>
                    </Form.Group>
                    {
                      prodOrderDetails.length > 0 && (
                        <Table responsive hover>
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Size</th>
                              <th>Qty</th>
                            </tr>
                          </thead>
                          <tbody>
                            {prodOrderDetails.length > 0 ? prodOrderDetails.map((item, index) => (
                              <tr key={index}>
                                <td>{item.code}</td>
                                <td>{item.size.name}</td>
                                <td>{item.quantity}</td>
                              </tr>
                            )) : (
                              <tr>
                                <td colSpan="6" className="text-center">No data available</td>
                              </tr>
                            )}
                          </tbody>
                        </Table>
                      )
                    }
                  </>
                )}
                <Form.Group className="mb-3" controlId="palletCapacity">
                  <Form.Label>Pallet Capacity</Form.Label>
                  <Form.Control type="number" placeholder="Enter Pallet Capacity" />
                  <p className='mt-1'>Standard capacity for this product: 20 boxes</p>
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="select-group mb-3" controlId="warehouseFrom">
                      <Form.Label>Warehouse From</Form.Label>
                      <Form.Control as="select">
                        <option value="">Warehouse From</option>
                        {
                          warehouses.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                          ))
                        }
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="select-group mb-3" controlId="warehouseTo">
                      <Form.Label>Warehouse To</Form.Label>
                      <Form.Control as="select" onChange={(e) => getLines(e.target.value)}>
                        <option value="">Warehouse To</option>
                        {
                          warehouses.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                          ))
                        }
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="select-group mb-3" controlId="lineID">
                  <Form.Label>Line ID</Form.Label>
                  <Form.Control as="select">
                    <option value="">Select Line ID</option>
                    {
                      lines.map((item, index) => (
                        <option key={index} value={item.id}>{item.name}</option>
                      ))
                    }
                  </Form.Control>
                </Form.Group>
                <Col>
                  <Button className='w-100' variant="primary" onClick={handleCreatePallet}>
                    <span className='feather icon-plus me-2'></span>
                    Create Pallet
                  </Button>
                </Col>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Created Pallets</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive hover className='pallets-table'>
                <thead>
                  <tr>
                    <th>Pallet ID</th>
                    <th>Boxes</th>
                    <th>Label</th>
                    <th>Print</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    palletizingList.length > 0 ? (
                      palletizingList?.map((item, index) => {

                        const handleDownload = async () => {
                          const canvas = await html2canvas(qrRef.current);
                          const imgData = canvas.toDataURL('image/png');

                          const pdf = new jsPDF();
                          pdf.addImage(imgData, 'PNG', 30, 20, 150, 150);

                          // Add text under the QR code
                          pdf.setFontSize(14);
                          pdf.text(`Sales Order: ${item?.order?.code ? item?.order?.code : "Random Order"}`, 20, 180);
                          pdf.text(`Boxes: ${item?.quantity}`, 130, 180);
                          pdf.text(`Pallet ID: ${item?.code}`, 20, 190);
                          // pdf.text(`Warehouse to: ${item.warehouse_to.name}`, 130, 190);
                          pdf.text(`Product: ${item?.product?.name}`, 130, 190);
                          pdf.text(`Date: ${item?.created_at}`, 20, 200);
                          // pdf.text(`Variants: ${item.quantity}`, 20, 210);

                          // pdf.save(`${item.code}.pdf`);
                          const blob = pdf.output('blob');
                          const blobUrl = URL.createObjectURL(blob);
                          // Open PDF in new tab
                          window.open(blobUrl, '_blank');
                        };

                        return (
                          <tr key={index}>
                            <th scope="row">{item.code}</th>
                            <td>{item.quantity}</td>
                            <td>
                              <QRCodeImage value={item.qr_code} size={60} />
                              <div ref={qrRef}
                                style={{
                                  width: '250px',
                                  height: '250px',
                                  border: '2px solid #000',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  margin: '0 auto',
                                  position: 'absolute',
                                  left: '-9999px',
                                }}
                              >
                                <QRCodeImage value={item.qr_code} size={300} />
                              </div>
                            </td>
                            <td>
                              <a onClick={handleDownload} style={{ cursor: 'pointer' }}>
                                <span className="feather icon-printer me-2"></span>
                                Print
                              </a>
                            </td>
                            <td>
                              <div className="d-flex gap-2 actions-btns">
                                <span className="feather icon-trash-2 delete" onClick={() => { handleDeleteShow(); setSelectedOrder(item) }}></span>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">No data available</td>
                      </tr>
                    )
                  }
                </tbody>
              </Table>
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
            Are you sure you want to delete this Pallet?
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

export default Palletizing;
