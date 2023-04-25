import { csrfFetch } from "./csrf";

const LOAD_RESYS = 'reservations/LOAD'
const NEW_RESY = 'reservations/BOOK'
const UPDATE_RESY = 'reservations/UPDATE'
const DELETE_RESY = 'reservations/DELETE'

export const getResys = (data) => ({
    type: LOAD_RESYS,
    data
});

export const getListingReservations = (listingId) => async (dispatch) => {
    const res = await csrfFetch(`/api/listings/${listingId}/resys`);
    if (res.ok) {
        const data = await res.json();
        dispatch(getResys(data));
        return data;
    } else {
        const err = await res.json();
        return err;
    }
};

const initialState = {};

const resyReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_RESYS: {
            const resys = action.data;
            const newState = resys;
            return newState;
        }
        default: {
            return state;
        }
    }
};

export default resyReducer;