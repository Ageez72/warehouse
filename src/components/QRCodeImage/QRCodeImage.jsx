import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import QRCode from 'qrcode';

const QRCodeImage = forwardRef(({ value, size = 200, alt = 'QR Code' }, ref) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    if (!value) return;
    QRCode.toDataURL(value, { width: size })
      .then(setQrCodeUrl)
      .catch(console.error);
  }, [value, size]);

  // Expose QR code image URL to parent
  useImperativeHandle(ref, () => ({
    getQRCodeUrl: () => qrCodeUrl
  }));

  return qrCodeUrl ? (
    <img src={qrCodeUrl} width={size} height={size} alt={alt} />
  ) : null;
});

export default QRCodeImage;
