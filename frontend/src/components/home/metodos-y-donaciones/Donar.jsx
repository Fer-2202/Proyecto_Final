import React, { useState } from 'react'
import QuienesSomos from '../quienes-somos/QuienesSomos'
import ExhibitIntro from '../exhibiciones-y-servicios/components/ExhibitIntro'
import placeholder from "@assets/placeholder.svg";
import MarineExhibit from '../exhibiciones-y-servicios/components/MarineExhibit';
import donarTabs from './data/donarData'
import Modal from '../../ui/Modal';
import PaypalPayment from '@/components/payments/PaypalPayment';
import CardPayment from '@/components/payments/CardPayment';
import CashPayment from '@/components/payments/CashPayment';
import { createDonation } from '@/api/donations';
import ContactDonationForm from './ContactDonationForm';
import VolunteerContactForm from './VolunteerContactForm';

function Donar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Handler para abrir el modal desde MarineExhibit
  const handleButtonClick = (btn, item) => {
    if (btn.label === 'Inscribirse') {
      setModalContent(
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-teal-700">Formulario de inscripción</h2>
          <p>Inscríbete en <span className="font-semibold">{item.title}</span> completando el siguiente formulario:</p>
          <form className="space-y-2">
            <input type="text" placeholder="Nombre completo" className="w-full border rounded px-3 py-2" />
            <input type="email" placeholder="Correo electrónico" className="w-full border rounded px-3 py-2" />
            <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors">Enviar inscripción</button>
          </form>
        </div>
      );
    } else if (btn.label === 'Contactar para donar') {
      setModalContent(
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-teal-700">Formulario:</h2>
          <ContactDonationForm />
        </div>
      );
    } else if (btn.label === "Donar Ahora") {
      setModalContent(<PaymentSelector amount={5000} />);
    } else if (btn.label === "Aplicar como voluntario") {
      setModalContent(
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-teal-700">Formulario para Voluntariado</h2>
          <VolunteerContactForm />
        </div>
      );
    } else {
      setModalContent(
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-teal-700">{btn.label}</h2>
          <p>Acción personalizada para este botón.</p>
        </div>
      );
    }
    setIsModalOpen(true);
  };

  return (
    <div>
      <QuienesSomos title={"Donaciones"} description={"Apoya nuestra misión de conservación marina"} img={placeholder} />
      <ExhibitIntro description={"El Parque Marino Central del Pacífico Sur es una institución sin fines de lucro dedicada a la conservación, investigación y educación sobre los ecosistemas marinos de Costa Rica. Tu donación nos ayuda a continuar con nuestra labor de protección de la biodiversidad marina"} title={"Tu Apoyo Hace la Diferencia"} />
      {donarTabs.length > 0 && (
        <MarineExhibit
          data={donarTabs.map(tab => ({
            ...tab,
            descriptions: Array.isArray(tab.description) ? tab.description : [tab.description],
            title_facts: tab.title_facts || tab.title_facts || "Métodos de Donación:",
            images: Array.isArray(tab.images) ? tab.images : [tab.images],
            facts: Array.isArray(tab.facts) ? tab.facts : [tab.facts],
          }))}
          onButtonClick={handleButtonClick}
        />
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalContent}
      </Modal>
    </div>
  )
}

