import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Spin } from 'antd'
import {
  getTickets,
  getAvailableTickets,
  getPayments,
  createPurchaseOrder,
  createVisit
} from '../../../api/api'

function Ticketera() {
  const [tickets, setTickets] = useState([])
  const [availableTickets, setAvailableTickets] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [loading, setLoading] = useState(true)
  const [quantities, setQuantities] = useState({})
  const [buyer, setBuyer] = useState({ name: '', email: '' })
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedPayment, setSelectedPayment] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [step, setStep] = useState(1)
  const [purchaseOrder, setPurchaseOrder] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [visitId, setVisitId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketsResponse = await getTickets()
        const availableResponse = await getAvailableTickets()
        const paymentMethodsResponse = await getPayments()
        setTickets(ticketsResponse)
        setAvailableTickets(availableResponse)
        setPaymentMethods(paymentMethodsResponse)
      } catch (error) {
        setMessage('Error cargando datos.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

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
      const visit = await createVisit({ day: date.toISOString().split('T')[0] })
      setVisitId(visit.id)
      setStep(2)
    } catch (err) {
      console.error('Error al crear la visita:', err)
      setMessage('No se pudo crear la visita. Intenta otra fecha/hora.')
    }
  }

  const handleTicketsNext = () => {
    if (Object.values(quantities).some((q) => q > 0)) {
      setMessage('')
      setStep(3)
    } else {
      setMessage('Selecciona al menos una entrada.')
    }
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
      setMessage('Completa todos los campos.')
      setSubmitting(false)
      return
    }

    if (!isValidEmail(buyer.email)) {
      setMessage('Correo electrónico no válido.')
      setSubmitting(false)
      return
    }

    if (selectedTickets.length === 0) {
      setMessage('Selecciona al menos una entrada.')
      setSubmitting(false)
      return
    }

    for (let { ticket, quantity } of selectedTickets) {
      const available = availableTickets.find((t) => t.id === Number(ticket))
      if (!available || quantity > available.remaining) {
        setMessage('No hay suficiente stock para alguna de las entradas seleccionadas.')
        setSubmitting(false)
        return
      }
    }

    const payment_info = {
      payment_method: selectedPayment,          // "CARD", "CASH", "PAYPAL"
      transaction_id: `TX-${Date.now()}`,       // Simulación de ID único
      status: 'SUCCESS'                         // Estado fijo
    }

    try {
      const order = await createPurchaseOrder({
        buyer_name: buyer.name,
        buyer_email: buyer.email,
        visit: visitId,
        payment_info,
        tickets: selectedTickets,
      })
      setSuccess(true)
      setPurchaseOrder(order)
      setStep(4)
      setQuantities({})
      setBuyer({ name: '', email: '' })
      setSelectedDate(null)
      setSelectedPayment('')
    } catch (err) {
      console.error(err)
      setMessage('Error al procesar la compra.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="text-center mt-10">Cargando datos...</div>
  if (!tickets || tickets.length === 0) return <div>No hay entradas disponibles.</div>

  return (
    <div className="container mx-auto max-w-lg p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Compra tus Entradas</h2>

      {step === 1 && (
        <>
          <label className="block font-semibold mb-2">Selecciona la fecha de tu visita:</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateSelect}
            minDate={new Date()}
            className="w-full border rounded px-2 py-1"
            placeholderText="Selecciona una fecha"
            dateFormat="yyyy-MM-dd"
            inline
          />
          {message && <p className="text-red-600 text-center mt-2">{message}</p>}
        </>
      )}

      {step === 2 && (
        <div>
          <label className="block font-semibold mb-2">Selecciona tus entradas:</label>
          {tickets.map((ticket) => {
            const available = availableTickets.find((t) => t.id === ticket.id)
            return (
              <div key={ticket.id} className="flex items-center mb-2 justify-between">
                <span>
                  <strong>{ticket.name}</strong> - ₡{ticket.price}
                  <span className="ml-2 text-sm text-gray-500">
                    ({available ? `${available.remaining} disponibles` : 'Sin info'})
                  </span>
                </span>
                <input
                  type="number"
                  min="0"
                  max={available ? available.remaining : 10}
                  value={quantities[ticket.id] || ''}
                  onChange={(e) => handleQuantityChange(ticket.id, e.target.value)}
                  className="w-16 border rounded px-2 py-1 ml-2"
                  disabled={!available || available.remaining === 0}
                />
              </div>
            )
          })}
          <div className="flex justify-between mt-4">
            <button
              className="bg-gray-400 text-white font-bold py-2 px-4 rounded hover:bg-gray-500"
              onClick={() => setStep(1)}
            >
              Atrás
            </button>
            <button
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
              onClick={handleTicketsNext}
            >
              Siguiente
            </button>
          </div>
          {message && <p className="text-red-600 text-center mt-2">{message}</p>}
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleFinalSubmit}>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Método de pago:</label>
            <select
              value={selectedPayment}
              onChange={handlePaymentChange}
              className="w-full border rounded px-2 py-1"
              required
            >
              <option value="">Selecciona un método</option>
              <option value="CARD">Tarjeta de crédito/débito</option>
              <option value="CASH">Efectivo</option>
              <option value="PAYPAL">PayPal</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Nombre:</label>
            <input
              type="text"
              name="name"
              value={buyer.name}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Correo electrónico:</label>
            <input
              type="email"
              name="email"
              value={buyer.email}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          <div className="mb-4 text-right font-bold">
            Total: ₡{calculateTotal()}
          </div>
          {message && <p className="text-red-600 text-center">{message}</p>}
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-400 text-white font-bold py-2 px-4 rounded hover:bg-gray-500"
              onClick={() => setStep(2)}
            >
              Atrás
            </button>
            <button
              type="submit"
              className={`bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 ${submitting && 'opacity-50 cursor-not-allowed'}`}
              disabled={submitting}
            >
              {submitting ? <Spin size="small" /> : 'Finalizar compra'}
            </button>
          </div>
        </form>
      )}

      {step === 4 && success && purchaseOrder && (
        <div className="text-center">
          <p className="text-green-600 font-bold mb-4">¡Compra realizada!</p>
          {purchaseOrder.qr_image && (
            <img
              src={`${process.env.REACT_APP_API_URL || ''}/${purchaseOrder.qr_image}`}
              alt="QR de la compra"
              className="mx-auto mb-4"
              style={{ maxWidth: 200 }}
            />
          )}
          <p className="mt-2">Revisa tu correo para más detalles.</p>
          <button
            onClick={() => setStep(1)}
            className="mt-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            Comprar otra entrada
          </button>
        </div>
      )}
    </div>
  )
}

export default Ticketera
