import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { UserContext } from '../../UserContext';
import '../Jobs.css';
import './TradesmanCentre.css'; 
import API from '../../Api';

function TradesmanCentre() {
    const [assignedJobs, setAssignedJobs] = useState([]);
    const [finishedJobs, setFinishedJobs] = useState([]);
    const navigate = useNavigate();
    const { userId } = useContext(UserContext);

    useEffect(() => {
        const fetchAssignedJobs = async () => {
            try {
                const response = await fetch(`${API}/jobs/tradies/${userId}/closed`);
                const data = await response.json();
                setAssignedJobs(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching assigned jobs:', error);
            }
        };

        const fetchCompletedJobs = async () => {
            try {
                const response = await fetch(`${API}/jobs/tradesman/${userId}/completed`);
                const data = await response.json();
                setFinishedJobs(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching completed jobs:', error);
            }
        };

        if (userId) {
            fetchAssignedJobs();
            fetchCompletedJobs();
        }
    }, [userId]);

    const handleCompleteJob = async (jobId) => {
        try {
            const response = await fetch(`${API}/jobs/${jobId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'completed' }),
            });
            if (response.ok) {
                alert('Job marked as complete!');
                setAssignedJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
                const completedJob = assignedJobs.find((job) => job.id === jobId);
                if (completedJob) {
                    setFinishedJobs((prevFinishedJobs) => [...prevFinishedJobs, completedJob]);
                }
            } else {
                alert('Failed to mark job as complete.');
            }
        } catch (error) {
            console.error('Error marking job as complete:', error);
        }
    };

    const handleInvoice = (jobId) => {
        if (window.confirm('Are you sure you want to invoice for this job?')) {
            navigate(`/invoices/${jobId}`);
        }
    };

    return (
        <div className="view-jobs-container">
            <div className="header">
                <Typography variant="h4" gutterBottom>
                    My Active Tradesman Jobs
                </Typography>
            </div>
            <Grid container spacing={3}>
                {assignedJobs.map((job) => (
                    <Grid item xs={12} sm={6} md={4} key={job.id}>
                        <Card className="card">
                            <CardMedia
                                className="card-media"
                                component="img"
                                image={job.jobImage}
                                alt="job image"
                            />
                            <CardContent className="card-content">
                                <Typography variant="h6">{job.jobTitle || 'No Title Available'}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {job.jobDescription || 'No Description Available'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Location: {job.jobLocation || 'No Location Provided'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Trade Required: {job.tradesRequired || 'No Trade Specified'}
                                </Typography>
                            </CardContent>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleCompleteJob(job.id)}
                                className="card-button"
                            >
                                Mark as Complete
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <div className="header">
                <Typography variant="h4" gutterBottom>
                    Completed Jobs
                </Typography>
            </div>
            <Grid container spacing={3}>
                {finishedJobs.map((job) => (
                    <Grid item xs={12} sm={6} md={4} key={job.id}>
                        <Card className="card">
                            <CardMedia
                                className="card-media"
                                component="img"
                                image={job.jobImage}
                                alt="job image"
                            />
                            <CardContent className="card-content">
                                <Typography variant="h6">{job.jobTitle || 'No Title Available'}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {job.jobDescription || 'No Description Available'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Location: {job.jobLocation || 'No Location Provided'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Trade Required: {job.tradesRequired || 'No Trade Specified'}
                                </Typography>
                            </CardContent>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleInvoice(job.id)}
                                className="card-button"
                            >
                                Invoice
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default TradesmanCentre;