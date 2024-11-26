import React, { useState } from 'react';
import { useMsal } from "@azure/msal-react";
import { useNavigate } from 'react-router-dom';
import './App.css'; 

function LoginPage() {
    const { instance } = useMsal();
    const navigate = useNavigate();
    const [userID, setUserID] = useState(null);

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
        // console.log('Posting email to backend:', email); 
        try {
            const response = await fetch('http://localhost:5001/api/user/checkEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            // console.log('Response status:', response.status); // log response status
            const data = await response.json();
            // console.log('Response from backend:', data); // log response 
            let userID = data.userId;
            console.log('UserId:', userID); // log the UserId from the response

            if (response.status === 404) {
                console.log('Email not found. redirect to create user');
                navigate('userProfileForm')
            } else {
                // email exists, log the user in and store userID
                console.log('Email found. redirect to user profile');
                navigate('myProfiles', { state: { userID } });

            }
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
