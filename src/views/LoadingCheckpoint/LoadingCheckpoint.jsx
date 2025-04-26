import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  ListGroup,
  Alert,
} from 'react-bootstrap';
import QrScanner from 'components/QrScanner/QrScanner';

const LoadingCheckpoint = () => {
  const [loadedPallets, setLoadedPallets] = useState(['PAL-2025-089', 'PAL-2025-088']);
  const [unloadedPallets, setUnloadedPallets] = useState(['PAL-2025-090', 'PAL-2025-091']);
  const [scannedCode, setScannedCode] = useState('');
  const totalPallets = 12;
  const progress = loadedPallets.length;
  // const progressPercent = (progress / totalPallets) * 100;
  const progressPercent = 0.5 * 100;

  const handleScan = (data) => {
    if (data && !loadedPallets.includes(data)) {
      setScannedCode(data);
      setLoadedPallets((prev) => [...prev, data]);
      setUnloadedPallets((prev) => prev.filter(p => p !== data));
    }
  };

  return (
    <Container className="my-4">
      <Row className="g-4">
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
                <Alert variant="success" className="mt-3">
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
                now={progressPercent}
                variant="success"
                className="mb-4"
              />

              <div className='pallets-items mt-5'>
                <h6 className="text-success">
                <span className='feather icon-check-circle me-2'></span>
                  Loaded Pallets</h6>
                <ListGroup variant="flush">
                  {loadedPallets.map((pallet) => (
                    <ListGroup.Item key={pallet} className="item-success text-white">
                      {pallet}
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
