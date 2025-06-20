import PayPalButton from './PaypalButtons';

function PayPal() {
    const handleSuccess = (details) => {
        console.log('Detalles del pago:', details);
    };
    return (
        <div>
            <h2>Pagar con PayPal</h2>
            <PayPalButton amount="5.75" onSuccess={handleSuccess} />
        </div>
    );
}
export default PayPal;