import { setListings } from './listings';
import { fetch } from './csrf';

const SET_RESERVATION = 'reservations/setReservation'
const SET_RESERVATIONS = 'reservations/setReservation'
const CREATE_PENDING_RESERVATION = 'reservations/createReservation'
const EDIT_RESERVATION = 'reservations/editReservation'
const CONFIRM_RESERVATION = 'reservations/confirmReservation'
const CANCEL_RESERVATION = 'reservations/cancelReservation'


const setAReservation = (reservation) => {
    return {
        type: SET_RESERVATION,
        payload: reservation,
    }
}
const setReservations = (reservations) => {
    return {
        type: SET_RESERVATIONS,
        payload: reservations,
    };
};

const createAReservation = (reservation) => {
    return {
        type: CREATE_PENDING_RESERVATION,
        payload: reservation,
    };
};

const editReservation = (reservation) => {
    return {
        type: EDIT_RESERVATION,
        payload: reservation,
    };
};

const confirmReservation = (reservation) => {
    return {
        type: CONFIRM_RESERVATION,
        payload: reservation,
    };
};

const cancelReservation = (reservation) => {
    return {
        type: CANCEL_RESERVATION,
        payload: reservation,
    };
};
export const fetchOneReservation = (id) => {
    return async (dispatch) => {
        const response = await fetch(`/api/reservations/${id}`)
        dispatch(
            setAReservation(response.data)
        );
    };
};

export const fetchAllReservations = () => {
    return async (dispatch) => {
        const response = await fetch('/api/reservations');
        dispatch(setReservations(response.data.reservations));
        dispatch(setListings(response.data.listing));
    };
};

export const fetchCreateReservation = ({ userId, startDate, endDate, status, listingId }) => {
    return async (dispatch) => {
        const response = await fetch('/api/reservations', {
            method: 'POST',
            body: JSON.stringify({ userId, startDate, endDate, status, listingId })
        });
        dispatch(createAReservation(response.data));
        return response.data;
    };
};

export const fetchEditReservation = (payload) => {
    return async (dispatch) => {
        const response = await fetch(`/api/reservations/${payload.reservationId}`, {
            method: 'PUT',
            body: JSON.stringify(payload)
        });
        dispatch(createAReservation(response.data));
        return response.data;
    };
};

export const fetchConfirmReservation = (id) => {
    return async (dispatch) => {
        const response = await fetch(`/api/reservations/${id}/confirm`, {
            method: 'PUT',
            body: JSON.stringify({ status: "confirmed" }),
        });
        dispatch(confirmReservation(response.data));
        return response.data;
    };
};

export const fetchCancelReservation = (id) => {
    return async (dispatch) => {
        const response = await fetch(`/api/reservations/${id}`, {
            method: 'PATCH',
        });
        dispatch(cancelReservation(response.data));
        return response.data;
    };
};

const initialState = [];

const reservationsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_RESERVATION:
            newState = action.payload;
            return newState;
        case SET_RESERVATIONS:
            newState = action.payload;
            return newState;
        case CREATE_PENDING_RESERVATION:
            newState = action.payload;
            return newState;
        case EDIT_RESERVATION:
            newState = action.payload;
            return newState;
        case CONFIRM_RESERVATION:
            newState = action.payload;
            return newState;
        case CANCEL_RESERVATION:
            newState = action.payload;
            return newState;
        default:
            return state;
            
    };
};

export default reservationsReducer;
