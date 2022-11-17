
import { fetch } from './csrf';
const LOAD_RESYS = 'reservations/LOAD';
const ADD_RESY = 'reservation/ADD';
const DELETE_RESY = 'reservation/DELETE';

const loadResys = (data) => {
    return {
        type: LOAD_RESYS,
        data,
    };
};

export const loadReservations = (id) => async (dispatch) => {
    const allReservations = await fetch(`/api/reservations/user/${id}`);
    const reservationsArray = await allReservations.json();
    dispatch(loadResys(reservationsArray));
};