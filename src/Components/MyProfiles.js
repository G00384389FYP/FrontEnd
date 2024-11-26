import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function MyProfiles() {
    const navigate = useNavigate();
    const location = useLocation();
    const userID = location.state?.userID;

    useEffect(() => {
        if (userID) {
            console.log('My Profile UserID:', userID);
        }
    }, [userID]);

    const handleCreateCustomerProfile = () => {
        navigate('/customerProfileCreate', { state: { userID } });
    };

    return (
        <div>
            <h1>My Profiles</h1>
            <div>
                <h2>Customer Profile</h2>
                <button onClick={handleCreateCustomerProfile}>Create Customer Profile</button>
            </div>
        </div>
    );
}

export default MyProfiles;