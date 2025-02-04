import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function JobPosting() {
    const { userId } = useContext(UserContext);
    const [jobDetails, setJobDetails] = useState({
        UserId: userId,
        JobTitle: '',
        JobDescription: '',
        TradesRequired: 'Plumber',
        JobLocation: 'Dublin'
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            console.error('User ID is not available');
            return;
        }

        const requestData = { ...jobDetails, UserId: userId };

        try {
            const response = await fetch('http://localhost:3000/api/jobs/createJob', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Job created successfully:', data);
            navigate('/jobs');
        } catch (error) {
            console.error('Error creating job:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="JobTitle" value={jobDetails.JobTitle} onChange={handleChange} placeholder="Job Title" />
            <textarea name="JobDescription" value={jobDetails.JobDescription} onChange={handleChange} placeholder="Job Description"></textarea>
            <select name="TradesRequired" value={jobDetails.TradesRequired} onChange={handleChange}>
                <option value="Plumber">Plumber</option>
                <option value="Electrician">Electrician</option>
                <option value="Carpenter">Carpenter</option>
            </select>
            <input type="text" name="JobLocation" value={jobDetails.JobLocation} onChange={handleChange} placeholder="Job Location" />
            <button type="submit">Create Job</button>
        </form>
    );
}

export default JobPosting;