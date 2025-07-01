import React, { useState } from 'react';
import { Wallet } from 'lucide-react';

const CashPayment = ({ amount, onPaymentSuccess }) => {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      onPaymentSuccess();
    }, 800);
  };

  if (confirmed) return (
    <div className="text-green-600 font-bold flex items-center gap-2 mt-4">
      <Wallet className="w-5 h-5" /> ¡Pago confirmado!
    </div>
  );

  return (
    <div className="mt-2">
      <div className="flex items-center gap-2 mb-2">
        <Wallet className="w-5 h-5 text-cyan-500" />
        <span className="font-semibold">Pago en efectivo o SINPE</span>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
        <p>Realiza el pago al número SINPE: <b>8947 8346</b> o en efectivo en taquilla.</p>
        <p className="mt-2">Total: <span className="font-bold text-cyan-700">₡{amount}</span></p>
      </div>
      <button
        onClick={handleConfirm}
        className="w-full bg-cyan-600 text-white font-bold py-2 px-6 rounded-xl shadow hover:scale-105 transition-all duration-200"
      >
        Ya pagué
      </button>
    </div>
  );
};

export default CashPayment; 