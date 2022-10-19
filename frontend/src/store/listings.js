import { csrfFetch } from './csrf';

const LOAD_LISTINGS = "listings/LOAD";
const SEARCH_LISTINGS = "listings/SEARCH";
const LOAD_LISTING = "listings/ONE";
const FILTER_LISTINGS = "listings/FILTER";
const UPDATE_LISTING = "listing/UPDATE";
const REMOVE_LISTING = "listing/REMOVE";


const loadListings = (data) => {
    return {
        type: LOAD_LISTING,
        data,
    };
};

export const loadAllListings = () => async (dispatch) => {
    const res = await fetch(`/api/listings/`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadListings(data.listings));
    };
};

export const addListing = (data) => async (dispatch) => {
    const res = await csrfFetch(`/api.`)
}

const initialState = {};

const listingsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_LISTINGS: {
            newState = { ...state };
            action.data.forEach(listing => {
                newState[listing.id] = listing;
            });
            return newState;
        }
    }
}