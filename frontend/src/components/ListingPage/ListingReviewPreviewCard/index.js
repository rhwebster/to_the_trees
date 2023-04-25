import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import DeleteReviewForm from "../../DeleteReviewForm";
import { Modal } from "../../../context/Modal";

import './index.css';

const ListingReviewPreviewCard = ({review, listingId, setShowModal}) => {
    const user = useSelector(state => state.session.user);

    const [showDeleteReviewForm, setShowDeleteReviewForm] = useState(false);

    useEffect(() => {
        return document.body.style.overflow = showDeleteReviewForm ? 'hidden' : 'unset';
    },[showDeleteReviewForm]);

    let firstName = user.name.split(' ')[0];
    let showMoreButton = review.body.length > 120 ? true : false;
    let shownReview = showMoreButton ? review.body.slice(0, 120)+'...' : review.body;

    return (
        <>
        <div className="review-preview-card">
            <div className="flex user-info">
                <div className="user-icon">
                <i id="review-icon" className="fa-solid fa-circle-user profile"></i>
                </div>
                <div className="name-holder flex-column">
                    <h4 id="name">{firstName}</h4>
                    <h5 id="date">{review.updatedAt}</h5>
                </div>
            </div>
            <div className="review-holder no-overflow flex">
                <div id='review-body' className="preview-card">{shownReview}</div>
                <div className="showmore">
                    {showMoreButton && (
                        <span>
                            <Link className="underline" to='' onClick={(e) => {
                                e.preventDefault();
                                setShowModal(true)
                            }}>Show More</Link>{' >'}
                        </span>
                    )}
                    {user && review.guestId === user.id && (
                        <div id="button-holder">
                            <button className="delete-review" onClick={() => setShowDeleteReviewForm(true)}>Delete your review</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
        {showDeleteReviewForm && (
            <Modal onClose={() => setShowDeleteReviewForm(false)}>
                <DeleteReviewForm reviewId={review.id} listingId={listingId} setShowDeleteReviewForm={setShowDeleteReviewForm} />
            </Modal>
        )}
        </>
    )
};

export default ListingReviewPreviewCard;