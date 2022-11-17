import { fetch } from './csrf';
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

const updateUserApp = (data) => {
    return {
        type: UPDATE_USER,
        data,
    };
};

export const loadRentalApps = (userId) => async (dispatch) => {
    const rentalApps = await fetch(`/api/rentalApp/${userId}/`);
    const userApps = await rentalApps.json();
    dispatch(loadApplication(userApps));
}

export const addRentalApp = (data) => async (dispatch) => {
    const response = await fetch(`/api/rentalApp/`, {
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

export const updateUserApps = (data) => async (dispatch) => {
    const { userId, id } = data;

    const response = await fetch(`/api/rentalApp/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const dataJson = await response.json();

    dispatch(updateUserApp(id));
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
        case ADD_APP: {
            newState = { ...state };
            newState[action.data.id] = action.data;
            return newState;
        }
        case UPDATE_USER: {
            newState = { ...state };
            delete newState[action.data];
            return newState;
        }
        default:
            return state;
    }
};

export default applicationsReducer;
