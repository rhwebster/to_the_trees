
import { csrfFetch } from './csrf';
const LOAD_RESYS = 'reservations/LOAD';
const ADD_RESY = 'reservation/ADD';
const DELETE_RESY = 'reservation/DELETE';

const loadResys = (data) => {
    return {
        type: LOAD_RESYS,
        data,
    };
};

const addResy = (data) => {
    return {
        type: ADD_RESY,
        data,
    };
};

export const loadReservations = (id) => async (dispatch) => {
    const allReservations = await fetch(`/api/reservations/user/${id}`);
    const reservationsArray = await allReservations.json();
    dispatch(loadResys(reservationsArray));
};

export const addReservation = (data) => async (dispatch) => {
    const res = await csrfFetch('/api/reservations/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const resyData = await res.json();
    dispatch(addResy(resyData));
    return resyData;
};

const initialState = {};

const bookingsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_RESYS: {
            newState = { ...state };
            action.data.forEach(booking => {
                newState[booking.id] = booking;
            });
            return newState;
        }
        case ADD_RESY: {
            newState = { ...state };
            newState[action.data.id] = action.data;
            return newState;
        }
    }
}