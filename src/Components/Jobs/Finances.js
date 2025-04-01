import React, { useState, useEffect, useContext } from "react";
import API from "../../Api";
import "../Jobs.css";
import { UserContext } from "../../UserContext"; 

const Finances = () => {
    const { userId } = useContext(UserContext); 
    const [invoices, setInvoices] = useState([]);
    const [error, setError] = useState(null);

    const fetchInvoices = async () => {
        try {
            const response = await fetch(`${API}/invoices/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setInvoices(data); 
                console.log("Fetched invoices:", data); 
            } else {
                setError("Failed to fetch invoices.");
            }
        } catch (err) {
            setError("An error occurred while fetching invoices.");
            console.error(err);
        }
    };

    const handlePayInvoice = async (invoiceId) => {
        try {
            const response = await fetch(`${API}/invoices/pay/${invoiceId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ invoiceId }),
            });

            if (response.ok) {
                const { url } = await response.json(); 
                console.log("Checkout URL:", url); 
                
                if (url) {
                    window.open(url, "_blank"); // Open the Stripe Checkout page in a new tab
                } else {
                    alert("Checkout URL is missing.");
                }
            } else {
                alert("Failed to initiate payment.");
            }
        } catch (err) {
            console.error("Error initiating payment:", err);
            alert("An error occurred while initiating the payment.");
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    return (
        <div className="finances-container">
            <h1 className="finances-title">Customer Invoices</h1>
            {error && <p className="error-message">{error}</p>}
            {invoices.length > 0 ? (
                <ul className="invoice-list">
                    {invoices.map((invoice, index) => (
                        <li key={invoice.id || index} className="invoice-item">                            
                            <p><strong>Tradesman ID:</strong> {invoice.tradesmanId}</p>
                            <p><strong>Amount:</strong> €{(invoice.amount / 100).toFixed(2)}</p>
                            <p><strong>Due Date:</strong> {invoice.dueDate}</p>
                            <p><strong>Status:</strong> {invoice.status}</p>
                            <p><strong>Invoice ID:</strong> {invoice.invoiceId}</p>
                            <p><strong>Job ID:</strong> {invoice.jobId}</p>
                            <button
                                className="pay-button"
                                onClick={() => handlePayInvoice(invoice.invoiceId)}
                            >
                                Pay
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-invoices-message">No invoices found.</p>
            )}
        </div>
    );
};

export default Finances;
