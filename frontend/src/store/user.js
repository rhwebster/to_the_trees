const LOAD_USERS = 'users/LOAD';

const loadTheUsers = (data) => {
    return {
        type: LOAD_USERS,
        data,
    };
};

export const loadUsers = () => async (dispatch, getState) => {
    const users = await fetch(`/api/all`);
    const usersArray = await users.json();
    dispatch(loadTheUsers(usersArray));
};

const initialState = {};

const usersReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_USERS: {
            newState = { ...state };
            action.data.forEach(user => {
                newState.[user.id] = user;
            });
            return newState;
        }
        default:
            return state;
    }
};

export default usersReducer;