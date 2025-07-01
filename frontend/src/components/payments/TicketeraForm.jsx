import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Spin } from 'antd'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Calendar,
  Ticket,
  CreditCard,
  Wallet,
  User,
  Mail,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Loader2,
  Edit2
} from 'lucide-react'
import CardPayment from '@/components/payments/CardPayment'
import PaypalPayment from '@/components/payments/PaypalPayment'
import CashPayment from '@/components/payments/CashPayment'
import { getTickets, getAvailableTickets } from '@/api/tickets';
import { getPayments } from '@/api/payments';
import { getAvailableVisits, createVisit } from '@/api/visits';
import { createPurchaseOrder } from '@/api/purchaseOrders';

function TicketeraForm() {
  const [visits, setVisits] = useState([])
  const [tickets, setTickets] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [loading, setLoading] = useState(true)
  const [quantities, setQuantities] = useState({})
  const [buyer, setBuyer] = useState({ name: '', email: '' })
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedVisitId, setSelectedVisitId] = useState(null)
  const [selectedPayment, setSelectedPayment] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [step, setStep] = useState(1)
  const [purchaseOrder, setPurchaseOrder] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [transition, setTransition] = useState('')

  useEffect(() => {
    setTransition('')
    setLoading(true)
    Promise.all([
      getAvailableVisits(),
      getTickets(),
      getPayments()
    ]).then(([visitsData, ticketsData, paymentsData]) => {
      setVisits(visitsData)
      setTickets(ticketsData)
      setPaymentMethods(paymentsData)
    }).catch(() => {
      toast.error('Error al cargar datos')
    }).finally(() => setLoading(false))
  }, [])

  // Animación de transición entre pasos
  const goToStep = (n) => {
    setTransition('animate-fade-out')
    setTimeout(() => {
      setStep(n)
      setTransition('animate-fade-in')
      setTimeout(() => setTransition(''), 400)
    }, 300)
  }

  const handleQuantityChange = (ticketId, value) => {
    setQuantities({ ...quantities, [ticketId]: Math.max(0, Number(value)) })
  }

  const handleInputChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value })
  }

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value)
  }

  const calculateTotal = () => {
    return tickets.reduce((sum, ticket) => {
      const qty = quantities[ticket.id] || 0
      return sum + qty * ticket.price
    }, 0)
  }

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleDateSelect = async (date) => {
    setSelectedDate(date)
    setMessage('')
    try {
      const day = date instanceof Date ? date.toISOString().split('T')[0] : date;
      const visit = await createVisit({ day });
      setSelectedVisitId(visit.id)
      goToStep(2)
    } catch (err) {
      const backendMsg = err?.response?.data?.detail || 'No se pudo crear la visita. Intenta otra fecha/hora.';
      toast.error(backendMsg)
    }
  }

  const handleTicketsNext = () => {
    if (Object.values(quantities).some((q) => q > 0)) {
      setMessage('')
      goToStep(3)
    } else {
      toast.error('Selecciona al menos una entrada.')
    }
  }

  const handleEdit = (n) => {
    goToStep(n)
  }

  const handleFinalSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')
    setSuccess(false)

    const selectedTickets = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([ticketId, qty]) => ({
        ticket: Number(ticketId),
        quantity: qty,
      }))

    if (!buyer.name || !buyer.email || !selectedDate || !selectedPayment) {
      toast.error('Completa todos los campos.')
      setSubmitting(false)
      return
    }

    if (!isValidEmail(buyer.email)) {
      toast.error('Correo electrónico no válido.')
      setSubmitting(false)
      return
    }

    if (selectedTickets.length === 0) {
      toast.error('Selecciona al menos una entrada.')
      setSubmitting(false)
      return
    }

    for (let { ticket, quantity } of selectedTickets) {
      const t = tickets.find((tk) => tk.id === ticket)
      const available = t ? t.total_slots - t.occupied_slots : 0
      if (quantity > available) {
        toast.error('No hay suficiente stock para alguna de las entradas seleccionadas.')
        setSubmitting(false)
        return
      }
    }

    setTimeout(() => {
      setSuccess(true)
      setPurchaseOrder({
        qr_image: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=COMPRA_MOCK',
        buyer: { ...buyer },
        tickets: selectedTickets,
        total: calculateTotal(),
        date: selectedDate,
        payment: paymentMethods.find(pm => pm.method === selectedPayment)?.label || '',
      })
      goToStep(5)
      setQuantities({})
      setBuyer({ name: '', email: '' })
      setSelectedDate(null)
      setSelectedPayment('')
      setSubmitting(false)
      toast.success('¡Compra realizada con éxito!')
    }, 1200)
  }

  // Nueva función para validar datos personales y método de pago antes de avanzar al pago
  function handleDatosNext() {
    if (!buyer.name || !buyer.email || !selectedPayment) {
      toast.error('Completa todos los campos y selecciona un método de pago.');
      return;
    }
    if (!isValidEmail(buyer.email)) {
      toast.error('Correo electrónico no válido.');
      return;
    }
    goToStep(4);
  }

  // Callback para éxito de pago en el paso 4
  function handlePaymentSuccess(paymentDetails = {}) {
    setSubmitting(true);
    const selectedTickets = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([ticketId, qty]) => {
        const ticket = tickets.find(t => t.id === Number(ticketId));
        return {
          ticket: Number(ticketId),
          quantity: qty,
          currency: ticket.currency
        };
      });
    const orderData = {
      buyer_name: buyer.name,
      buyer_email: buyer.email,
      visit: selectedVisitId,
      tickets: selectedTickets,
      payment_info: {
        method: selectedPayment,
        status: 'SUCCESS',
        ...paymentDetails
      }
    };
    createPurchaseOrder(orderData)
      .then(order => {
        setSuccess(true);
        setPurchaseOrder(order);
        goToStep(5);
        toast.success('¡Compra realizada con éxito!');
      })
      .catch(() => {
        toast.error('Error al procesar la compra');
      })
      .finally(() => setSubmitting(false));
  }

  // Calcula el total por moneda
  const totalCRC = tickets.reduce((sum, ticket) => {
    const qty = quantities[ticket.id] || 0;
    return ticket.currency === 'CRC' ? sum + qty * ticket.price : sum;
  }, 0);
  const totalUSD = tickets.reduce((sum, ticket) => {
    const qty = quantities[ticket.id] || 0;
    return ticket.currency === 'USD' ? sum + qty * ticket.price : sum;
  }, 0);

  // Responsive: full width en móvil, padding, etc.
  const containerClass = 'flex flex-col items-center min-h-[80vh] bg-gradient-to-br from-cyan-50 to-slate-100 py-10 px-2'
  const cardClass = 'w-full max-w-lg p-8 bg-white rounded-3xl shadow-2xl border border-gray-100 transition-all duration-300'
  const fadeClass = transition
  const inputClass = 'w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-400 text-base transition-all duration-150'
  const labelClass = 'block font-semibold mb-2 text-gray-700'
  const buttonClass = 'flex items-center justify-center gap-2 font-bold py-2 px-6 rounded-xl shadow hover:scale-105 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed'

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin w-10 h-10 text-cyan-600" />
    </div>
  )
  if (!tickets || tickets.length === 0) return <div>No hay entradas disponibles.</div>

  return (
    <div className={containerClass}>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      <div className={cardClass + ' ' + fadeClass}>
        <h2 className="text-3xl font-extrabold mb-6 text-center text-cyan-700 tracking-tight drop-shadow-sm flex items-center justify-center gap-2">
          <Ticket className="w-8 h-8 text-cyan-500" /> Compra tus Entradas
        </h2>

        {/* Paso 1: Selección de fecha */}
        {step === 1 && (
          <>
            <label className={labelClass} htmlFor="datepicker">
              <span className="flex items-center gap-2"><Calendar className="w-5 h-5 text-cyan-400" /> Selecciona la fecha de tu visita:</span>
            </label>
            <div className="flex justify-center mb-4">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-2 shadow-sm">
                <DatePicker
                  id="datepicker"
                  selected={selectedDate}
                  onChange={handleDateSelect}
                  minDate={new Date()}
                  className={inputClass}
                  placeholderText="Selecciona una fecha"
                  dateFormat="yyyy-MM-dd"
                  includeDates={visits.map(v => new Date(v.day))}
                  inline
                />
              </div>
            </div>
            <button
              className={buttonClass + ' bg-cyan-600 text-white mt-4 w-full'}
              onClick={() => goToStep(2)}
              disabled={!selectedDate}
            >
              <ArrowRight className="w-5 h-5" /> Siguiente
            </button>
          </>
        )}

        {/* Paso 2: Selección de tickets */}
        {step === 2 && (
          <div>
            <label className={labelClass + ' text-lg'}>
              <span className="flex items-center gap-2"><Ticket className="w-5 h-5 text-cyan-400" /> Selecciona tus entradas:</span>
            </label>
            <div className="space-y-3">
              {tickets.map((ticket) => {
                const available = ticket.total_slots - ticket.occupied_slots
                return (
                  <div key={ticket.id} className={`flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2 border ${available === 0 ? 'border-red-200 opacity-60' : 'border-gray-200'}`}> 
                    <span>
                      <strong className="text-cyan-700">{ticket.name}</strong> <span className="font-semibold">- {ticket.currency === 'USD' ? '$' : '₡'}{ticket.price}</span>
                      <span className="ml-2 text-sm text-gray-500">({available} disponibles)</span>
                    </span>
                    <input
                      type="number"
                      min="0"
                      max={available}
                      value={quantities[ticket.id] || ''}
                      onChange={(e) => handleQuantityChange(ticket.id, e.target.value)}
                      className={inputClass + ' w-20 text-center'}
                      disabled={available === 0 || submitting}
                      title={available === 0 ? 'No hay stock disponible' : 'Cantidad'}
                    />
                  </div>
                )
              })}
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
              <button
                className={buttonClass + ' bg-gray-400 text-white'}
                onClick={() => goToStep(1)}
                disabled={submitting}
              >
                <ArrowLeft className="w-5 h-5" /> Atrás
              </button>
              <button
                className={buttonClass + ' bg-cyan-600 text-white'}
                onClick={handleTicketsNext}
                disabled={submitting}
              >
                Siguiente <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Paso 3: Datos personales y selección de método de pago */}
        {step === 3 && (
          <form onSubmit={e => { e.preventDefault(); handleDatosNext(); }}>
            <div className="mb-4">
              <label className={labelClass} htmlFor="name">
                <span className="flex items-center gap-2"><User className="w-5 h-5 text-cyan-400" /> Nombre:</span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={buyer.name}
                onChange={handleInputChange}
                className={inputClass}
                required
                title="Nombre completo"
                disabled={submitting}
              />
            </div>
            <div className="mb-4">
              <label className={labelClass} htmlFor="email">
                <span className="flex items-center gap-2"><Mail className="w-5 h-5 text-cyan-400" /> Correo electrónico:</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={buyer.email}
                onChange={handleInputChange}
                className={inputClass}
                required
                title="Correo electrónico válido"
                disabled={submitting}
              />
            </div>
            <div className="mb-4">
              <label className={labelClass} htmlFor="payment">
                <span className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-cyan-400" /> Método de pago:</span>
              </label>
              <select
                id="payment"
                value={selectedPayment}
                onChange={handlePaymentChange}
                className={inputClass}
                required
                title="Selecciona el método de pago"
                disabled={submitting}
              >
                <option value="">Selecciona un método</option>
                {paymentMethods.map((pm) => (
                  <option key={pm.id} value={pm.method}>{pm.label}</option>
                ))}
              </select>
            </div>
            <div className="mb-4 text-right font-bold text-lg bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
              {totalCRC > 0 && <>Total: ₡{totalCRC} <br/></>}
              {totalUSD > 0 && <>Total: ${totalUSD}</>}
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
              <button
                type="button"
                className={buttonClass + ' bg-gray-400 text-white'}
                onClick={() => goToStep(2)}
                disabled={submitting}
              >
                <ArrowLeft className="w-5 h-5" /> Atrás
              </button>
              <button
                type="submit"
                className={buttonClass + ' bg-cyan-600 text-white'}
                disabled={submitting}
              >
                Siguiente <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}

        {/* Paso 4: Pago según método seleccionado */}
        {step === 4 && (
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-cyan-700 flex items-center gap-2"><CreditCard className="w-6 h-6 text-cyan-500" /> Realiza tu pago</h3>
            {selectedPayment === 'MASTERCARD' || selectedPayment === 'VISA' ? (
              <CardPayment amount={calculateTotal()} onPaymentSuccess={handlePaymentSuccess} />
            ) : selectedPayment === 'PAYPAL' ? (
              <PaypalPayment amount={calculateTotal()} onPaymentSuccess={handlePaymentSuccess} />
            ) : selectedPayment === 'CASH' ? (
              <CashPayment amount={calculateTotal()} onPaymentSuccess={handlePaymentSuccess} />
            ) : null}
            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
              <button
                className={buttonClass + ' bg-gray-400 text-white'}
                onClick={() => goToStep(3)}
              >
                <ArrowLeft className="w-5 h-5" /> Atrás
              </button>
            </div>
          </div>
        )}

        {/* Paso 5: Resumen y confirmación */}
        {step === 5 && success && purchaseOrder && (
          <div className="text-center animate-fade-in">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex flex-col items-center animate-bounce-in">
              <p className="text-green-700 font-bold text-lg mb-2 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500 animate-pulse" /> ¡Compra realizada!
              </p>
              {purchaseOrder.qr_image && (
                <img
                  src={purchaseOrder.qr_image}
                  alt="QR de la compra"
                  className="mx-auto mb-4 rounded-lg border border-gray-200 shadow-lg animate-fade-in"
                  style={{ maxWidth: 200 }}
                />
              )}
              <p className="mt-2 text-green-700">Revisa tu correo para más detalles.</p>
            </div>
            <button
              onClick={() => goToStep(1)}
              className={buttonClass + ' bg-gray-700 text-white mt-2'}
            >
              <ArrowLeft className="w-5 h-5" /> Comprar otra entrada
            </button>
          </div>
        )}
      </div>
      {/* Animaciones Tailwind personalizadas */}
      <style>{`
        .animate-fade-in { animation: fadeIn 0.4s; }
        .animate-fade-out { animation: fadeOut 0.3s; }
        .animate-bounce-in { animation: bounceIn 0.7s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none; } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; transform: translateY(-20px);} }
        @keyframes bounceIn { 0% { transform: scale(0.7); opacity: 0.5; } 60% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  )
}

export default TicketeraForm
