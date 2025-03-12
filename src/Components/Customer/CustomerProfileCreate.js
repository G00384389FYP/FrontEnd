import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from './Api';


function CustomerProfileCreate() {
    const navigate = useNavigate();
    const location = useLocation();
    const userID = location.state?.userID;

    useEffect(() => {
        if (location.state && location.state.userID) {
            console.log('custprofCreate UserID:', location.state.userID);
        }
    }, [location.state]);

    const handleCreateCustomerProfile = () => {
        if (!userID) {
            console.error('User ID is not available');
            return;
        }        

        fetch(`${API}/customers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: userID }) 
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
                    navigate('/myProfiles', { state: { userID } });
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