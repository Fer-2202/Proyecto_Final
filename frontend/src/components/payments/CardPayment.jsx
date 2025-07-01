import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';

function luhnCheck(val) {
  let sum = 0;
  let shouldDouble = false;
  for (let i = val.length - 1; i >= 0; i--) {
    let digit = parseInt(val.charAt(i));
    if (shouldDouble) {
      if ((digit *= 2) > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return (sum % 10) === 0;
}

const CardPayment = ({ amount, onPaymentSuccess }) => {
  const [card, setCard] = useState('');
  const [exp, setExp] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!/^[0-9]{16}$/.test(card) || !luhnCheck(card)) {
      setError('Número de tarjeta inválido');
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(exp)) {
      setError('Fecha inválida (MM/AA)');
      return;
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      setError('CVV inválido');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      onPaymentSuccess({ card, exp, cvv });
    }, 1200);
  };

  if (success) return (
    <div className="text-green-600 font-bold flex items-center gap-2 mt-4">
      <CreditCard className="w-5 h-5" /> ¡Pago realizado con tarjeta!
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-2">
      <div className="flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-cyan-500" />
        <span className="font-semibold">Pagar con tarjeta (Mastercard/Visa)</span>
      </div>
      <input
        type="text"
        placeholder="Número de tarjeta"
        maxLength={16}
        value={card}
        onChange={e => setCard(e.target.value.replace(/\D/g, ''))}
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-400 text-base"
        required
      />
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="MM/AA"
          maxLength={5}
          value={exp}
          onChange={e => setExp(e.target.value.replace(/[^\d\/]/g, ''))}
          className="w-1/2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-400 text-base"
          required
        />
        <input
          type="text"
          placeholder="CVV"
          maxLength={4}
          value={cvv}
          onChange={e => setCvv(e.target.value.replace(/\D/g, ''))}
          className="w-1/2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-400 text-base"
          required
        />
      </div>
      <div className="text-right font-bold text-lg text-cyan-700">Total: ₡{amount}</div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        className="w-full bg-cyan-600 text-white font-bold py-2 px-6 rounded-xl shadow hover:scale-105 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        disabled={loading}
      >
        {loading ? <span className="animate-spin">Procesando...</span> : 'Pagar'}
      </button>
    </form>
  );
};

export default CardPayment; 