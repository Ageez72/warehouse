import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from 'config/constant';
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  ListGroup,
  Alert,
  Form,
  Table,
  Button
} from 'react-bootstrap';
import QrScanner from 'components/QrScanner/QrScanner';

const LoadingCheckpoint = () => {
  const [docksData, setDocksData] = useState([]);
  const [unLoadedPallets, setUnLoadedPallets] = useState([]);
  const [loadedPallets, setLoadedPallets] = useState([]);
  const [totalPallets, setTotalPallets] = useState([]);
  const [docksList, setDocksList] = useState([]);
  const [docksTimeList, setDocksTimeList] = useState([]);
  const [selectedDock, setSelectedDock] = useState('dock1');
  const [scannedCode, setScannedCode] = useState('');
  let progress = loadedPallets?.length;
  const progressPercent = (progress / totalPallets) * 100;

  

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  // const progressPercent = 0.5 * 100;

  const handleScan = (data) => {
    console.log(data);
    
    if (data && !loadedPallets.includes(data)) {
      setScannedCode(data);
      setLoadedPallets((prev) => [...prev, data]);
      handleLoadingCheckpoint(data)
    }
  };

  const handleLoadingCheckpoint = async (code) => {
    try {
      const response = await axios.get(`${BASE_URL}checkpoint?qr_code=${code}`, config);
      if (response.status === 200) {
        const responseCode = response.data.data;
        console.log(response.data.data.code);
        setLoadedPallets((prev) => prev.filter(p => p !== responseCode))
      } else {
        alert('Failed to assign shipping!');
      }
    } catch (error) {
      console.error('Error assigning shipping:', error);
      alert('Error assigning shipping!');
    }
  }

  useEffect(() => {
    setUnLoadedPallets([])
    setLoadedPallets([])            
    setTotalPallets([])
    progress = 0;

    const fetchData = async () => {
      try {
        const docksRes = await axios.get(`${BASE_URL}docks?dock=${selectedDock}`, config);
        setDocksData(docksRes.data.data.all);
        const list = docksRes.data.data.all;
        let dates = [];
        for (let i = 0; i < list.length; i++) {
          const el = list[i];
          dates.push(el.time)
        }
        const now = new Date();
    
        // Convert to Date objects
        const parsedDates = dates.map(date => new Date(date.replace(' ', 'T')));
    
        // Filter future dates and get the soonest one
        const futureDates = parsedDates.filter(date => date > now);
        const nextDate = futureDates.length > 0
          ? futureDates.reduce((a, b) => a < b ? a : b)
          : null;
    
        // Map to booleans
        const result = parsedDates.map(date => date.getTime() === nextDate?.getTime());
        if (result.length > 0) {
          result.map((el, i) => {
            // if (el === true && docksRes.data.data.all[i].order.pallets.length > 0) {              
            //   setUnLoadedPallets(docksRes.data.data.all[i].order.pallets.filter(el => el.status === "unloauded"));
            //   setLoadedPallets(docksRes.data.data.all[i].order.pallets.filter(el => el.status === "loaded"))
            //   setTotalPallets(docksRes.data.data.all[i].order.pallets.length)
            // } else {
            //   setUnLoadedPallets([])
            //   setLoadedPallets([])
            // }        
          })
        } else {
          setUnLoadedPallets([])
          setLoadedPallets([])
        }
        setDocksTimeList(result)
        setDocksList(docksRes.data.data.all);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [selectedDock]);

  const handleDocks = (dock) => {
    setSelectedDock(dock);
  }

  const getDockPallets = () => {
    const list = docksData;
    let dates = [];
    for (let i = 0; i < list.length; i++) {
      const el = list[i];
      dates.push(el.time)
    }
    const now = new Date();

    // Convert to Date objects
    const parsedDates = dates.map(date => new Date(date.replace(' ', 'T')));

    // Filter future dates and get the soonest one
    const futureDates = parsedDates.filter(date => date > now);
    const nextDate = futureDates.length > 0
      ? futureDates.reduce((a, b) => a < b ? a : b)
      : null;

    // Map to booleans
    const result = parsedDates.map(date => date.getTime() === nextDate?.getTime());
    console.log(result);
    
    if (result.length > 0) {
      result.map((el, i) => {
        if (el === true && list[i].order.pallets.length > 0) {              
          setUnLoadedPallets(list[i].order.pallets.filter(el => el.status === "unloauded"));
          setLoadedPallets(list[i].order.pallets.filter(el => el.status === "loaded"))
          setTotalPallets(list[i].order.pallets.length)
        } else {
          setUnLoadedPallets([])
          setLoadedPallets([])
        } 
      })
    } else {
      setUnLoadedPallets([])
      setLoadedPallets([])
    }
    setDocksTimeList(result)
    setDocksList(docksData);
  }
  
console.log(loadedPallets);

  return (
    <Container className="my-4">
      <Row className="g-4">
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title className="mb-3" as="h5">Docks</Card.Title>
              <Row>
                <Col md={6}>
                  <Form.Group className="select-group mb-3" controlId="productionLine">
                    <Form.Label>Dock Number</Form.Label>
                    <Form.Control as="select" onChange={(e) => handleDocks(e.target.value)}>
                      {/* <option value="">Select Dock</option> */}
                      <option value="dock1" selected>Dock 1</option>
                      <option value="dock2">Dock 2</option>
                      <option value="dock3">Dock 3</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    {/* <th>Pallet ID</th> */}
                    <th>Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {docksList.length > 0 ? docksList.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{item.order.code}</th>
                      <td>{item.customer.name}</td>
                      {/* <td>{item.name}</td> */}
                      <td>{item.time}</td>
                      <td>{docksTimeList[index] ?<Button onClick={() => getDockPallets()}>Start</Button> : "" }</td>
                      {/* <td>{docksTimeList[index] ? <span className="badge bg-info">Next</span> : ""}</td> */}
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
        </Col>
        <Col md={8}>
          <Card className="h-100">
            <Card.Header>
              <Card.Title className="mb-3" as="h5">Loading Checkpoint</Card.Title>
              <Card.Subtitle className="text-muted">
                Verify pallets against the shipping list
              </Card.Subtitle>
            </Card.Header>
            <Card.Body>
              <div className='instructions-card mb-3'>
                <h6><span className="feather icon-info me-2"></span> Scanning Instructions</h6>
                <ul className="mb-0">
                  <li>
                    <span className="feather icon-check-square me-2"></span>
                    Position pallet QR code within the scanner frame
                  </li>
                  <li>
                    <span className="feather icon-check-square me-2"></span>
                    Hold steady until verification completes
                  </li>
                </ul>
              </div>
              <QrScanner onScanSuccess={handleScan} />
              {scannedCode && (
                <Alert variant="success" className="mt-3 text-center">
                  ✅ Verified: {scannedCode}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Header>
              <Card.Title as="h5">Loading Progress</Card.Title>
            </Card.Header>
            <Card.Body>
              <h6 className="dark-txt progress-title">Progress</h6>
              <ProgressBar
                now={loadedPallets.length > 0 ? progressPercent  : 0}
                variant="success"
                className="mb-4"
              />

              <div className='pallets-items mt-5'>
                <h6 className="text-danger">
                  <span className='feather icon-check-circle me-2'></span>
                  UnLoaded Pallets
                </h6>
                <ListGroup variant="flush">
                  {unLoadedPallets.map((pallet, i) => (
                    <ListGroup.Item key={i} className="item-danger text-white">
                      {pallet.qr_code}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
              <div className='pallets-items mt-4'>
                <h6 className="text-success">
                  <span className='feather icon-check-circle me-2'></span>
                  Loaded Pallets</h6>
                <ListGroup variant="flush">
                  {loadedPallets?.map((pallet, i) => (
                    <ListGroup.Item key={i} className="item-success text-white">
                      {pallet.qr_code}
                      <span className='feather icon-check'></span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoadingCheckpoint;
