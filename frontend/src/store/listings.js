import { fetch } from './csrf';

const SET_LISTINGS = "listings/setListings";

export const setListings = (listings) => {
    return {
        type: SET_LISTINGS,
        listings: listings,
    };
};

export const getListings = () => async (dispatch) => {
    const res = await fetch("api/listings");
    dispatch(
        setListings(res.data.listings)
    );
};

const initialState = [];

const ListingsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case SET_LISTINGS:
            newState = action.listings;
            return newState;
        default:
            return state;
        }
}

export default ListingsReducer;