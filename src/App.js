import React from 'react';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, useIsAuthenticated } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import LoginPage from "./LoginPage";
import UserProfileForm from './Components/UserProfileForm';
import MyProfiles from './Components/MyProfiles';
import CustomerProfileCreate from './Components/Customer/CustomerProfileCreate';
import Home from './Components/Home';
import JobPosting from './Components/JobPosting';
import Navbar from './Components/Navbar';
import TradesmanProfileCreate from './Components/TradesmanProfileCreate';
import ViewJobs from './Components/ViewJobs';
import JobDetails from './Components/JobDetails'; 
import MyJobs from './Components/MyJobs';
import InvoiceHome from './Components/Jobs/InvoiceHome';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from './Components/Jobs/Checkout';


// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);
const stripePromise = loadStripe("pk_test_51R8eTuPPOChUOQVw3pOEZ6YolPkHExA8seggln8gYaBYwxggRmGpJO7T3Mp33rU6usTNnWqVCWadpD5fwZNcDKWE002WZ9SPKD");


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
                    <Route path="/tradesmanProfileCreate" element={<TradesmanProfileCreate />} />
                    <Route path="/jobs" element={<ViewJobs />} />
                    <Route path="/jobs/:jobId" element={<JobDetails />} />
                    <Route path="/my-jobs" element={<MyJobs />} />
                    <Route path="/invoices/:jobId" element={<InvoiceHome />} />
                    <Route
                        path="/invoices/pay"
                        element={
                            <Elements stripe={stripePromise}>
                                <Checkout />
                            </Elements>
                        }
                    />
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
