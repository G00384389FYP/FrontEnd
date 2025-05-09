import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const Home = () => {
    const navigate = useNavigate();

    const handlePostJobClick = () => {
        navigate('/job-posting');
    };

    const handleSeeReviewsClick = () => {
        navigate('/reviews');
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Nixers.ie</h1>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/myProfiles">My Profiles</a></li>
                        <li><a href="/job-posting">Jobs</a></li>
                    </ul>
                </nav>
            </header>
            <div className="home-content">
                <div className="cards-container">
                    <Card sx={{ maxWidth: 345 }}  onClick={handleSeeReviewsClick}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://nixersstorage.blob.core.windows.net/profile-images/review_stars.png"
                                alt="jobs img"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Reviews
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    See what people have to say about completed Nixers
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card sx={{ maxWidth: 345 }} onClick={handlePostJobClick}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://nixersstorage.blob.core.windows.net/profile-images/job_posting_img.png"
                                alt="profile img"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Post a job
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Have a nixer you need done?
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card onClick={() => navigate('/tradesman-centre')} sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                 image="https://nixersstorage.blob.core.windows.net/profile-images/tradesman.jpg"
                                alt="contact img"
                                sx={{ objectFit: 'contain' }} 
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Tradesman Centre
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Are you a tradesman? Browse Nixers
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card onClick={() => navigate('/customer-centre')} sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                 image="https://nixersstorage.blob.core.windows.net/profile-images/customer_centre.png"
                                alt="contact img"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Customer Centre
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Customer Care
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            </div>
            <footer className="home-footer">
                <p>&copy; 2023 Nixers. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;