import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { UserContext } from '../UserContext';
import './ViewJobs.css';
import JobSwitch from './JobSwitch';

function ViewJobs() {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    const { userId } = useContext(UserContext);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/jobs/getJobs');
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);

    const handleApplyJob = (jobId) => {
        if (!userId) {
            console.error('User ID is not available');
            return;
        }

        // Navigate to a job application page or handle job application logic here
        navigate(`/applyJob/${jobId}`, { state: { userId } });
    };

    // Directly use jobs without filtering
    const displayedJobs = jobs;

    return (
        <div>
            <div className='job-switch' >
                <JobSwitch />
            </div>
            <div className="view-jobs-container">
                <div className="header">
                    <h1>Available Jobs</h1>
                </div>
                <div className="cards-container">
                    {displayedJobs.map((job) => (
                        <Card key={job.id} className="job-card">
                            <CardActionArea onClick={() => handleApplyJob(job.id)}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://via.placeholder.com/140"
                                    alt="job image"
                                />
                                <CardContent className="job-card-content">
                                    <Typography gutterBottom variant="h5" component="div" className="job-card-title">
                                        {job.jobTitle}
                                    </Typography>
                                    <Typography variant="body2" className="job-card-description">
                                        {job.jobDescription}
                                    </Typography>
                                    <Typography variant="body2" className="job-card-details">
                                        Location: {job.jobLocation}
                                    </Typography>
                                    <Typography variant="body2" className="job-card-details">
                                        Trade Required: {job.tradesRequired}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ViewJobs;