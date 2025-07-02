import React, { useState } from 'react';
import { QrReader } from '@blackbox-vision/react-qr-reader';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function QrValidator() {
  const [result, setResult] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScan = async (data) => {
    if (data) {
      setLoading(true);
      setResult(data);
      try {
        // Suponiendo que el QR contiene el ID de la orden
        // O un token único, ajusta la URL según tu backend
        const response = await axios.get(`${BACKEND_URL}/api/purchase_orders/validate_qr/?data=${encodeURIComponent(data)}`);
        setStatus(response.data.detail || '¡QR válido!');
      } catch (err) {
        setStatus(err.response?.data?.detail || 'QR no válido o ya usado');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold mb-2">Validador de QR</h2>
      <QrReader
        onResult={(result, error) => {
          if (!!result) handleScan(result?.text);
        }}
        constraints={{ facingMode: 'environment' }}
        style={{ width: '100%' }}
      />
      {loading && <p>Validando...</p>}
      {result && <p className="break-all">Escaneado: {result}</p>}
      {status && <p className={`font-bold ${status.includes('válido') ? 'text-green-600' : 'text-red-600'}`}>{status}</p>}
    </div>
  );
} 