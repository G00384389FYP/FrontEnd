import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function MyProfiles() {
    const navigate = useNavigate();
    const { userId } = useContext(UserContext);

    const [customerProfile, setCustomerProfile] = useState(null);
    const [cxExists, setCxExists] = useState(null);
    // eslint-disable-next-line
    const [customerJoinDate, setcustomerJoinDate] = useState(null);

    const [tradesmanProfile, setTradesmanProfile] = useState(null);
    const [txExists, setTxExists] = useState(null);

    useEffect(() => {
        if (userId) {
            console.log('My Profile UserID:', userId);
            checkCustomerProfile(userId);
            checkTradesmanProfile(userId);
        }
    }, [userId]);

    const checkCustomerProfile = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5001/customers?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            // console.log('Response from backend:', data);
            setCxExists(data.exists);
            if (data.exists) {
                setCustomerProfile(data.customerProfile);
                setcustomerJoinDate(data.customerProfile.dateAdded);
            } else {
                setCustomerProfile(null);
            }
        } catch (error) {
            console.error('Error checking customer profile:', error);
        }
    };

    const checkTradesmanProfile = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5001/tradies?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            // console.log('Response from backend:', data);
            setTxExists(data.exists);
            if (data.exists) {
                setTradesmanProfile(data.tradesmanProfile);
            } else {
                setTradesmanProfile(null);
            }
        } catch (error) {
            console.error('Error checking tradesman profile:', error);
        }
    };

    return (
        <div>
            <h1>My Profiles</h1>
            <div>
                {cxExists === null ? (
                    <div>
                        <p>Loading...</p>
                        <p>Contacting Database</p>
                    </div>
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
                            <button className='profile-button' onClick={() => navigate('/job-posting')}>Post a new Job</button>
                            <button className='profile-button'>See my Jobs</button>
                        </div>
                        <div className='TradesmanProfile'>
                            <h2>Tradesman Profile</h2>
                            {txExists ? (
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Trade:</td>
                                            <td>{tradesmanProfile?.trade}</td>
                                        </tr>
                                        <tr>
                                            <td>Location:</td>
                                            <td>{tradesmanProfile?.location}</td>
                                        </tr>
                                        <tr>
                                            <td>Number of Jobs Completed:</td>
                                            <td>{tradesmanProfile?.numberOfJobsCompleted}</td>
                                        </tr>
                                        <tr>
                                            <td>Trade Bio:</td>
                                            <td>{tradesmanProfile?.tradeBio}</td>
                                        </tr>
                                        <tr>
                                            <td>Work Distance:</td>
                                            <td>{tradesmanProfile?.workDistance} km</td>
                                        </tr>
                                        <tr>
                                            <td>Date Joined:</td>
                                            <td>{tradesmanProfile?.dateJoined}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            ) : (
                                <button className='profile-button' onClick={() => navigate('/tradesmanProfileCreate', { state: { userId } })}>
                                    Create Tradesman Profile
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <button onClick={() => navigate('/customerProfileCreate', { state: { userId } })}>
                        Create Customer Profile
                    </button>
                )}
            </div>
        </div>
    );
}

export default MyProfiles;