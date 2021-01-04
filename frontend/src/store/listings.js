import { fetch } from './csrf';

const SET_LISTINGS = "listings/setListings";
const SET_A_LISTING = "aListing/setAListing";

const setListings = (listings) => {
    return {
        type: SET_LISTINGS,
        listings: listings,
    };
};

const setAListing = (listing) => {
    return {
        type: SET_A_LISTING,
        listing: listing,
    };
};

export const getListings = () => async (dispatch) => {
    const res = await fetch("api/listings");
    dispatch(
        setListings(res.data.listings)
    );
}

export const getAListing = () => async (dispatch) => {
    const res = await fetch(`api/listings/${id}`);
    dispatch(
        setAListing(res.data.listing)
    );
}

const initialState = [];

const ListingsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case SET_LISTINGS:
            newState = action.listings;
            return newState;
        case SET_A_LISTING:
            newState = action.listing;
            return newState;
        default:
            return state;
        }
}

export default ListingsReducer;