import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function MyProfiles() {
    const navigate = useNavigate();
    const location = useLocation();
    const userID = location.state?.userID;
    const [customerProfile, setCustomerProfile] = useState(null);
    const [cxExists, setCxExists] = useState(null); 

    useEffect(() => {
        if (userID) {
            console.log('My Profile UserID:', userID);
            checkCustomerProfile(userID);
        }
    }, [userID]);

    const checkCustomerProfile = async (userID) => {
        try {
            const response = await fetch('http://localhost:5001/api/customer/checkCustomerProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userID })
            });
            const data = await response.json();
            console.log('Response from backend:', data); 
            setCxExists(data.exists);
            if (data.exists) {
                setCustomerProfile(data.CustomerProfile);
                console.log('Bosh Customer Profile Exists:', data.CustomerProfile);
            } else {
                setCustomerProfile(null);
                console.log('Womp No customer profile found.');
            }
        } catch (error) {
            console.error('Error checking customer profile:', error);
        }
    };

    return (
        <div>
            <h1>My Profiles</h1>
            <div>
                {cxExists === null ? (
                    <p>Loading...</p>
                ) : cxExists ? (
                    <div>
                        <h2>Customer Profile</h2>
                        <p>Data</p>
                    </div>
                ) : (
                    <button onClick={() => navigate('/customerProfileCreate', { state: { userID } })}>Create Customer Profile</button>
                )}
            </div>
        </div>
    );
}

export default MyProfiles;