import { configureStore, getDefaultMiddleware } from 'react-redux';
import { combineReducers } from 'redux';
import monitorReducersEnhancer from "../enhancers/monitorReducer";
import loggerMiddleware from '../middleware/logger';
import sessionReducer from './session';
import treehouseReviewReducer from './treehousereview';
import listingReducer from './listing';
import guestReviewReducer from './userReview';

const rootReducer = combineReducers({
    session: sessionReducer,
    treehouseReview: treehouseReviewReducer,
    listing: listingReducer,
    guestReview: guestReviewReducer,
});

export default function configureAppStore(preloadedState) {
    const store = configureStore({
        reducer: rootReducer, 
        middleWare: [loggerMiddleware, ...getDefaultMiddleware()],
        preloadedState,
        enhancers: [monitorReducersEnhancer]
    })

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
    }

    return store;
}