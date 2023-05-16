import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTreehouseReviews } from "../../store/treehouseReview";
import ListingReviewCard from '../ListingPage/ListingReviewCard';

import './listingReviews.css';

const ListingReviews = ({ listingId, rating, setShowModal}) => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.listingReviews)
    const reviewArr = [];
    for (let review in reviews) {
        reviewArr.push(reviews[review]);
    };

    useEffect(() => {
        dispatch(getTreehouseReviews(listingId));
    }, []);

    return (
        <div className="reviews-holder">
            <div className="exit-holder">
                <div onClick={() => setShowModal(false)} className="reviews-circle">
                <i id="exit-reviews" className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div className="reviews-content">
                <div className="left-holder">
                    <h4 className="reviews-title">
                        <div className="star-holder"><i className="fa-solid fa-star review-star-big"/></div> {rating}
                    </h4>
                </div>
                <div className="reviews-container">
                    {reviewArr.length ? reviewArr.map(review => (
                        <ListingReviewCard key={review.id} review={review} listingId={listingId}/>
                    )) : <h4>This treehouse hasn't currently been reviewed</h4>}
                </div>
            </div>
        </div>
    )
};

export default ListingReviews;