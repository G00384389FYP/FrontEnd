import React, { useState, useEffect } from 'react';
import API from '../../Api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ReviewCreate = () => {
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({
        JobId: '',
        InvoiceId: '',
        ReviewerId: '',
        WorkRating: '',
        CustomerServiceRating: '',
        PriceRating: '',
        Comment: '',
    });

    // Fetch reviews from the server
    useEffect(() => {
        fetch(`${API}/reviews`)
            .then((response) => response.json())
            .then((data) => {
                console.log('Fetched reviews:', data); // Log the fetched reviews
                setReviews(data);
            })
            .catch((error) => console.error('Error fetching reviews:', error));
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.JobId || !formData.InvoiceId || !formData.ReviewerId || !formData.Comment) {
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
                    return response.text(); // Handle plain text responses
                }
            })
            .then((data) => {
                if (typeof data === 'string') {
                    alert(data);
                } else {
                    setReviews((prevReviews) => [...prevReviews, data]);
                    setFormData({
                        JobId: '',
                        InvoiceId: '',
                        ReviewerId: '',
                        WorkRating: '',
                        CustomerServiceRating: '',
                        PriceRating: '',
                        Comment: '',
                    });
                }
            })
            .catch((error) => console.error('Error submitting review:', error));
    };

    return (
        <div>
            <h2>Reviews</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="JobId"
                    value={formData.JobId}
                    onChange={handleChange}
                    placeholder="Job ID"
                    required
                />
                <br />
                <input
                    type="text"
                    name="InvoiceId"
                    value={formData.InvoiceId}
                    onChange={handleChange}
                    placeholder="Invoice ID"
                    required
                />
                <br />
                <input
                    type="number"
                    name="ReviewerId"
                    value={formData.ReviewerId}
                    onChange={handleChange}
                    placeholder="Reviewer ID"
                    required
                />
                <br />
                <input
                    type="number"
                    name="WorkRating"
                    value={formData.WorkRating}
                    onChange={handleChange}
                    placeholder="Work Rating (1-5)"
                    min="1"
                    max="5"
                />
                <br />
                <input
                    type="number"
                    name="CustomerServiceRating"
                    value={formData.CustomerServiceRating}
                    onChange={handleChange}
                    placeholder="Customer Service Rating (1-5)"
                    min="1"
                    max="5"
                />
                <br />
                <input
                    type="number"
                    name="PriceRating"
                    value={formData.PriceRating}
                    onChange={handleChange}
                    placeholder="Price Rating (1-5)"
                    min="1"
                    max="5"
                />
                <br />
                <textarea
                    name="Comment"
                    value={formData.Comment}
                    onChange={handleChange}
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