import { csrfFetch } from "./csrf";

const LOAD_RESYS = 'reservations/LOAD'
const DELETE_RESY = 'reservations/DELETE'

const getResys = (data) => ({
    type: LOAD_RESYS,
    data
});

const removeResy = (resyId) => ({
    type: DELETE_RESY,
    resyId
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

export const createReservation = (listingId, resy) => async (dispatch) => {
    const res = await csrfFetch(`/api/reservations/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(resy)
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(getListingReservations(listingId));
        return data;
    } else {
        const err = await res.json();
        return err;
    }
};

export const editReservation = (resyId, resy) => async (dispatch) => {
    const res = await csrfFetch(`/api/reservations/${resyId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(resy)
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(getListingReservations(resy.listingId));
        return data;
    } else {
        const err = await res.json();
        return err;
    }
};

export const deleteReservation = (resyId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reservations/${resyId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(removeResy(resyId))
    } else {
        const err = await res.json();
        return err;
    }
}

const initialState = {};

const resyReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_RESYS: {
            const resys = action.data;
            const newState = resys;
            return newState;
        }
        case DELETE_RESY: {
            const newState = { ...state };
            delete newState[action.resyId]
            return newState;
        }
        default: {
            return state;
        }
    }
};

export default resyReducer;