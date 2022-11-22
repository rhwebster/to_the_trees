import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ListingCard from '../ListingCard';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllListings } from '../../store/listings';
import SearchBar from '../SearchBar';
import './index.css'
import { loadAllFavorites } from '../../store/favorites';
import { getAllReviews } from '../../store/treehouseReviews';
// // import ListingCard from '../ListingCard';


const ListingsPage = () => {

    const dispatch = useDispatch();
    const listings = useSelector(state => state.listings);
    const reviews = useSelector(state => state.reviews);
    const user = useSelector(state => state.session.user);

    const [selectedListing, setSelectedListing] = useState(null);
    allMarkers = Object.values(listings);

    const location = useLocation();

    useEffect(() => {
        if (user?.id) dispatch(loadAllFavorites(user?.id));
    }, [user]);
    useEffect(() => {
        dispatch(loadAllListings());
        dispatch(getAllReviews());
    }, [dispatch]);

    return (
        <>
            <div id="listing-header">
                <div id="listing-header-seach">
                    <h2>So many views to take in up in the trees!</h2>
                    <SearchBar query={query} setQuery={setQuery} activePage={activePage}/>
                    {listings.length === 0 && <h4>no matches yet</h4>}
                    {listings.length === 1 && <h4>magical match!</h4>}
                    {listings.length > 1 && <h4>magical matches!</h4>}
                </div>
            </div>
            <div id="listings-page">
                <h4>Here are some other ideas you may like:</h4>
                {!allListings && <h3>Loading...</h3>}
                {allListings && allListings.map(listing => (
                    <ul key={listing.id}>
                        <Link to={`/listings/${listing.id}`}>{listing.name}</Link>
                    </ul>
                ))}
            </div>
        </>
    );
};

export default ListingsPage;