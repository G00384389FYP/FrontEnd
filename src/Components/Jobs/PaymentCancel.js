// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import API from "../../Api";

const PaymentCancel = () => {
    const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Issue with Payment</h2>
      <p>Something went wrong</p>
      <button onClick={navigate('/finances/') }>Back to Finances</button>
    </div>
  );
};

export default PaymentCancel;
