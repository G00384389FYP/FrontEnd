import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { UserContext } from '../UserContext';
import './Jobs.css';

function JobDetails() {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const { userId } = useContext(UserContext); 
    const tradesmanId = userId;
    const customerId = job ? job.userId : null; // make srue job isnt null before accessing userId as causes the issue w job applications

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5001/jobs/${jobId}`);
                const data = await response.json();
                setJob(data);
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };

        fetchJobDetails();
    }, [jobId]);

    const handleApply = async () => {
        if (window.confirm('Are you sure you want to apply for this job?')) {
            try {
                const response = await fetch(`http://localhost:5001/jobs/${jobId}/applications`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ tradesmanId, customerId }),
                });
                console.log('tradesmanId:', tradesmanId);
                if (response.ok) {
                    alert('Application submitted successfully!');
                } else {
                    alert('Failed to submit application.');
                }
            } catch (error) {
                console.error('Error submitting application:', error);
                alert('An error occurred while submitting your application.');
            }
        }
    };

    if (!job) {
        return <div>Loading...</div>;
    }

    const formattedDate = new Date(job.jobCreatedAt).toLocaleDateString();

    return (
        <div className="job-details-container">
            <div className="header">
                <h1>Job Details</h1>
                <hr></hr>
            </div>
            <div className="job-details-grid">
                <div className="job-details-content">
                    <Card className="job-card">
                        <CardMedia
                            component="img"
                            height="300"
                            image={job.jobImage}
                            alt="job image"
                        />
                        <CardContent className="job-card-content">
                            <Typography gutterBottom variant="h4" component="div" className="job-card-title">
                                {job.jobTitle}
                            </Typography>
                            <Typography variant="body1" className="job-card-description">
                                {job.jobDescription}
                            </Typography>
                            <Typography variant="body2" className="job-card-details">
                                <strong>Location:</strong> {job.jobLocation}
                            </Typography>
                            <Typography variant="body2" className="job-card-details">
                                <strong>Trade Required:</strong> {job.tradesRequired}
                            </Typography>
                            <Typography variant="body2" className="job-card-details">
                                <strong>Posted at:</strong> {formattedDate}
                            </Typography>                       
                        </CardContent>
                    </Card>
                </div>
                <div className="apply-button">
                    <button onClick={handleApply}>Apply</button>
                </div>
            </div>
            <div className="additional-info">
                <h1>Lower - may swap to apply button later</h1>
            </div>
        </div>
    );
}

export default JobDetails;