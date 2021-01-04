import { fetch } from './csrf.js';
import thunk from "redux-thunk";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  };
};

const removeUser = () => ({
  type: REMOVE_USER
});

export const login = ({ credential, password, firstName }) => async (dispatch) => {
  const res = await fetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ credential, password, firstName })
  });
  dispatch(setUser(res.data.user));
  return res;
};

export const restoreUser = () => async (dispatch) => {
  const res = await fetch('/api/session');
  dispatch(setUser(res.data.user));
  return res;
};

export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, username, email, password, address1, address3 } = user;
  const res = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password,
      address1,
      address3
    }),
  });
  dispatch(setUser(res.data.user));
  return res;
};

export const logout = () => async (dispatch) => {
  const res = await fetch('/api/session', {
    method: 'DELETE'
  });
  dispatch(removeUser());
  return res;
};

const initialState = { user: null };

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state, { user: action.payload });
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state, { user: null });
      return newState;
    default:
      return state;
  }
}

export default reducer;
