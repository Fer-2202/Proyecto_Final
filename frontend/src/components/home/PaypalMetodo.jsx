import React, { useState } from "react";
import PayPal from "./Paypal";

function PaypalMetodo() {
  const [metodo, setMetodo] = useState("");
  const [pagoRealizado, setPagoRealizado] = useState(false);
  const handleSuccess = (details) => {
    setPagoRealizado(true);
    // Puedes hacer algo con los detalles del pago si lo necesitas
  };
  const handlePago = (e) => {
    e.preventDefault();
    // Aquí iría la integración real con el método de pago
    setPagoRealizado(true);
  };
  return (
    <div>
      <h1>Realice aquí el pago</h1>
      {pagoRealizado ? (
        <div style={{ color: "green", marginTop: 20 }}>¡Pago realizado!</div>
      ) : (
        <form onSubmit={handlePago} style={{ marginTop: 20 }}>
          <label>
            Seleccione método de pago:
            <select
              value={metodo}
              onChange={(e) => setMetodo(e.target.value)}
              required
            >
              <option value="">--Seleccione--</option>
              <option value="paypal">PayPal</option>
              <option value="tarjeta">Tarjeta de crédito/débito</option>
              <option value="sinpe">Sinpe Móvil</option>
            </select>
          </label>
          {metodo === "paypal" && (
            <div style={{ marginTop: 15 }}>
              {metodo === "paypal" && (
                <div style={{ marginTop: 15 }}>
                  <PayPal onSuccess={handleSuccess} />
                </div>
              )}
            </div>
          )}
          {metodo === "tarjeta" && (
            <div style={{ marginTop: 15 }}>
              <input type="text" placeholder="Número de tarjeta" required />
              <input
                type="text"
                placeholder="MM/AA"
                required
                style={{ marginLeft: 10, width: 60 }}
              />
              <input
                type="text"
                placeholder="CVC"
                required
                style={{ marginLeft: 10, width: 50 }}
              />
              <button type="submit" style={{ marginLeft: 10 }}>
                Pagar
              </button>
            </div>
          )}
          {metodo === "sinpe" && (
            <div style={{ marginTop: 15 }}>
              <p>
                Realice el pago al número Sinpe: <b>8947 8346</b>
              </p>
              <button type="submit">Ya pagué</button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
export default PaypalMetodo;