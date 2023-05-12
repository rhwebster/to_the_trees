import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getMonth } from '../../../helpers';

import DeleteReviewForm from "../../DeleteReviewForm";
import { Modal } from "../../../context/Modal";
import './index.css';

const ReviewCard = ({treehouseReview, listingId}) => {
    const user = useSelector(state => state.session.user);

    const [showDeleteReviewForm, setShowDeleteReviewForm] = useState(false);

    useEffect(() => {
        if (showDeleteReviewForm) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [showDeleteReviewForm])

    let date = getMonth(treehouseReview.createdAt);

    return (
        <>
        <div className="review-card flex">
            <div className="flex user-info">
                <div className="user-icon">
                    <i id="review-icon" className="fa-solid fa-circle-user profile"></i>
                </div>
                <div className="username-holder flex-column">
                    <h4 id="username">{treehouseReview.User.name}</h4>
                    <h5 id="review-date">{date}</h5>
                </div>
            </div>
            <div className="review-holder-modal flex">
                <div className="review-text">{treehouseReview.body}</div>
                <div className="show-more-button-modal">
                    {(user && (treehouseReview.User.id === user.id)) && (
                        <div className="button-holder-modal">
                            <button className="delete-review-button-modal" onClick={() => setShowDeleteReviewForm(true)}>Delete Your Review</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
        {showDeleteReviewForm && (
            <Modal onClose={() => setShowDeleteReviewForm(false)}>
                <DeleteReviewForm reviewId={treehouseReview.id} listingId={listingId} setShowDeleteReviewForm={setShowDeleteReviewForm}/>
            </Modal>
        )}
        </>
    )
};

export default ReviewCard;