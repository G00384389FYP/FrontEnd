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
import Finances from './Components/Jobs/Finances';
import PaymentSuccess from './Components/Jobs/PaymentSucess';
import Reviews from './Components/Jobs/Reviews';
import ReviewCreate from './Components/Jobs/ReviewCreate';
import ReviewEdit from './Components/Jobs/ReviewEdit'; 
import CustomerCentre from './Components/Jobs/CustomerCentre';
import TradesmanCentre from './Components/Jobs/TradesmanCentre';


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
                    <Route path="/tradesmanProfileCreate" element={<TradesmanProfileCreate />} />
                    <Route path="/jobs" element={<ViewJobs />} />
                    <Route path="/jobs/:jobId" element={<JobDetails />} />
                    <Route path="/my-jobs" element={<MyJobs />} />
                    <Route path="/invoices/:jobId" element={<InvoiceHome />} />
                    <Route path="/finances/" element={<Finances />} />
                    <Route path="/my-jobs/payment/success" element={<PaymentSuccess />} />
                    <Route path="/customer-centre" element={<CustomerCentre />} />
                    <Route path="/tradesman-centre" element={<TradesmanCentre />} />
                    <Route path="/reviews" element={<Reviews />} />
                    <Route path="/reviews/new" element={<ReviewCreate />} />
                    {/* <Route path="/reviews/edit:reviewId" element={<ReviewEdit/>} /> */}
                    
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
