import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import { UserContext } from '../UserContext';
import './Jobs.css';
import JobSwitch from './JobSwitch';
import API from '../Api';

function MyJobs() {
    const [jobs, setJobs] = useState([]);
    const [assignedJobs, setAssignedJobs] = useState([]);
    const [applications, setApplications] = useState([]);
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
                setAssignedJobs(data);
                console.log('Assigned Jobs:', data);
            } catch (error) {
                console.error('Error fetching assigned jobs:', error);
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

        if (userId) {
            fetchJobs();
            fetchAssignedJobs();
            fetchApplications();
        }
    }, [userId]);

    const handleApplyJob = (jobId) => {
        if (!userId) {
            console.error('User ID is not available');
            return;
        }
        navigate(`/jobs/${jobId}`, { state: { userId } });
    };

    const handleAcceptApplication = async (jobId, applicationId) => {
        try {
            const response = await fetch(`${API}/jobs/${jobId}/applications/${applicationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'approved' }),
            });
            if (response.ok) {
                alert('Application accepted successfully!');
                setApplications(applications.filter(app => app.id !== applicationId));
            } else {
                alert('Failed to accept application.');
            }
        } catch (error) {
            console.error('Error accepting application:', error);
            alert('An error occurred while accepting the application.');
        }
    };

    const handleDeclineApplication = async (jobId, applicationId) => {
        try {
            const response = await fetch(`${API}/jobs/${jobId}/applications/${applicationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'declined' }),
            });
            if (response.ok) {
                alert('Application declined successfully!');
                setApplications(applications.filter(app => app.id !== applicationId));
            } else {
                alert('Failed to decline application.');
            }
        } catch (error) {
            console.error('Error declining application:', error);
            alert('An error occurred while declining the application.');
        }
    };

    const handleCompleteJob = async (jobId) => {
        try {
            const response = await fetch(`${API}/jobs/${jobId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                alert('Job marked as complete!');
                setAssignedJobs(assignedJobs.filter(job => job.id !== jobId));
            } else {
                alert('Failed to mark job as complete.');
            }
        } catch (error) {
            console.error('Error marking job as complete:', error);
            alert('An error occurred while marking the job as complete.');
        }
    };

    const pendingApplications = applications.filter(app => app.status === 'pending');
    const otherApplications = applications.filter(app => app.status !== 'pending');

    return (
        <div>
            <div className='job-switch'>
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
                <div className="header">
                    <h1>Pending Job Applications</h1>
                </div>
                <div className="job-applications-container">
                    {pendingApplications.map((application) => (
                        <Card key={application.id} className="job-card">
                            <CardContent className="job-card-content">
                                <Typography gutterBottom variant="h5" component="div" className="job-card-title">
                                    {application.jobTitle}
                                </Typography>
                                <Typography variant="body2" className="job-card-description">
                                    Applicant: {application.tradesman.name}
                                </Typography>
                                <Typography variant="body2" className="job-card-details">
                                    Applied on: {new Date(application.createdAt).toLocaleDateString()}
                                </Typography>
                                <div className="application-buttons">
                                    <Button variant="contained" color="primary" onClick={() => handleAcceptApplication(application.jobId, application.id)}>
                                        Accept
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleDeclineApplication(application.jobId, application.id)}>
                                        Decline
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="header">
                    <h1>Processed Job Applications</h1>
                </div>
                <div className="job-applications-container">
                    {otherApplications.map((application) => (
                        <Card key={application.id} className="job-card">
                            <CardContent className="job-card-content">
                                <Typography gutterBottom variant="h5" component="div" className="job-card-title">
                                    {application.jobTitle}
                                </Typography>
                                <Typography variant="body2" className="job-card-description">
                                    Applicant: {application.tradesman.name}
                                </Typography>
                                <Typography variant="body2" className="job-card-description">
                                    Status: {application.status}
                                </Typography>
                                <Typography variant="body2" className="job-card-details">
                                    Applied on: {new Date(application.createdAt).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <div>
                <h1>My Tradesman Jobs</h1>
                <div className="job-applications-container">
                    {assignedJobs.map((job) => (
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
                                    <Button variant="contained" color="primary" onClick={() => handleCompleteJob(job.id)}>
                                        Mark as Complete
                                    </Button>
                                </CardContent>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyJobs;