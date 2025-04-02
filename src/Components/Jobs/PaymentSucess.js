import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../../Api";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Processing...");
  const sessionId = searchParams.get("session_id");

  const navigate = useNavigate();
  
  useEffect(() => {
    const confirmPayment = async () => {
      if (!sessionId) {
        setStatus("No session ID provided.");
        return;
      }

      try {
        console.log("Session ID:", sessionId);
        const res = await fetch(`${API}/invoices/confirm/${sessionId}`, {
          method: "PUT"
        });

        if (res.ok) {
          setStatus("Payment confirmed! Your invoice is marked as paid.");
        } else {
          const msg = await res.text();
          setStatus(`Payment could not be confirmed: ${msg}`);
        }
      } catch (err) {
        console.error(err);
        setStatus("An error occurred while confirming the payment.");
      }
    };

    confirmPayment();
  }, [sessionId]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Payment Success</h2>
      <p>{status}</p>
      <button onClick={navigate('/finances/') }>Back to Finances</button>
    </div>
  );
};

export default PaymentSuccess;
