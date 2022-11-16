import { csrfFetch } from './csrf';

const LOAD_REVIEWS = 'reviews/LOAD';
const DELETE_REVIEW = 'reviews/DELETE';
const EDIT_REVIEW = 'reviews/EDIT';
const ADD_REVIEW = 'reviews/ADD';

const loadReviews = (data) => {
    return {
        type: LOAD_REVIEWS,
        data,
    };
};

export const getAllReviews = (id, data) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${id}`);
    const reviewsArray = await res.json();
    dispatch(loadReviews(reviewsArray));
}

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_REVIEWS: {
            newState = {};
            action.data.forEach((review) => {
                newState[review.id] = review;
            });
            return newState;
        }
    }
}