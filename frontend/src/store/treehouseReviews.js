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

const deleteAReview = (data) => {
    return {
        type: DELETE_REVIEW,
        data,
    };
};

const editAReview = (data) => {
    return {
        type: EDIT_REVIEW,
        data,
    };
};

export const getAllReviews = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${id}`);
    const reviewsArray = await res.json();
    dispatch(loadReviews(reviewsArray));
}

export const deleteReview = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${id}`, {
        method: "DELETE",
    });
    const data = await res.json();
    dispatch(deleteAReview(data));
};

export const editReview = (id, data) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviews: data}),
    });
    const reviewData = await res.json();
    dispatch(editAReview(reviewData));

    return data;
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
        case DELETE_REVIEW: {
            newState = { ...state };
            delete newState[action.data];
            return newState;
        }
        case EDIT_REVIEW: {
            newState = { ...state };
            newState[action.data.id] = action.data;
            return newState;
        }
    }
}