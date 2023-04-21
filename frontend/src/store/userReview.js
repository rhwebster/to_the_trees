import { csrfFetch } from './csrf';

const USER_REVIEWS = 'reviews/userReviews';
const DELETE_REVIEW = 'reviews/deleteReview';

const loadUserReviews = (data) => {
    return {
        type: USER_REVIEWS,
        data
    }
};

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

const initialState = { userReviews: {} };

const guestReviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REVIEWS: {
            const newState = {};
            newState.userReviews = action.data;
            return newState;
        }
        default: return state;
    }
};

export default guestReviewReducer;