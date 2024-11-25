import React from 'react';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, useIsAuthenticated } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import LoginPage from "./LoginPage";

import UserProfileForm from './Components/UserProfileForm';
import MyProfiles from './Components/MyProfiles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CustomerProfileCreate from './Components/Customer/CustomerProfileCreate';

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

function App() {
    return (
        <MsalProvider instance={msalInstance}>
            <Router>
                <AuthContent />
            </Router>
        </MsalProvider>
    );
}

function AuthContent() {
    const isAuthenticated = useIsAuthenticated();

    return (
        <>
            {isAuthenticated ? (
                <Routes>
                    {/* <Route path="/" element={<Navigate to="/userProfileForm" />} /> */}
                    <Route path="/userProfileForm" element={<UserProfileForm />} />
                    <Route path="/userProfileForm" element={<UserProfileForm />} />
                    <Route path="/myProfiles" element={<MyProfiles />} />
                    <Route path="/customerProfileCreate" element={<CustomerProfileCreate />} />
                </Routes>
            ) : (
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                </Routes>
            )}
        </>
    );
}

export default App;
