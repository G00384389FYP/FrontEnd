import React from 'react';
import { useNavigate } from 'react-router-dom';

function MyProfiles() {
    const navigate = useNavigate();

    const handleCreateCustomerProfile = () => {
        navigate('/customerProfileCreate');
    };

    return (
        <div>
            <h1>My Profiles</h1>
            <button onClick={handleCreateCustomerProfile}>Create Customer Profile</button>
        </div>
    );
}

export default MyProfiles;