import React from 'react';
import PayPalButton from '../home/PaypalButtons';
import { CheckCircle } from 'lucide-react';

const PaypalPayment = ({ amount, onPaymentSuccess }) => {
  const handleSuccess = (details) => {
    onPaymentSuccess(details);
  };

  return (
    <div className="mt-2">
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle className="w-5 h-5 text-cyan-500" />
        <span className="font-semibold">Pagar con PayPal</span>
      </div>
      <div className="text-center mb-4 text-gray-700">
        Serás redirigido a la pasarela segura de PayPal para completar tu pago.<br/>
        Puedes usar una cuenta PayPal o tarjeta de crédito/débito.
      </div>
      <div className="relative z-0">
        <PayPalButton amount={amount} onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default PaypalPayment; 