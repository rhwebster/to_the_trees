import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { createTreehouseReview } from "../../store/treehouseReview";
import { getOneListing } from "../../store/listing";

import './index.css';

const CreateReviewForm = ({listingId, setShowReviewForm, listing}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [body, setBody] = useState('');
    const [rating, setRating] = useState(5);
    const [validationErrrors, setValidationErrors] = useState([]);


    const handleValidationErrors = () => {
        const errors = [];
        if (!body.length) errors.push('Please enter a reveiw');
        if (!body.length > 255) errors.push('Exceeded maximum number of characters');
        if (rating <= 0 || rating > 5) errors.push('Please rate between 1 and 5 stars');
        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefaul();

        const errors = handleValidationErrors();
        if (validationErrrors.length) return setValidationErrors(errors);
        const data = {
            body: body,
            rating: rating
        }

        let res = await dispatch(createTreehouseReview(listingId, data))
        if (res.errors) {
            let errors = [];
            for (const err in res.errors) {
                errors.push(res.errors[err])
            }
            setValidationErrors(errors);
            return;
        };

        setBody('');
        setRating(5);
        setValidationErrors([]);
        setShowReviewForm(false);
        history.push(`/listings/${listingId}`);
    }

    return (
        <div className="create-review-form-card">
            <div className="create-review-exit-holder">
                <div onClick={() => setShowReviewForm(false)} className="review-circle">
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div className="create-review-form-holder">
                <form className="create-review-form" onSubmit={handleSubmit}>
                    <h4 className="create-review-title"> Review {listing.name}</h4>
                    <div className="create-review-exterior">
                        <div className="review-input">
                        <label className="name-description-title">Review</label>
                        <textarea className="create-text description" id="body" value={body} onChange={(e) => setBody(e.target.value)}/>
                        </div>
                        <label className="rating-desciption-title">Stars</label>
                        <div className="rating-input">
                            <input className="stars-location-input" id="rating" type="number" value={rating} onChange={(e) => setRating(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="create-review-button-holder">
                        <button type="submit" className="create-review-button">Submit Review</button>
                    </div>
                    {validationErrrors.length && (
                        <ul>
                            {validationErrrors.map(err => (
                                <li key={err}>{err}</li>
                            ))}
                        </ul>
                    )}
                </form>
            </div>
        </div>
    )
};

export default CreateReviewForm;