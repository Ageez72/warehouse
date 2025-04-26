import React, { useRef, useState } from 'react';
import QRCodeImage from 'components/QRCodeImage/QRCodeImage';
import { Row, Col, Card, Table, Form, Button } from 'react-bootstrap';

const Palletizing = () => {
  const qrRef = useRef();
  const [orderType, setOrderType] = useState("Production Order");

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
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                  </Form.Group>
                )}
                <Form.Group className="mb-3" controlId="palletCapacity">
                  <Form.Label>Pallet Capacity</Form.Label>
                  <Form.Control type="number" placeholder="Enter Pallet Capacity" />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="select-group mb-3" controlId="warehouseFrom">
                      <Form.Label>Warehouse From</Form.Label>
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
                    <Form.Group className="select-group mb-3" controlId="warehouseTo">
                      <Form.Label>Warehouse To</Form.Label>
                      <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="select-group mb-3" controlId="lineID">
                  <Form.Label>Line ID</Form.Label>
                  <Form.Control as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
                <Col>
                  <Button className='w-100' variant="primary" onClick={() => { }}>
                    <span className='feather icon-plus me-2'></span>
                    Create Order
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
                  <tr>
                    <th scope="row">PL-00045</th>
                    <td>20</td>
                    <td>
                      <QRCodeImage ref={qrRef} value="https://digixtech.com" size={60} />
                    </td>
                    <td>
                      <a onClick={handleDownload} style={{ cursor: 'pointer' }}>
                        <span className='feather icon-printer me-2'></span>
                        Print
                      </a>
                    </td>
                  </tr>
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
