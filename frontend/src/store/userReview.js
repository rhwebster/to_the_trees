import { csrfFetch } from './csrf';

const USER_REVIEWS = 'reviews/userReviews';
const DELETE_REVIEW = 'reviews/deleteReview';

const loadUserReviews = (data) => {
    return {
        type: USER_REVIEWS,
        data
    }
};

const deleteReview = (id) => {
    return {
        type: DELETE_REVIEW,
        id
    }
}

export const getUserReviews = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/reviews`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadUserReviews(data));
        return data;
    } else {
        const err = await res.json();
        return err;
    }
};

export const createGuestReview = (userId, data) => async (dispatch) => {
    const res = await csrfFetch(`/api/guestReviews/`, {
        method: 'POST',
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const reviewData = await res.json();
        dispatch(loadUserReviews(userId));
        return reviewData;
    } else {
        const err = res.json();
        return err;
    }
};

export const editGuestReview = (userId, data) => async (dispatch) => {
    const res = await csrfFetch(`/api/guestReviews/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const reviewData = await res.json();
        dispatch(getUserReviews(userId));
        return reviewData;
    } else {
        const err = await res.json();
        return err;
    }
}

export const deleteUserReview = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/guestReviews/${id}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const deleted = await res.json();
        dispatch(deleteReview(id));
        return deleted;
    } else {
        const err = await res.json();
        return err;
    }
}

const initialState = { userReviews: {} };

const guestReviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REVIEWS: {
            const newState = {};
            newState.userReviews = action.data;
            return newState;
        }
        case DELETE_REVIEW: {
            const newState = { ...state }
            delete newState.userReviews[action.id];
            return newState;
        }
        default: return state;
    }
};

export default guestReviewReducer;