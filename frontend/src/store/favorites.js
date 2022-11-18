import { fetch } from './csrf';

const LOAD_FAVORITES = 'favorites/LOAD';
const DELETE_FAVORITE = 'favorites/DELETE';
const ADD_FAVORITE = 'favorite/ADD';

const loadFavorites = (data) => {
    return {
        type: LOAD_FAVORITES,
        data,
    };
};

const deleteFavorite = (data) => {
    return {
        type: DELETE_FAVORITE,
        data,
    };
};

const addFavorite = (data) => {
    return {
        type: ADD_FAVORITE,
        data,
    };
};

export const loadAllFavorites = (userId) => async (dispatch) => {
    const allFavorites = await fetch(`/api/favorites/${userId}/favs/`);
    const favorites = await allFavorites.json();
    dispatch(loadFavorites(favorites));
}

export const addAFavorite = (userId, listingId) => async (dispatch) => {
    const res = await fetch(`/api/favorites/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, listingId }),
    });
    if (res.ok) {
        const newFav = await res.json();
        dispatch(addFavorite(newFav));
        return newFav;
    };
}

export const removeAFavorite = (userId, listingId) => async (dispatch) => {
    const res = await fetch(`/api/favorites/${userId}/${listingId}/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.ok) {
        const removed = await res.json();
        dispatch(deleteFavorite(removed));
        return removed;
    }
};

const initialState = {};

const favoriteReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_FAVORITES: {
            newState = { ...state };
            action.data.forEach((fav, i) => {
                newState[i+1] = fav;
            });
            return newState;
        }
        case DELETE_FAVORITE: {
            newState = {};
            action.data.forEach((fav, i) => {
                newState[i+1] = fav;
            });
            return newState;
        }
        case ADD_FAVORITE: {
            newState = {};
            action.data.forEach((fav, i) => {
                newState[i+1] = fav;
            });
            return newState;
        }
        default:
            return state;
    }
};

export default favoriteReducer;