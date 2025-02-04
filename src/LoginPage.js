import React, { useState, useContext } from 'react';
import { useMsal } from "@azure/msal-react";
import { useNavigate } from 'react-router-dom';
import './App.css'; 
import { UserContext } from './UserContext';

function LoginPage() {
    const { instance } = useMsal();
    const navigate = useNavigate();
    const { setUserId } = useContext(UserContext);

    const handleLogin = async () => {
        try {
            const response = await instance.loginPopup();
            const email = response.account.username;
            await checkUserEmail(email); // wait for the POST request to complete before navigating
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const checkUserEmail = async (email) => {
        try {
            const response = await fetch('http://localhost:5001/api/user/checkEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                if (response.status === 404) {
                    console.log('Email not found. Redirecting to create user.');
                    navigate('userProfileForm');
                    return;
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            }

            const data = await response.json();
            let userID = data.userId;

            // Set the userId in UserContext
            setUserId(userID);
            console.log('setting UserID:', userID);

            // Email exists, log the user in and store userID
            navigate('myProfiles', { state: { userID } });
        } catch (error) {
            console.error('Error during email check:', error);
        }
    };

    return (
        <div className="login-container">
            <header className="login-header">
                <h1>Nixers.ie</h1>
            </header>
            <div className="login-box">
                <h2>Sign in with your email</h2>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default LoginPage;