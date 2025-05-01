import React, { useRef, useState, useEffect } from 'react';
import QRCodeImage from 'components/QRCodeImage/QRCodeImage';
import { Row, Col, Card, Table, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from 'config/constant';

const Palletizing = () => {
  const qrRef = useRef();
  const [orderType, setOrderType] = useState("Production Order");
  const [palletizingList, setPalletizingList] = useState([]);
  const [productionOrders, setProductionOrders] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [lines, setLines] = useState([]);

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  const getPalletizingList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}pallets `, config);
      setPalletizingList(response.data.data);
    } catch (error) {
      console.error('Error fetching Palletizing List:', error);
    }
  };
  const getProductionOrders = async () => {
    try {
      const response = await axios.get(`${BASE_URL}productions `, config);
      setProductionOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching Production Orders List:', error);
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
      const response = await axios.get(`${BASE_URL}lines?warehouse=${id}`, config);
      setLines(response.data.data);
    } catch (error) {
      console.error('Error fetching getLines:', error);
    }
  };

  useEffect(() => {
    getPalletizingList();
    getProductionOrders();
    getWarehouses();
  }, []);

  const handleDownload = async () => {
    const dataUrl = qrRef.current?.getQRCodeUrl();
    console.log(dataUrl);

    if (dataUrl) {
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'pallet-qr-code.png';
      a.click();
    }
  };

  const handleCreatePallet = async () => {
    const palletData = {
      // orderType,
      production_id: orderType === "Production Order" ? document.getElementById('productionOrder').value : null,
      quantity: document.getElementById('palletCapacity').value,
      warehouse_from_id: document.getElementById('warehouseFrom').value,
      warehouse_to_id: document.getElementById('warehouseTo').value,
      line_id: document.getElementById('lineID').value
    };

    try {
      const response = await axios.post(`${BASE_URL}pallets`, palletData, config);
      console.log(response.data);
      getPalletizingList();
    } catch (error) {
      console.error('Error creating pallet:', error);
    }
  }
  return (
    <React.Fragment>
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
                  <Form.Group className="select-group mb-3" controlId="productionOrder">
                    <Form.Label>Production Order</Form.Label>
                    <Form.Control as="select">
                      <option value="">Select Production Order</option>
                      {productionOrders.map((item, index) => (
                        <option key={index} value={item.id}>{item.order.code}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                )}
                <Form.Group className="mb-3" controlId="palletCapacity">
                  <Form.Label>Pallet Capacity</Form.Label>
                  <Form.Control type="number" placeholder="Enter Pallet Capacity" max={20}/>
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
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Pallet ID</th>
                    <th>Boxes</th>
                    <th>Label</th>
                    <th>Print</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    palletizingList.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{item.code}</th>
                        <td>{item.quantity}</td>
                        <td>
                          <QRCodeImage ref={qrRef} value={item.qr_code} size={60} />
                        </td>
                        <td>
                          <a onClick={handleDownload} style={{ cursor: 'pointer' }}>
                            <span className='feather icon-printer me-2'></span>
                            Print
                          </a>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Palletizing;
