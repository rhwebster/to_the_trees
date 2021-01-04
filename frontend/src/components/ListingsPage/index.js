import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getListings } from '../../store/listings';
import SearchBar from '../SearchBar';
import { fetch } from '../../store/csrf';
import './index.css'
// // import ListingCard from '../ListingCard';


const ListingsPage = () => {

    const dispatch = useDispatch();

    const allListings = useSelector(fullReduxState => {
        return fullReduxState.listings;
    })

    const [activePage, setActivepage] = useState('listings');
    const [listings, setListings] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(async () => {
        dispatch(
            getListings()
        );
    }, []);

    return (
        <>
            <div id="listing-header">
                <div id="listing-header-seach">
                    <h2>So many views to take in up in the trees!</h2>
                    <SearchBar query={query} setQuery={setQuery} activePage={activePage} />
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