import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";

import { getOneListing } from "../../store/listing";
import { getTreehouseReviews } from "../../store/treehousereview";

import { Modal } from '../../context/Modal';

import './index.css';

const ListingDetails = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const { listingId } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    if (showModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';

    useEffect(() => {
        if (showModal || showReviewForm) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [showModal, showReviewForm]);

    useEffect(() => {
        const variable = dispatch(getOneListing(listingId))
            .then(() => dispatch(getTreehouseReviews(listingId)))
            .then(() => setIsLoaded(true))
            .catch(() => history.push('/page-not-found'))
    }, [dispatch, isLoaded]);

    const listing = useSelector(state => state.listings.singleListing);
    const user = useSelector(state => state.session.user);
    const listingReviews = useSelector(state => state.treehouseReviews.listingReviews);
    const ownerFirstName = user.name.split(' ')[0];

    let reviews = Object.values(listingReviews);
    const images = listing.Images;
    const owner = listing.Owner;
    
    if (!isLoaded) {
        return(
            <></>
        )
    } else {
        return (
            <div className="flex center">
                <div className="info-holder">
                    <div className="title-card">
                        <h2 id="title">{listing.name}</h2>
                        <div "flex title-lower">
                            <h4>
                                <i className="fa-solid fa-star"/>{listing.rating}
                                <span> - </span>
                                <Link className="underling" to onClick={(e) => {
                                    e.preventDefault();
                                    setShowModal(true);
                                }}>{reviews.length} {(reviews.length !== 1) && `reviews`}{reviews.length === 1 && `review`}
                                </Link>
                                <span>{listing.cityState}</span>
                                <span>${listing.pricePreNight} / night</span>
                            </h4>
                            {user && user.id === listing.ownerId && (
                                <div className="edit-button">
                                    <Link className="underline" to {`/listings/${listingId}/edit`}>
                                        Edit
                                    </Link>
                                </div>
                            )}
                        </div> 
                    </div>
                    <ListingImages preview={listing.preview} />
                    <div id="user-info" className="display-info">
                        {listing.ownerId !== user.id ? (
                            <h2>Treehouse hosted by {ownerFirstName}</h2>
                        ) : (
                            <>
                                <h2>This is your treehouse</h2>
                                <p>You can edit your rental from the edit page above</p>
                            </>
                        )}
                    </div>
                    <div className="display-info">
                        <p>{listing.description}</p>
                    </div>
                    {listing.ownerId !== user.id && (
                        <div className="displlay-info">
                        <ListingReservations listing={listing}/>
                        </div>
                    )}
                    <div className="display-info">

                </div>
            </div>
        )
    }
}