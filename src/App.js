import React from 'react';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, useIsAuthenticated } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from './UserContext';
import LoginPage from "./LoginPage";
import UserProfileForm from './Components/UserProfileForm';
import MyProfiles from './Components/MyProfiles';
import CustomerProfileCreate from './Components/Customer/CustomerProfileCreate';
import Home from './Components/Home';
import JobPosting from './Components/JobPosting';
import Navbar from './Components/Navbar';

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

function App() {
    return (
        <MsalProvider instance={msalInstance}>
            <UserProvider>
                <Router>
                    <Navbar />
                    <AuthContent />
                </Router>
            </UserProvider>
        </MsalProvider>
    );
}

function AuthContent() {
    const isAuthenticated = useIsAuthenticated();

    return (
        <>
            {isAuthenticated ? (
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/userProfileForm" element={<UserProfileForm />} />
                    <Route path="/myProfiles" element={<MyProfiles />} />
                    <Route path="/customerProfileCreate" element={<CustomerProfileCreate />} />
                    <Route path="/job-posting" element={<JobPosting />} />
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
