import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../UserContext'; 
import '../Jobs.css'; 
import API from '../../Api';

function InvoiceHome() {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const { userId } = useContext(UserContext); 
    const tradesmanId = userId;
    const customerId = job ? job.userId : null;

    const [invoiceDetails, setInvoiceDetails] = useState({
        price: '',
        description: '',
        total: ''
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Invoice Details:', invoiceDetails);
    };

    return (
        <div className="invoice-container">
            <h1 className="invoice-title">Draft Invoice</h1>
            <form className="invoice-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={invoiceDetails.price}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                
               
                
                <div className="form-group">
                    <label htmlFor="description">Notes:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={invoiceDetails.description}
                        onChange={handleChange}
                        className="form-textarea"
                    />
                </div>
                
                
                
                <div className="form-group">
                    <label htmlFor="total">Total:</label>
                    <input
                        type="number"
                        id="total"
                        name="total"
                        value={invoiceDetails.total}
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