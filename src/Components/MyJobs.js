import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { UserContext } from '../UserContext';
import './Jobs.css';
import JobSwitch from './JobSwitch';

function MyJobs() {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    const { userId } = useContext(UserContext);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                console.log('userId:', userId);
                const response = await fetch(`http://localhost:5001/jobs/user/${userId}`);
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        if (userId) {
            fetchJobs();
        }
    }, [userId]);

    const handleApplyJob = (jobId) => {
        if (!userId) {
            console.error('User ID is not available');
            return;
        }    
        navigate(`/jobs/${jobId}`, { state: { userId } });
    };

    return (
        <div>
            <div className='job-switch' >
                <JobSwitch />
            </div>
            <div className="view-jobs-container">
                <div className="header">
                    <h1>My Posted Jobs</h1>
                </div>
                <div className="cards-container">
                    {jobs.map((job) => (
                        <Card key={job.id} className="job-card">
                            <CardActionArea onClick={() => handleApplyJob(job.id)}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={job.jobImage}
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

export default MyJobs;