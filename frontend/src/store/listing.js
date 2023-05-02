import { csrfFetch } from './csrf';

const ALL_LISTINGS = "listings/allListings";
const GET_LISTING = "listings/getListing";
const CURRENT_LISTING = "listings/getCurrentListing";
const NEW_LISTING = "listings/createListing";
const REMOVE_LISTING = "listings/deleteListing";

const loadListings = (data) => {
    return {
        type: ALL_LISTINGS,
        allListings: data
    }
};

const loadOneListing = (data) => {
    return {
        type: GET_LISTING,
        singleListing: data
    }
};

const newListing = (data) => {
    return {
        type: NEW_LISTING,
        data
    }
}

const removeListing = (listingId) => {
    return {
        type: REMOVE_LISTING,
        listingId
    }
}

export const getAllListings = () => async (dispatch) => {
    const res = await csrfFetch('/api/listings/');
    const data = await res.json();

    dispatch(loadListings(data));
    return data;
}

export const getOneListing = (listingId) => async (dispatch) => {
    const res = await csrfFetch(`api/listings/${listingId}`);
    const data = await res.json();

    if (res.ok) {
        dispatch(loadOneListing(data));
        return data;
    } else {
        throw data;
    }
};

export const createListing = (data) => async dispatch => {

    const res = await csrfFetch(`/api/listings/`, {
        method: 'POST',
        header: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const listing = await res.json();
        dispatch(newListing(listing));
        return listing;
    } else  {
        const err = await res.json();
        return err;
    }
}

export const deleteListing = (listingId) => async dispatch => {
    const res = await csrfFetch(`/api/listings/${listingId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const deleteMessage = await res.json();
        dispatch(removeListing(listingId));
        return deleteMessage;
    } else {
        const err = await res.json();
        return err;
    }
}

export const updateListing = (listingId, data) => async dispatch => {
    const res = await csrfFetch(`/api/listings/${listingId}`, {
        method: 'PUT',
        header: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const updatedListing = await res.json();
        dispatch(createListing(updatedListing));
        return updatedListing;
    } else {
        const err = res.json();
        return err;
    }
}

const initialState = { allListings: {}, singleListing: { Images: [], Owner: {} }, userListings: {} };

const listingReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_LISTINGS: {
            const newState = {
                listing: { 
                    ...state.singleListing, 
                    Images: [...state.singleListing.Images], 
                    Owner: { ...state.singleListing.Owner }
                }, userListings: { ...state.userListings }
            }
            newState.allListings = action.listings;
            return newState;
        };
        case GET_LISTING: {
            const newState = {
                allListings: { ...state.allListings },
                singleListing: {},
                userListings: { ...state.userListings }
            }
            newState.singleListing = action.data;
            return newState;
        };
        case NEW_LISTING: {
            const newState = {
                allListings: { ...state.allListings },
                singleListing: { ...state.singleListing }
            }
            newState.allListings[action.data.id] = action.data;
            return newState;
        };
        case REMOVE_LISTING: {
            const newState = { 
                allListings: { ...state.allListings },
                singleListing: {}
            }
            delete newState.allListings.listingId;
            return newState;
        }
        default: {
            return state
        }
    }
};

export default listingReducer;