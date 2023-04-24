import { csrfFetch } from './csrf';

const TREEHOUSE_REVIEWS = 'reviews/treehouseReview';
const DELETE_REVIEW = 'reviews/deleteReview';


const loadTreehouseReviews = (data) => {
    return {
        type: TREEHOUSE_REVIEWS,
        data
    }
};

const deleteReview = (id) => {
    return {
        type: DELETE_REVIEW,
        id
    }
}

export const getTreehouseReviews = (listingId) => async (dispatch) => {
    const res = await csrfFetch(`/api/listings/${listingId}/reviews`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadTreehouseReviews(data));
        return data;
    } else {
        const err = await res.json();
        return err;
    }
};

export const createTreehouseReview = (listingId, data) => async (dispatch) => {
    const res = await csrfFetch(`/api/treehouseReviews/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const reviewData = await res.json();
        dispatch(getTreehouseReviews(listingId));
        return reviewData;
    } else {
        const err = await res.json();
        return err;
    }
};

export const editTreehouseReview = (listingId, data) => async (dispatch) => {
    const res = await csrfFetch(`/api/treehouseReviews/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const reviewData = await res.json()
        dispatch(getTreehouseReviews(listingId));
        return reviewData;
    } else {
        const err = await res.json();
        return err;
    }
}

export const deleteTreehouseReview = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/treehouseReviews/${id}`, {
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

const initialState = {};

const treehouseReviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case TREEHOUSE_REVIEWS: {
            const newState = {};
            newState.listingReviews = action.data;
            return newState;
        }
        case DELETE_REVIEW: {
            const newState = { ...state }
            delete newState.listingReviews[action.id];
            return newState;
        }
        default: return state;
    }
};

export default treehouseReviewReducer;