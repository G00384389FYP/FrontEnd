import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function CustomerProfileCreate() {
    const location = useLocation();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (location.state && location.state.userID) {
            setUserId(location.state.userID);
        } else {
            console.error('No userID found in location state');
        }
    }, [location.state]);

    const handleCreateCustomerProfile = () => {
        if (!userId) {
            console.error('User ID is not available');
            return;
        }

        const userIdInt = parseInt(userId, 10); // parse to int as post expects int        

        fetch('http://localhost:5001/api/customer/createCustomerProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: userIdInt })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Response from server:', data);
                if (data.errors) {
                    console.error('Validation errors:', data.errors);
                } else if (data.Message) {
                    console.log(data.Message);
                } else {
                    console.log('Customer profile created successfully!');
                }
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <h1>Create Customer Profile</h1>
            <button onClick={handleCreateCustomerProfile}>Create Customer Account</button>
        </div>
    );
}

export default CustomerProfileCreate;