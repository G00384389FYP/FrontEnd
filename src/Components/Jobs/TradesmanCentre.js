import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import { UserContext } from '../../UserContext';
import '../Jobs.css';
import API from '../../Api';

function TradesmanCentre() {
    const [jobs, setJobs] = useState([]);
    const [assignedJobs, setAssignedJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [finishedJobs, setFinishedJobs] = useState([]);
    const navigate = useNavigate();
    const { userId } = useContext(UserContext);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(`${API}/jobs/user/${userId}`);
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        const fetchAssignedJobs = async () => {
            try {
                const response = await fetch(`${API}/jobs/tradesman/${userId}`);
                const data = await response.json();
                console.log('Assigned Jobs:', data);  
                if (Array.isArray(data)) {
                    setAssignedJobs(data);
                } else {
                    console.error('Expected an array but received:', data);
                    setAssignedJobs([]);  
                }
            } catch (error) {
                console.error('Error fetching assigned jobs:', error);
                setAssignedJobs([]);  
            }
        };

        const fetchApplications = async () => {
            try {
                const response = await fetch(`${API}/customers/job-applications?userId=${userId}`);
                const data = await response.json();
                setApplications(Array.isArray(data) ? data : []);
                console.log('Applications:', data);
            } catch (error) {
                console.error('Error fetching applications:', error);
                setApplications([]);
            }
        };

        const fetchCompletedJobs = async () => {
            try {
                const response = await fetch(`${API}/jobs/tradesman/${userId}/completed`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setFinishedJobs(data);
                } else {
                    console.error('Expected an array but received:', data);
                    setFinishedJobs([]);  
                }
            } catch (error) {
                console.error('Error fetching completed jobs:', error);
                setFinishedJobs([]);  
            }
        };

        if (userId) {
            fetchJobs();
            fetchAssignedJobs();
            fetchApplications();
            fetchCompletedJobs();
        }
    }, [userId]);

    const handleApplyJob = (jobId) => {
        if (!userId) {
            console.error('User ID is not available');
            return;
        }
        navigate(`/jobs/${jobId}`, { state: { userId } });
    };



    const handleCompleteJob = async (jobId) => {
        try {
            const response = await fetch(`${API}/jobs/${jobId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
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
            alert('An error occurred while marking the job as complete.');
        }
    };

    const handleInvoice = async (jobId) => {
        if (window.confirm('Are you sure you want to invoice for this job?'))
            try {
                console.log('Sending Invoice for jobId:', jobId);
                navigate(`/invoices/${jobId}`);

            }
            catch (error) {
                console.error('Error fetching invoice:', error);
            }
    };


    return (
        <div>
            <div>
                <div className="view-jobs-container">
                    <div className="header">
                        <h1>My Posted Jobs</h1>
                    </div>

                    <div>
                        <h1>My Active Tradesman Jobs</h1>
                        <div className="job-applications-container">
                            {Array.isArray(assignedJobs) && assignedJobs.map((job) => (
                                <Card key={job.id}>
                                    <div>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={job.jobImage}
                                            alt="job image"
                                        />
                                        <CardContent>
                                            <Typography variant="h5">{job.jobTitle || 'No Title Available'}</Typography>
                                            <Typography>{job.jobDescription || 'No Description Available'}</Typography>
                                            <Typography>Location: {job.jobLocation || 'No Location Provided'}</Typography>
                                            <Typography>Trade Required: {job.tradesRequired || 'No Trade Specified'}</Typography>
                                        </CardContent>
                                    </div>
                                    <Button variant="contained" color="primary" onClick={() => handleCompleteJob(job.id)}>
                                        Mark as Complete
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h1>Completed Jobs</h1>
                        <div className="job-applications-container">
                            {finishedJobs.map((job) => (
                                <Card key={job.id} className="job-card job-card-wide">
                                    <div className="job-card-flex">
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={job.jobImage}
                                            alt="job image"
                                            className="job-card-media"
                                        />
                                        <CardContent className="job-card-content">
                                            <Typography gutterBottom variant="h5" component="div" className="job-card-title">
                                                {job.jobTitle || 'No Title Available'}
                                            </Typography>
                                            <Typography variant="body2" className="job-card-description">
                                                {job.jobDescription || 'No Description Available'}
                                            </Typography>
                                            <Typography variant="body2" className="job-card-details">
                                                Location: {job.jobLocation || 'No Location Provided'}
                                            </Typography>
                                            <Typography variant="body2" className="job-card-details">
                                                Trade Required: {job.tradesRequired || 'No Trade Specified'}
                                            </Typography>
                                            <Button variant="contained" color="primary" onClick={() => handleInvoice(job.id)}>
                                                Invoice
                                            </Button>
                                        </CardContent>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </div>

    );
}

export default TradesmanCentre;