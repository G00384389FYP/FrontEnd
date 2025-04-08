import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import API from '../Api';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

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
            const response = await fetch(`${API}/customers?userId=${userId}`, {
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
            const response = await fetch(`${API}/tradies?userId=${userId}`, {
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
                {customerProfile && (
                    <div className="customer-card-container">
                        <Card sx={{ maxWidth: 345, margin: '20px auto' }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Customer Profile
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>User ID:</strong> {customerProfile.userId}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Jobs Posted:</strong> {customerProfile.jobsPosted}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Is Suspended:</strong> {customerProfile.isSuspended ? 'Yes' : 'No'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Date Added:</strong> {customerProfile.dateAdded}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => navigate('/job-posting')}>Post a New Job</Button>
                                <Button size="small">See My Jobs</Button>
                            </CardActions>
                        </Card>
                    </div>
                )}
            </div>
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