import React, { useState, useEffect } from 'react';
import API from '../../Api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Reviews = () => {
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


    return (
        <div>

            <div>
                <h1>Reviews</h1>
                {reviews.length > 0 ? (
                    <div>
                        {reviews.map((review, index) => (
                            <Card key={index} sx={{ marginBottom: 2 }}>
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
                                        Work Rating: {review.workRating}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Customer Service Rating: {review.customerServiceRating}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Price Rating: {review.priceRating}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
        </div>
    );
};

export default Reviews;