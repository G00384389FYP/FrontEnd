// src/LoginPage.js
import React from 'react';
import { useMsal } from "@azure/msal-react";

function LoginPage() {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginPopup().catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Welcome to the App</h1>
            <button onClick={handleLogin}>Sign In with Azure AD</button>
        </div>
    );
}

export default LoginPage;
