import React, { useState, useEffect, useContext, useCallback } from "react";
import API from "../../Api";
import "../Jobs.css";
import { UserContext } from "../../UserContext";

const Finances = () => {
    const { userId } = useContext(UserContext);
    const [invoices, setInvoices] = useState([]);
    const [paidInvoices, setPaidInvoices] = useState([]);
    const [error, setError] = useState(null);

    const fetchInvoices = useCallback(async () => {
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
            } else {
                setError("Failed to fetch invoices.");
            }
        } catch (err) {
            setError("An error occurred while fetching invoices.");
            console.error(err);
        }
    }, [userId]);

    const CheckInvoiceSession = useCallback(async (invoice) => {
        const sessionId = invoice.stripeCheckoutSessionId; 
        console.log("Session ID:", sessionId);
    
        if (!sessionId) {
            alert("No session ID provided. A payment process has not been initiated."); 
            return;
        }
    
        try {
            const res = await fetch(`${API}/invoices/confirm/${sessionId}`, {
                method: "PUT",
            });
    
            if (res.ok) {
                alert("Payment confirmed! Your invoice is marked as paid.");
            } else {
                const msg = await res.text();
                alert(`Payment could not be confirmed: ${msg}`); 
            }
        } catch (err) {
            alert("An error occurred while confirming the payment.");
        }
    }, []);
    

    const fetchPaidInvoices = useCallback(async () => {
        try {
            const response = await fetch(`${API}/invoices/${userId}/paid`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setPaidInvoices(data);
            } else {
                setError("Failed to fetch invoices.");
            }
        } catch (err) {
            setError("An error occurred while fetching invoices.");
        }
    }, [userId]);

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

                if (url) {
                    window.open(url, "_blank");
                } else {
                    alert("Checkout URL is missing.");
                }
            } else {
                alert("Failed to initiate payment.");
            }
        } catch (err) {
            alert("An error occurred while initiating the payment.");
        }
    };
    

    useEffect(() => {
        fetchInvoices();
        fetchPaidInvoices();
        
    }, [fetchInvoices, fetchPaidInvoices]);

    return (
        <div className="finances-container">
            <div>
                <h1 className="finances-title">Unpaid Invoices</h1>
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
                                <button
                                    className="pay-refresh-button"
                                    onClick={() => CheckInvoiceSession(invoice.stripeCheckoutSessionId)}
                                >
                                    Refresh  Status
                                </button>
                                
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-invoices-message">No invoices found.</p>
                )}
            </div>
            <div>
                <h1 className="finances-title">Paid Invoices</h1>
                {paidInvoices.length > 0 ? (
                    <ul className="invoice-list">
                        {paidInvoices.map((invoice, index) => (
                            <li key={invoice.id || index} className="paid-invoice-item">
                                <p><strong>Tradesman ID:</strong> {invoice.tradesmanId}</p>
                                <p><strong>Amount:</strong> €{(invoice.amount / 100).toFixed(2)}</p>
                                <p><strong>Due Date:</strong> {invoice.dueDate}</p>
                                <p><strong>Status:</strong> {invoice.status}</p>
                                <p><strong>Invoice ID:</strong> {invoice.invoiceId}</p>
                                <p><strong>Job ID:</strong> {invoice.jobId}</p>
                                
                            </li>
                        ))}
                        
                    </ul>
                ) : (
                    <p className="no-invoices-message">No paid invoices found.</p>
                )}
            </div>
        </div>
    );
};

export default Finances;
