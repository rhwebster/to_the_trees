import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllListings } from "../../store/listing";
import SingleListingCard from "../SingleListingCard";

import './index.css';

const Listings = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllListings());
    }, [dispatch]);

    const listings = useSelector(state => state.listings.allListings);
    const listingsArr = [];
    for (let listing in listings) {
        listingsArr.push(listing);
    };

    return (
        <div className="flex outer-container">
            <div id="listing-grid" className="grid listings-page">
                {
                    listingsArr.map(listing => (
                        <SingleListingCard key={listing.id} listing={listing} />
                    ))
                }
            </div>
        </div>
    )
};

export default Listings;
