import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

const SingleListingCard = ({ listing }) => {

    let rating = listing.rating;
    if (!rating) rating = 'No yet rated';

    return (
        <Link to={`/listings/${listing.id}`}>
            <div className='listing-card-top'>
                <div className='listing-image-holder'>
                    <img className='listing-image' src={listing.previewImageId} />
                </div>
            </div>
            <div className='listing-card-bottom'>
                <div className='flex listing-info'>
                    <div className='black left bold'>{listing.cityState}</div>
                    <div className='black right flex'><i className='fa-solid fa-star'></i>{rating}</div>
                </div>
                <div className='black bottom'><span className='bold'>${listing.pricePerNight}</span><span>per night</span></div>
            </div>
        </Link>
    )
};

export default SingleListingCard;