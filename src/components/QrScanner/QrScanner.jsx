// components/QrScanner.js
import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QrScanner = ({ onScanSuccess }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );

    scanner.render(
      (decodedText) => {
        onScanSuccess(decodedText);
        scanner.clear(); // Optional: stop after first scan
      },
      (error) => {
        // console.warn(`QR Scan Error: ${error}`);
      }
    );

    return () => {
      scanner.clear().catch((error) => console.error('Clear error:', error));
    };
  }, [onScanSuccess]);

  return (
    <div id="reader" style={{ height: '250px', maxWidth: '100%' }} />
  );
};

export default QrScanner;
