import React, { useState, useEffect } from 'react';
import API from '../../Api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reviews = ({ currentUserId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`${API}/reviews`)
            .then((response) => response.json())
            .then((data) => {
                console.log('Fetched reviews:', data);
                setReviews(data);
            })
            .catch((error) => console.error('Error fetching reviews:', error));
    }, []);

    const handleDelete = (reviewId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this review?');
        if (!confirmDelete) return;

        fetch(`${API}/reviews/${reviewId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    setReviews((prevReviews) =>
                        prevReviews.filter((review) => review.reviewId !== reviewId)
                    );
                    toast.success('Review deleted successfully!', {
                        position: 'top-right', 
                        autoClose: 3000,
                    });
                } else {
                    console.error('Failed to delete review', reviewId);
                    toast.error('Failed to delete review.', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                }
            })
            .catch((error) => {
                console.error('Error deleting review:', error);
                toast.error('An error occurred while deleting the review.', {
                    position: 'top-right', 
                    autoClose: 3000,
                });
            });
    };

    const renderStars = (rating) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    const renderDollars = (rating) => {
        return '$'.repeat(rating) + ' '.repeat(3 - rating);
    };

    return (
        <div>
            <h1>Reviews</h1>
            {reviews.length > 0 ? (
                <Grid container spacing={3}>
                    {reviews.map((review, index) => (
                        <Grid item xs={12} key={index}>
                            <Card sx={{ maxWidth: '90%', margin: '0 auto' }}>
                                {review.jobImage && (
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={review.jobImage}
                                        alt={`Job ${review.jobId}`}
                                    />
                                )}
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        Reviewer: {review.reviewerName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Comment: {review.comment}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Job: {review.jobId}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Work Rating: {renderStars(review.workRating)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Customer Service Rating: {renderStars(review.customerServiceRating)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Price Rating: {renderDollars(review.priceRating)}
                                    </Typography>
                                    {currentUserId === review.reviewerId && (
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDelete(review.reviewId)}
                                            sx={{ marginTop: '10px' }}
                                        >
                                            Delete Review
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <p>No reviews yet.</p>
            )}
        </div>
    );
};

export default Reviews;