import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

export const login = (user) => async (dispatch) => {
    const { email, password } = user;
    const res = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
    });
    const data = await res.json();
    dispatch(setUser(data.user));
    return res;
};

export const signUp = (user) => async dispatch => {
    const { email, password, name, profilePicUrl } = user;
    const options = {
        method: 'POST',
        body: JSON.stringify({
            email, name, profilePicUrl, password
        })
    };

    const res = await csrfFetch('/api/users', options);

    if (res.ok) {
        const data = await res.json();
        dispatch(setUser(data));
        return data;
    } else {
        const error = await res.json();
        return error;
    }
};

export const logOut = () => async dispatch => {
    const res = await csrfFetch('/api/session', {
        method: 'DELETE'
    });

    const data = await res.json();
    dispatch(removeUser());
    return data;
};

export const getCurrentUser = () => async dispatch => {
    const res = await csrfFetch('/api/session');
    if (res.ok) {
        const user = await res.json();
        dispatch(setUser(user));
        return user;
    }
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
}

export default sessionReducer;