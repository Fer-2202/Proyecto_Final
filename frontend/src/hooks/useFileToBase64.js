import { useState } from 'react';

export default function useFileToBase64() {
  const [base64, setBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const convert = (file) => {
    setLoading(true);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64(reader.result);
      setLoading(false);
    };
    reader.onerror = () => {
      setError('Failed to convert file');
      setLoading(false);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setBase64(null);
      setLoading(false);
    }
  };

  return { base64, loading, error, convert };
}