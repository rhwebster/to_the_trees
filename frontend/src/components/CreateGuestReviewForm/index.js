import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { createGuestReview } from '../../store/userReview';

import './index.css';

const GuestReviewForm = ({userId, setShowReviewForm, user}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [body, setBody] = useState('');
    const [rating, setRating] = useState(5);
    const [validationErrrors, setValidationErrors] = useState([]);

    const handleValidationErrors = () => {
        const errors = [];
        if (!body.length || body.length > 255) errors.push('Please enter a review of 255 characters or less');
        if (isNaN(rating) || rating <= 0 || rating > 5) errors.push('Please rate between 1 and 5 stars');
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = handleValidationErrors()
        if (errors.length) return setValidationErrors(errors);

        const data = { body: body, rating: rating };

        let res = await dispatch(createGuestReview(userId, data))
        if (res.errors) {
            let errors = [];
            for (const err in res.errors) {
                errors.push(res.errors[err])
            }
            setValidationErrors(errors);
            return;
        }

        setBody('');
        setRating(5);
        setValidationErrors([]);
        setShowReviewForm(false);
        history.push(`/`);
    };

    return (
        <div className="create-review-form-card">
            <div className="create-review-exit-holder">
                <div onClick={() => setShowReviewForm(false)} className="review-circle">
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div className="create-review-form-holder">
                <form className="create-review-form" onSubmit={handleSubmit}>
                    <h4 className="create-review-title">Review {user.name}</h4>
                </form>
            </div>
        </div>
    )
}