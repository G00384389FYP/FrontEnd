import React, { useState, useEffect } from 'react';
import API from '../../Api';
import { useLocation } from 'react-router-dom';

const ReviewCreate = () => {
    const location = useLocation();
    const { job, userId } = location.state || {}; 
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({
        JobId: job?.id || '',
        ReviewerId: userId || '',
        WorkRating: 0,
        CustomerServiceRating: 0,
        PriceRating: 0,
        Comment: '',
    });

    useEffect(() => {
        fetch(`${API}/reviews`)
            .then((response) => response.json())
            .then((data) => {
                setReviews(data);
            })
            .catch((error) => console.error('Error fetching reviews:', error));
    }, []);

    const handleStarClick = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.Comment) {
            alert('Please fill in all required fields.');
            return;
        }

        fetch(`${API}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json();
                } else {
                    return response.text(); 
                }
            })
            .then((data) => {
                if (typeof data === 'string') {
                    alert(data);
                } else {
                    setReviews((prevReviews) => [...prevReviews, data]);
                    setFormData({
                        JobId: job?.id || '',
                        ReviewerId: userId || '',
                        WorkRating: 0,
                        CustomerServiceRating: 0,
                        PriceRating: 0,
                        Comment: '',
                    });
                }
            })
            .catch((error) => console.error('Error submitting review:', error));
    };

    return (
        <div>
            <h1>Create Review for {job?.jobTitle}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Work Rating:</label>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <span
                            key={value}
                            onClick={() => handleStarClick('WorkRating', value)}
                            style={{
                                cursor: 'pointer',
                                color: formData.WorkRating >= value ? 'gold' : 'gray',
                                fontSize: '24px',
                            }}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <br />
                <div>
                    <label>Customer Service Rating:</label>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <span
                            key={value}
                            onClick={() => handleStarClick('CustomerServiceRating', value)}
                            style={{
                                cursor: 'pointer',
                                color: formData.CustomerServiceRating >= value ? 'gold' : 'gray',
                                fontSize: '24px',
                            }}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <br />
                <div>
                    <label>Price Rating:</label>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <span
                            key={value}
                            onClick={() => handleStarClick('PriceRating', value)}
                            style={{
                                cursor: 'pointer',
                                color: formData.PriceRating >= value ? 'green' : 'gray',
                                fontSize: '24px',
                            }}
                        >
                            $
                        </span>
                    ))}
                </div>
                <br />
                <textarea
                    name="Comment"
                    value={formData.Comment}
                    onChange={(e) =>
                        setFormData((prevData) => ({
                            ...prevData,
                            Comment: e.target.value,
                        }))
                    }
                    placeholder="Write your review here..."
                    rows="4"
                    cols="50"
                    required
                />
                <br />
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default ReviewCreate;