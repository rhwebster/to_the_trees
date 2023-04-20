import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

const SingleListingCard = ({ listing }) => {

    let images = 
    return (
        <Link to={`/listings/${listing.id}`}>
            <div className='listing-card-top'>
                <div className='listing-image-holder'>
                    <img className='listing-image' src={listing.}
                </div>
            </div>
        </Link>
    )
}