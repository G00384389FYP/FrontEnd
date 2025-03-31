import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../UserContext'; 
import API from '../../Api';
import "../Jobs.css"; 

function InvoiceHome() {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const { userId } = useContext(UserContext); 
    const tradesmanId = userId;
    const customerId = job ? job.userId : null;

    const [invoiceDetails, setInvoiceDetails] = useState({        
        Notes: '', 
        Amount: '', 
        PaymentType: 'cash', 
        DueDate: '' 
    });

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`${API}/jobs/${jobId}`);
                const data = await response.json();
                setJob(data);
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };

        fetchJobDetails();
    }, [jobId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvoiceDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Request Body:", JSON.stringify(invoiceDetails, null, 2));
            const response = await fetch(`${API}/invoices/${jobId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tradesmanId,
                    customerId,
                    jobId,
                    ...invoiceDetails, 
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Invoice submitted successfully:", data);
                alert("Invoice submitted successfully!");
            } else {
                console.error("Failed to submit invoice:", response.statusText);
                alert("Failed to submit invoice. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting invoice:", error);
            alert("An error occurred while submitting the invoice.");
        }
    };

    return (
        <div className="invoice-container">
            <h1 className="invoice-title">Draft Invoice</h1>
            <form className="invoice-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Notes">Notes:</label>
                    <textarea
                        id="Notes"
                        name="Notes" 
                        value={invoiceDetails.Notes}
                        onChange={handleChange}
                        className="form-textarea"
                    />
                </div>                
                
                <div className="form-group">
                    <label>Payment Method:</label>
                    <div className="form-radio-group">
                        <label>
                            <input
                                type="radio"
                                name="PaymentType" 
                                value="cash"
                                checked={invoiceDetails.PaymentType === "cash"}
                                onChange={handleChange}
                                className="form-radio"
                            />
                            Cash
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="PaymentType" 
                                value="online"
                                checked={invoiceDetails.PaymentType === "online"}
                                onChange={handleChange}
                                className="form-radio"
                            />
                            Online Payment
                        </label>
                    </div>
                </div>
                
                <div className="form-group">
                    <label htmlFor="Amount">Total:</label>
                    <input
                        type="number"
                        id="Amount"
                        name="Amount" 
                        value={invoiceDetails.Amount}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="DueDate">Due Date:</label>
                    <input
                        type="date"
                        id="DueDate"
                        name="DueDate" 
                        value={invoiceDetails.DueDate}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                
                <button type="submit" className="form-button">Submit Invoice</button>
            </form>
        </div>
    );
}

export default InvoiceHome;