import React, { useEffect } from 'react';
import PayPalButton from './PaypalButtons';

function PayPal() {
    const handleSuccess = (details) => {
        console.log('Detalles del pago:', details);
        // Handle success logic here, e.g., show a success message
    };

    return (
        <div>
            <h2>Pagar con PayPal</h2>
            <PayPalButton amount="5.75" onSuccess={handleSuccess} />
        </div>
    );
}

export default PayPal;