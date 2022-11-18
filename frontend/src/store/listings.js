import { csrfFetch } from './csrf';

const LOAD_LISTINGS = "listings/LOAD";
const SEARCH_LISTINGS = "listings/SEARCH";
const LOAD_LISTING = "listings/ONE";
const UPDATE_LISTING = "listing/UPDATE";
const REMOVE_LISTING = "listing/REMOVE";
const ADD_LISTING = "listing/ADD";

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

const addListing = (data) => {
    return {
        type: ADD_LISTING,
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

export const loadAListing = (id) => async (dispatch) => {
    const res = await fetch(`/api/listings/${id}/`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadListing(data));
        return data;
    };
};

export const addAListing = (data) => async (dispatch) => {
    const response = await fetch(`/api/listings/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const resJson = await response.json();
    dispatch(addListing(resJson));
    return resJson;
}

export const updateListing = (id, data) => async (dispatch) => {
    const response = await fetch(`/api/listings/${id}/`, {
        mehtod: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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

export const searchForListings = (params) => async (dispatch) => {
    const response = await fetch(`/api/search/${params}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(searchListings(data.searchResults));
    }
}

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
        case ADD_LISTING: {
            newState = { ...state };
            newState[action.data.id] = action.data;
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
        case SEARCH_LISTINGS: {
            newState = {};
            action.data.forEach(home => {
                newState[home.id] = home;
            })
            return newState;
        }
        default:
            return state;
    }
};

export default listingsReducer;