import React, { useEffect, useState } from 'react';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, useIsAuthenticated, useMsal } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage"; // Import MainPage from MainPage.js
import UserProfileForm from './Components/UserProfileForm';

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

function App() {
    return (
        <MsalProvider instance={msalInstance}>
            <AuthContent />
        </MsalProvider>
    );
}

function AuthContent() {
    const isAuthenticated = useIsAuthenticated();

    return (
        <>
        
            {/* {isAuthenticated ? <MainPage /> : <LoginPage />} */}
            {isAuthenticated ? <UserProfileForm /> : <LoginPage />}
            {/* first one is once authenticated */}
        </>
    );
}

export default App;
