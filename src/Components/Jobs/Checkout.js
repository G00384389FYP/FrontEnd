import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import API from "../../Api";
import "../Jobs.css";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [chargeAmount, setChargeAmount] = useState(1000); // Charge amount in cents (e.g., $10.00)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/invoices/payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chargeAmount),
    });

    const { clientSecret } = await res.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { name: "Customer Name" },
      },
    });

    if (result.error) {
      setMessage(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      setMessage("Payment succeeded 🎉");
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Complete Your Payment</h1>
      <p className="charge-amount">Charge Amount:€{(chargeAmount / 100).toFixed(2)}</p>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="card-element" className="form-label">
            Card Details
          </label>
          <CardElement id="card-element" className="card-element" />
        </div>
        <button type="submit" className="checkout-button" disabled={!stripe}>
          Pay
        </button>
        {message && <p className="checkout-message">{message}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
