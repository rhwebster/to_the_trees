import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { deleteTreehouseReview } from "../../store/treehouseReview";
import { getOneListing } from "../../store/listing";

import './index.css';

const DeleteReviewForm = ({setShowDeleteForm, reviewId, listingId}) => {
    const dispatch = useDispatch();

    const deleteReview = () => {
        dispatch(deleteTreehouseReview(reviewId))
            .then(() => {
                dispatch(getOneListing(listingId))})
            .then(setShowDeleteForm(false));
    }

    return (
        <div className="delete-review-holder">
            <div className="delete-review signup-exit-holder">
                <div onClick={() => setShowDeleteForm(false)} className="circle delete-review">
                <i id="exit-reviews" className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div>
                <div>
                    <h4>Delete This Review?</h4>
                </div>
                <div className="delete-review-bottom-nav">
                    <div>
                        {"<"}<Link className="underline" onClick={() => setShowDeleteForm(false)}>Back</Link>
                    </div>
                    <button className="delete-review-button" onClick={deleteReview}>Delete Review</button>
                </div>
            </div>
        </div>
    )
};

export default DeleteReviewForm;