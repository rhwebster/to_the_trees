import { fetch } from './csrf';

const SET_A_LISTING = "aListing/setAListing";

const setAListing = (listing) => {
    return {
        type: SET_A_LISTING,
        listing: listing,
    };
};

export const getAListing = (id) => async (dispatch) => {
    const res = await fetch(`/api/listings/${id}`);
    dispatch(
        setAListing(res.data.listing)
    );
};

const initialState = [];

const ListingReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_A_LISTING:
            newState = action.listing;
            return newState;
        default:
            return state;
    }
}

export default ListingReducer;

