import React from "react";
import { useSelector } from "react-redux";

import ListingReviewPreviewCard from "../ListingReviewPreviewCard";

import './index.css';

const ListingReviewsPreview = ({listingId, rating, numReviews, setShowModal}) => {
    const reviews = useSelector(state => state.treehouseReviews);
    let reviewArr = [];
    for (const review in reviews) {
        reviewArr.push(reviews[review])
    };

    let previewReviews = reviewArr.slice(0,6);

    return numReviews ? (
        <div>
            <div className="display-title">
                <h2>
                <span><i className="fa-solid fa-star"/>{rating}</span>
                <span>{numReviews === 1 ? ` ${numReviews} review` : ` ${numReviews} reviews` } </span>
                </h2>
            </div>
            <div className="reviews-preview-holder">
                {previewReviews.length && previewReviews.map(review => (
                    <ListingReviewPreviewCard setShowModal={setShowModal}
                    key={review.id} listingId={listingId} review={review} />
                ))}
            </div>
        </div>
    ) : null;
};

export default ListingReviewsPreview;