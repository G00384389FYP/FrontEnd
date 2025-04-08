import React, { useState } from 'react';
import API from '../../Api';
import { useLocation, useNavigate } from 'react-router-dom';
import './Reviews.css';

const ReviewCreate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { job, userId } = location.state || {};
    const [formData, setFormData] = useState({
        JobId: job?.id || '',
        ReviewerId: userId || '',
        WorkRating: 0,
        CustomerServiceRating: 0,
        PriceRating: 0,
        Comment: '',
    });
    const [info, setInfo] = useState({});

    const handleStarClick = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleInfoClick = (ratingType) => {
        setInfo((prevInfo) => ({
            ...prevInfo,
            [ratingType]: true,
        }));
        setTimeout(() => {
            setInfo((prevInfo) => ({
                ...prevInfo,
                [ratingType]: false,
            }));
        }, 7000); 
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
                    navigate('/customer-centre');
                } else {
                    setFormData({
                        JobId: job?.id || '',
                        ReviewerId: userId || '',
                        WorkRating: 0,
                        CustomerServiceRating: 0,
                        PriceRating: 0,
                        Comment: '',
                    });
                    navigate('/customer-centre');
                }
            })
            .catch((error) => console.error('Error submitting review:', error));
    };

    return (
        <div className="review-container">
            <h1 className="review-title">Create Review for {job?.jobTitle}</h1>
            <form onSubmit={handleSubmit} className="review-form">
                <div className="rating-section">
                    <label className="rating-label">
                        Work Rating
                        <span
                            onClick={() => handleInfoClick('WorkRating')}
                            className="info-icon"
                        >
                            i
                        </span>
                        <span className={`tooltip ${info.WorkRating ? 'show' : ''}`}>
                            Rate the quality of the work completed.
                        </span>
                    </label>
                    <div className="rating-stars">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <span
                                key={value}
                                onClick={() => handleStarClick('WorkRating', value)}
                                className={formData.WorkRating >= value ? 'gold' : 'gray'}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>

                <div className="rating-section">
                    <label className="rating-label">
                        Customer Service Rating
                        <span
                            onClick={() => handleInfoClick('CustomerServiceRating')}
                            className="info-icon"
                        >
                            i
                        </span>
                        <span className={`tooltip ${info.CustomerServiceRating ? 'show' : ''}`}>
                            Rate the quality of customer service provided.
                        </span>
                    </label>
                    <div className="rating-stars">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <span
                                key={value}
                                onClick={() => handleStarClick('CustomerServiceRating', value)}
                                className={formData.CustomerServiceRating >= value ? 'gold' : 'gray'}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>

                <div className="rating-section">
                    <label className="rating-label">
                        Price Rating
                        <span
                            onClick={() => handleInfoClick('PriceRating')}
                            className="info-icon"
                        >
                            i
                        </span>
                        <span className={`tooltip ${info.PriceRating ? 'show' : ''}`}>
                            Rate the fairness of the price charged.
                        </span>
                    </label>
                    <div className="rating-stars">
                        {[1, 2, 3].map((value) => (
                            <span
                                key={value}
                                onClick={() => handleStarClick('PriceRating', value)}
                                className={formData.PriceRating >= value ? 'green' : 'gray'}
                            >
                                $
                            </span>
                        ))}
                    </div>
                </div>
                <label className="comment-label">Comments</label>
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
                    className="comment-box"
                />
                <button type="submit" className="submit-button">
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default ReviewCreate;