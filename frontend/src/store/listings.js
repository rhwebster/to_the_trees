import { csrfFetch } from './csrf';

const LOAD_LISTINGS = "listings/LOAD";
const SEARCH_LISTINGS = "listings/SEARCH";
const LOAD_LISTING = "listings/ONE";
const FILTER_LISTINGS = "listings/FILTER";
const UPDATE_LISTING = "listing/UPDATE";
const REMOVE_LISTING = "listing/REMOVE";

export const filterListings = (data) => {
    return {
        type: FILTER_LISTINGS,
        data,
    };
};

const loadListings = (data) => {
    return {
        type: LOAD_LISTINGS,
        data,
    };
};

const updateListings = (data) => {
    return {
        type: UPDATE_LISTING,
        data,
    };
};

const removeListing = (data) => {
    return {
        type: REMOVE_LISTING,
        data,
    };
};

const searchListings = (data) => {
    return {
        type: SEARCH_LISTINGS,
        data,
    };
};

const loadListing = (data) => {
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
    const response = await csrfFetch(`/api/listings/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const resJson = await response.json();
    dispatch(loadListing(resJson));
    return resJson;
}

export const updateListing = (id, data) => async (dispatch) => {
    const response = await csrfFetch(`/api/listings/${id}/`, {
        mehtod: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data);
    });
    const resJson = await response.json();
    dispatch(updateListings(resJson));
    return resJson;
}

export const deleteListing = (id) => async (dispatch) => {
    const response = await fetch(`/listings/${id}/`, {
        method: "DELETE",
    });
    const resJson = await response.json();
    dispatch(removeListing(resJson));
    return resJson;
};

const initialState = {};

const listingsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_LISTINGS: {
            newState = {...state};
            action.data.forEach(listing => {
                newState[listing.id] = listing;
            });
            return newState;
        }
        case LOAD_LISTING: {
            newState = { ...state };
            newState[action.listing.id] = action.data;
            return newState;
        }
        case UPDATE_LISTING: {
            mewState = { ...state };
            newState[action.data.id] = action.data;
            return newState;
        }
        case REMOVE_LISTING: {
            newState = { ...state };
            delete newState[action.data.id];
            return newState;
        }
    }
};

export default listingsReducer;