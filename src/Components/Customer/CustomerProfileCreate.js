import React, { useState, useEffect } from 'react';
import { useMsal } from "@azure/msal-react";

function CustomerProfileCreate({ localUserID }) {
    const { accounts } = useMsal();
    const userEmail = accounts[0] && accounts[0].username;

    const [customerData, setCustomerData] = useState({
        CustomerID: '',
        UserID: localUserID || '',
        cSuspended: false
    });

    useEffect(() => {
        if (localUserID) {
            setCustomerData(prevData => ({
                ...prevData,
                UserID: localUserID
            }));
        }
    }, [localUserID]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCustomerData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/customerdata/addCustomer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customerData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Response from server:', data);
            alert('Customer profile created successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };

    return (
        <div>
            <h1>Create Customer Profile</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Customer ID:
                    <input
                        type="text"
                        name="CustomerID"
                        value={customerData.CustomerID}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    User ID:
                    <input
                        type="text"
                        name="UserID"
                        value={customerData.UserID}
                        readOnly
                    />
                </label>
                <br />
                <label>
                    Suspended:
                    <input
                        type="checkbox"
                        name="cSuspended"
                        checked={customerData.cSuspended}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Create Profile</button>
            </form>
        </div>
    );
}

export default CustomerProfileCreate;