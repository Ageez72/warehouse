import React, { useRef, useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QrScanner = ({ onScanSuccess }) => {
  const qrCodeRegionId = 'reader';
  const scannerRef = useRef(null);
  const [isScannerRunning, setIsScannerRunning] = useState(false);

  const startScanner = () => {
    const scanner = new Html5QrcodeScanner(
      qrCodeRegionId,
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );

    scanner.render(
      (decodedText) => {
        onScanSuccess(decodedText);
        scanner.clear(); // Stop the scanner after a successful scan
        setIsScannerRunning(false); // Reset the state to show the button again
      },
      (error) => {
        console.warn(`QR Scan Error: ${error}`);
      }
    );

    scannerRef.current = scanner;
    setIsScannerRunning(true);
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((error) => console.error('Clear error:', error));
      }
    };
  }, []);

  return (
    <div className='text-center'>
      {!isScannerRunning && (
        <button className='btn-request-permissions m-0 mt-3' onClick={startScanner}>Open Camera Scanner</button>
      )}
      <div id={qrCodeRegionId} style={{ height: '250px', maxWidth: '100%' }} />
    </div>
  );
};

export default QrScanner;