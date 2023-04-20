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
        default: {
            return state
        }
    }
};

export default listingReducer;