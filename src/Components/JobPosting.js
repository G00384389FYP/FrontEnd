import React, { useState } from 'react';
import { useUser } from '../UserContext';

const JobPosting = () => {
    const { userID } = useUser();
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [tradesRequired, setTradesRequired] = useState('');
    const [location, setLocation] = useState('');
    const [jobMedia, setJobMedia] = useState('');
    const [jobStatus, setJobStatus] = useState('Open');
    const [assignedTradesman, setAssignedTradesman] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const jobData = {
            userId: userID,
            jobTitle,
            jobDescription,
            tradesRequired,
            location,
            jobMedia,
            datePosted: new Date(),
            jobStatus,
            assignedTradesman
        };

        try {
            const response = await fetch('/api/job/postJob', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jobData),
            });
            if (response.ok) {
                console.log('Job posted successfully');
                // Reset form fields
                setJobTitle('');
                setJobDescription('');
                setTradesRequired('');
                setLocation('');
                setJobMedia('');
                setJobStatus('Open');
                setAssignedTradesman(null);
            } else {
                console.error('Failed to post job');
            }
        } catch (error) {
            console.error('Error posting job:', error);
        }
    };

    return (
        <div>
            <h1>Post a New Job</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Job Title:</label>
                    <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Job Description:</label>
                    <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Trades Required:</label>
                    <input
                        type="text"
                        value={tradesRequired}
                        onChange={(e) => setTradesRequired(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Job Media (optional):</label>
                    <input
                        type="text"
                        value={jobMedia}
                        onChange={(e) => setJobMedia(e.target.value)}
                    />
                </div>
                <div>
                    <label>Job Status:</label>
                    <select
                        value={jobStatus}
                        onChange={(e) => setJobStatus(e.target.value)}
                    >
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>
                <div>
                    <label>Assigned Tradesman (optional):</label>
                    <input
                        type="number"
                        value={assignedTradesman || ''}
                        onChange={(e) => setAssignedTradesman(e.target.value ? parseInt(e.target.value) : null)}
                    />
                </div>
                <button type="submit">Post Job</button>
            </form>
        </div>
    );
};

export default JobPosting;