function PaymentSelector({ amount: initialAmount }) {
  const [method, setMethod] = useState('paypal');
  const [success, setSuccess] = useState(false);
  const [currency, setCurrency] = useState('CRC');
  const [amount, setAmount] = useState(initialAmount);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Tasa de conversión más precisa
  const EXCHANGE_RATE = 520; // 1 USD = 520 CRC

  const handleDonation = async (paymentDetails = {}) => {
    setLoading(true);
    setError(null);
    try {
      await createDonation({
        amount,
        currency,
        payment_method: method === 'card' ? 'CARD' : method === 'paypal' ? 'PAYPAL' : 'CASH',
        status: 'SUCCESS',
        transaction_id: paymentDetails.transaction_id || '',
      });
      setSuccess(true);
    } catch (err) {
      setError('No se pudo registrar la donación. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    if (newCurrency === 'USD') {
      setAmount(Math.round(amount / EXCHANGE_RATE));
    } else {
      setAmount(Math.round(amount * EXCHANGE_RATE));
    }
  };

  const handleSuggestedAmount = (suggestedAmount) => {
    setAmount(suggestedAmount);
  };

  const handleSuccess = (details) => {
    handleDonation(details);
  };

  if (success) {
    return (
      <div className="text-center space-y-3">
        <div className="text-green-600 text-4xl">🎉</div>
        <div className="text-green-600 font-bold text-lg">¡Gracias por tu donación!</div>
        <p className="text-gray-600 text-sm">Tu contribución nos ayuda a continuar con nuestra misión.</p>
      </div>
    );
  }

  const currencySymbol = currency === 'USD' ? '$' : '₡';
  const minAmount = currency === 'USD' ? 2 : 1000;
  const stepAmount = currency === 'USD' ? 1 : 1000;

  // Montos sugeridos según la moneda
  const suggestedAmounts = currency === 'USD' 
    ? [5, 10, 25, 50, 100]
    : [5000, 10000, 25000, 50000, 100000];

  // Conversión en tiempo real
  const convertedAmount = currency === 'USD' 
    ? Math.round(amount * EXCHANGE_RATE)
    : Math.round(amount / EXCHANGE_RATE);

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto">
      <div className="text-center">
        <h2 className="text-xl font-bold text-teal-700 mb-1">💙 Tu Donación Hace la Diferencia</h2>
        <p className="text-gray-600 text-sm">Elige el monto y método de pago</p>
      </div>
      
      {/* Selector de moneda */}
      <div className="bg-gray-50 rounded-lg p-3">
        <label className="block text-sm font-semibold text-gray-700 mb-2">💱 Moneda:</label>
        <div className="flex gap-2">
          <button
            className={`flex-1 px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
              currency === 'CRC' 
                ? 'bg-teal-600 text-white border-teal-600 shadow-lg' 
                : 'bg-white text-gray-700 border-gray-300 hover:border-teal-400'
            }`}
            onClick={() => handleCurrencyChange('CRC')}
          >
            🇨🇷 Colones
          </button>
          <button
            className={`flex-1 px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
              currency === 'USD' 
                ? 'bg-teal-600 text-white border-teal-600 shadow-lg' 
                : 'bg-white text-gray-700 border-gray-300 hover:border-teal-400'
            }`}
            onClick={() => handleCurrencyChange('USD')}
          >
            🇺🇸 Dólares
          </button>
        </div>
      </div>

      {/* Montos sugeridos */}
      <div className="bg-gray-50 rounded-lg p-3">
        <label className="block text-sm font-semibold text-gray-700 mb-2">💰 Montos sugeridos:</label>
        <div className="grid grid-cols-5 gap-1">
          {suggestedAmounts.map((suggestedAmount) => (
            <button
              key={suggestedAmount}
              onClick={() => handleSuggestedAmount(suggestedAmount)}
              className={`px-2 py-1 rounded border text-xs font-medium transition-all ${
                amount === suggestedAmount
                  ? 'bg-teal-600 text-white border-teal-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-teal-400 hover:bg-teal-50'
              }`}
            >
              {currencySymbol}{suggestedAmount.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Input personalizado */}
      <div className="bg-gray-50 rounded-lg p-3">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          ✏️ Monto personalizado:
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
          min={minAmount}
          step={stepAmount}
          className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-base font-medium"
          placeholder={`Monto en ${currency}`}
        />
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-500">
            Mín: {currencySymbol}{minAmount.toLocaleString()}
          </p>
          {amount > 0 && (
            <p className="text-xs text-gray-600">
              ≈ {currency === 'USD' ? '₡' : '$'}{convertedAmount.toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {/* Métodos de pago */}
      <div className="bg-gray-50 rounded-lg p-3">
        <label className="block text-sm font-semibold text-gray-700 mb-2">💳 Método de pago:</label>
        <div className="space-y-2">
          <button
            className={`w-full px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
              method === 'paypal' 
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg' 
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
            }`}
            onClick={() => setMethod('paypal')}
          >
            💙 PayPal
          </button>
          <button
            className={`w-full px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
              method === 'card' 
                ? 'bg-purple-600 text-white border-purple-600 shadow-lg' 
                : 'bg-white text-gray-700 border-gray-300 hover:border-purple-400'
            }`}
            onClick={() => setMethod('card')}
          >
            💳 Tarjeta de Crédito/Débito
          </button>
          <button
            className={`w-full px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
              method === 'cash' 
                ? 'bg-green-600 text-white border-green-600 shadow-lg' 
                : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
            }`}
            onClick={() => setMethod('cash')}
          >
            💵 Efectivo/SINPE
          </button>
        </div>
      </div>

      {/* Componente de pago seleccionado */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-3">
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        {method === 'paypal' && <PaypalPayment amount={amount} onPaymentSuccess={handleSuccess} />}
        {method === 'card' && <CardPayment amount={amount} onPaymentSuccess={handleSuccess} />}
        {method === 'cash' && <CashPayment amount={amount} onPaymentSuccess={handleSuccess} />}
        {loading && <div className="text-center text-gray-500 mt-2">Registrando donación...</div>}
      </div>
    </div>
  );
}

export default Donar
