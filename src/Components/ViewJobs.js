import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { UserContext } from '../UserContext';
import './ViewJobs.css';

function ViewJobs() {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    const { userId } = useContext(UserContext);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/jobs/getJobs');
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

            {displayedJobs.map((job) => (
                <Card key={job.id} className="job-card">
                    <CardActionArea onClick={() => handleApplyJob(job.id)}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://via.placeholder.com/140"
                            alt="job image"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {job.jobTitle}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {job.jobDescription}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Job Title: {job.jobTitle}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Location: {job.jobLocation}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Trade Required: {job.tradesRequired}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}

        </div>
    );
}

export default ViewJobs;