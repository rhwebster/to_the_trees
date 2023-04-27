import { csrfFetch } from './csrf';

const LISTING_IMAGES = '/images/Listing';
const SINGLE_IMAGE = 'images/One';
const NEW_IMAGE = 'images/New';
const DELETE_IMAGE = 'images/Delete';
const CHANGE_PREVIEW = 'images/Preview';

const newImage = (image) => {
    return {
        type: NEW_IMAGE,
        image
    }
}

const loadImages = (data) => {
    return {
        type: LISTING_IMAGES,
        data
    }
}

export const listingImages = (listingId) => async dispatch => {
    const res = await csrfFetch(`/api/listings/${listingId}/images`);
    const data = await res.json();

    dispatch(loadImages(data));
    return data;
}

export const addImage = (imageData) => async dispatch => {
    const res = await csrfFetch(`/api/images/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(imageData)
    });

    if (res.ok) {
        const image = await res.json();
        dispatch(newImage(image));
        return image;
    } else {
        const err = await res.json();
        return err;
    }
};

const initialState = { images: {} };

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case LISTING_IMAGES: {
            const newState = {};
            newState.images = action.data;
            return newState;
        };
        case NEW_IMAGE: {
            const newState = { 
                images: { ...state.images },
            };
            newState.images[action.image.id] = action.image;
            return newState;
        }
        default: {
            return state;
        }
    }
};

export default imageReducer;