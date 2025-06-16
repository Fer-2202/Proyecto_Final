import React, { useEffect, useState } from 'react'
import {
  getTickets,
  getAvailableTickets,
  getAvailableVisits,
  getPaymentMethods,
  createPurchaseOrder,
} from '../../../api/api'

function Ticketera() {
  const [tickets, setTickets] = useState([])
  const [availableTickets, setAvailableTickets] = useState([])
  const [visits, setVisits] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [loading, setLoading] = useState(true)
  const [quantities, setQuantities] = useState({})
  const [buyer, setBuyer] = useState({ name: '', email: '' })
  const [selectedVisit, setSelectedVisit] = useState('')
  const [selectedPayment, setSelectedPayment] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketsResponse = await getTickets()
        const availableResponse = await getAvailableTickets()
        const visitsResponse = await getAvailableVisits()
        const paymentMethodsResponse = await getPaymentMethods()
        setTickets(ticketsResponse)
        setAvailableTickets(availableResponse)
        setVisits(visitsResponse)
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

  const handleVisitChange = (e) => {
    setSelectedVisit(e.target.value)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setSuccess(false)
    if (!buyer.name || !buyer.email || !selectedVisit || !selectedPayment) {
      setMessage('Completa todos los campos.')
      return
    }
    const selectedTickets = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([ticketId, qty]) => ({
        ticket: ticketId,
        quantity: qty,
      }))
    if (selectedTickets.length === 0) {
      setMessage('Selecciona al menos una entrada.')
      return
    }
    // Validar stock
    for (let { ticket, quantity } of selectedTickets) {
      const available = availableTickets.find(t => t.id === Number(ticket))
      if (!available || quantity > available.remaining) {
        setMessage('No hay suficiente stock para alguna de las entradas seleccionadas.')
        return
      }
    }
    // Información de pago
    const payment_info = {
      method: selectedPayment,
      amount: calculateTotal(),
      status: 'pagado'
    }
    try {
      await createPurchaseOrder({
        buyer_name: buyer.name,
        buyer_email: buyer.email,
        visit_id: selectedVisit,
        payment_info,
        tickets: selectedTickets,
      })
      setSuccess(true)
      setMessage('¡Compra realizada! Revisa tu correo para el QR.')
      setQuantities({})
      setBuyer({ name: '', email: '' })
      setSelectedVisit('')
      setSelectedPayment('')
    } catch (err) {
      setMessage('Error al procesar la compra.')
    }
  }

  if (loading) return <div>Loading...</div>
  if (!tickets || tickets.length === 0) return <div>No hay entradas disponibles.</div>

  return (
    <div className="container mx-auto max-w-lg p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Compra tus Entradas</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Selecciona tus entradas:</label>
          {tickets.map(ticket => {
            const available = availableTickets.find(t => t.id === ticket.id)
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
                  onChange={e => handleQuantityChange(ticket.id, e.target.value)}
                  className="w-16 border rounded px-2 py-1 ml-2"
                  disabled={!available || available.remaining === 0}
                />
              </div>
            )
          })}
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Fecha de visita:</label>
          <select
            value={selectedVisit}
            onChange={handleVisitChange}
            className="w-full border rounded px-2 py-1"
            required
          >
            <option value="">Selecciona una fecha</option>
            {visits.map(visit => (
              <option key={visit.id} value={visit.id}>
                {visit.date} - {visit.description}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Método de pago:</label>
          <select
            value={selectedPayment}
            onChange={handlePaymentChange}
            className="w-full border rounded px-2 py-1"
            required
          >
            <option value="">Selecciona un método</option>
            {paymentMethods.map(method => (
              <option key={method.id} value={method.name}>
                {method.name}
              </option>
            ))}
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
        {message && (
          <div className={`mb-4 text-center ${success ? 'text-green-600' : 'text-red-600'}`}>{message}</div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition"
        >
          Comprar
        </button>
      </form>
    </div>
  )
}

export default Ticketera