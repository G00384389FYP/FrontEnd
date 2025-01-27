import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function MyProfiles() {
    const navigate = useNavigate();
    const location = useLocation();
    const userID = location.state?.userID;

    const [customerProfile, setCustomerProfile] = useState(null);
    const [cxExists, setCxExists] = useState(null);

    const [customerJoinDate, setcustomerJoinDate] = useState(null);

    useEffect(() => {
        if (userID) {
            console.log('My Profile UserID:', userID);
            checkCustomerProfile(userID);
        }
    }, [userID]);

    const checkCustomerProfile = async (userID) => {
        try {
            const response = await fetch('http://localhost:5001/api/customer/checkCustomerProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userID })
            });
            const data = await response.json();
            console.log('Response from backend:', data);
            setCxExists(data.exists);
            // console.log(data.exists);            
            if (data.exists == true) {
                // console.log('data:', data);
                // console.log('data.cust:', data.customerProfile);

                let customerProfile = data.customerProfile;

                console.log('customerProfile:', customerProfile);
                console.log('customerProfile.values:', customerProfile.dateAdded);
                let customerJoinDate = customerProfile.dateAdded;
                console.log('join date :', customerJoinDate);

                setCustomerProfile(customerProfile); // Update state


            } else {
                setCustomerProfile(null);
                console.log('Womp No customer profile found.');
            }
        } catch (error) {
            console.error('Error checking customer profile:');
        }
    };


    return (
        <div>
            <h1>My Profiles</h1>
            <div>
                {cxExists === null ? (
                    <p>Loading...</p>
                ) : cxExists ? (
                    <div className='profiles-container'>
                        <div className='CustomerDetails'>
                            <h2>Customer Profile</h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>User ID:</td>
                                        <td>{customerProfile?.userId}</td>
                                    </tr>
                                    <tr>
                                        <td>Jobs Posted:</td>
                                        <td>{customerProfile?.jobsPosted}</td>
                                    </tr>
                                    <tr>
                                        <td>Is Suspended:</td>
                                        <td>{customerProfile?.isSuspended ? 'Yes' : 'No'}</td>
                                    </tr>
                                    <tr>
                                        <td>Date Added:</td>
                                        <td>{customerProfile?.dateAdded}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className='profile-button'onClick={() => navigate('/job-posting')}>Post a new Job</button>
                            <button className='profile-button'>See my Jobs</button>
                        </div>
                        <div className='TradesmanProfile'>
                            <h2>Tradesman Profile</h2>
                            {/* Add Tradesman Profile details here */}
                            <button className='profile-button' onClick={() => navigate('/tradesmanProfileCreate', { state: { userID } })}>
                                Create Tradesman Profile
                            </button>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => navigate('/customerProfileCreate', { state: { userID } })}>
                        Create Customer Profile
                    </button>
                )}
            </div>
        </div>
    );
}

export default MyProfiles;