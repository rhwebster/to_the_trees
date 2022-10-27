import { csrfFetch } from './csrf';
const LOAD_APPS = 'rentalApps/Load';
const ADD_APP = 'rentalApps/ADD';
const UPDATE_USER = 'rentalApps/UPDATE';

const loadApplication = (data) => {
    return {
        type: LOAD_APPS,
        data,
    };
};

const addApplication = (data) => {
    return {
        type: ADD_APP,
        data,
    };
};

export const loadRentalApps = (userId) => async (dispatch) => {
    const rentalApps = await fetch(`/api/rentalApp/${userId}/`);
    const userApps = await rentalApps.json();
    dispatch(loadApplication(userApps));
}

export const addRentalApp = (data) => async (dispatch) => {
    const response = await csrfFetch(`/api/rentalApp/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    const dataJson = await response.json();
    dispatch(addApplication(dataJson));
    return dataJson;
};

const initialState = {};

const applicationsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_APPS: {
            mewState = { ...state };
            action.data.forEach(app => {
                newState[app.id] = app;
            })
            return newState;
        }
    }
}
