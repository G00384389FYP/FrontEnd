import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../Api';

function TradesmanProfileCreate() {
    const [tradesmanDetails, setTradesmanDetails] = useState({
        trade: 'Electrician',
        location: 'Galway',
        numberOfJobsCompleted: 0,
        tradeBio: '',
        workDistance: 10
    });
    const navigate = useNavigate();
    const location = useLocation();
    const userID = location.state?.userID;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTradesmanDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userID) {
            console.error('User ID is not available');
            return;
        }

        const formattedDateJoined = new Date().toISOString();
        const requestData = { 
            userId: userID,
            trade: tradesmanDetails.trade,
            location: tradesmanDetails.location,
            numberOfJobsCompleted: tradesmanDetails.numberOfJobsCompleted,
            tradeBio: tradesmanDetails.tradeBio,
            workDistance: tradesmanDetails.workDistance,
            dateJoined: formattedDateJoined
        };

        console.log('Sending POST request with data:', requestData);

        try {
            const response = await fetch(`${API}/tradies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
            const data = await response.json();
            console.log('Response from server:', data);
            if (data.errors) {
                console.error('Validation errors:', data.errors);
            } else {
                console.log('Tradesman profile created successfully!');
                navigate('/myProfiles', { state: { userID } });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const countiesInIreland = [
        'Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford', 'Kilkenny', 'Wexford', 'Kerry', 'Clare', 'Tipperary',
        'Mayo', 'Sligo', 'Donegal', 'Louth', 'Meath', 'Kildare', 'Wicklow', 'Laois', 'Offaly', 'Westmeath',
        'Longford', 'Leitrim', 'Roscommon', 'Cavan', 'Monaghan', 'Carlow'
    ];

    return (
        <div>
            <h1>Create Tradesman Profile</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="trade">Trade:</label>
                    <select
                        id="trade"
                        name="trade"
                        value={tradesmanDetails.trade}
                        onChange={handleChange}
                        required
                    >
                        <option value="Electrician">Electrician</option>
                        <option value="Carpenter">Carpenter</option>
                        <option value="Plumber">Plumber</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <select
                        id="location"
                        name="location"
                        value={tradesmanDetails.location}
                        onChange={handleChange}
                        required
                    >
                        {countiesInIreland.map(county => (
                            <option key={county} value={county}>{county}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="tradeBio">Trade Bio:</label>
                    <textarea
                        id="tradeBio"
                        name="tradeBio"
                        value={tradesmanDetails.tradeBio}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="workDistance">Work Distance (km):</label>
                    <input
                        type="range"
                        id="workDistance"
                        name="workDistance"
                        min="10"
                        max="99"
                        value={tradesmanDetails.workDistance}
                        onChange={handleChange}
                        required
                    />
                    <span>{tradesmanDetails.workDistance} km</span>
                </div>
                <button type="submit">Create Tradesman Profile</button>
            </form>
        </div>
    );
}

export default TradesmanProfileCreate;