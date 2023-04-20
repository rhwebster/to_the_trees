import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllListings } from "../../store/listing";

import './index.css';

const Listings = () => {
    const dispatch = useDispatch();
    const listings = useSelector(state => state.listings.allListings);
    const listingsArr = [];
    for (let listing in listings) {
        listingsArr.push(listing);
    };

    return (
        <div className="flex container">
            <div className="grid listings-page">
                {
                    listingsArr.map(listing => {
                        <SingleListingCard key={listing.id} listing={listing} />
                    })
                }
            </div>
        </div>
    )
};

export default Listings;
