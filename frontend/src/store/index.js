import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import favoriteReducer from './favorites';
import listingsReducer from './listings';
import reservationsReducer from './reservations';
import usersReducer from './user';
import applicationsReducer from './rentalApps';

const rootReducer = combineReducers({
  session: session,
  listings: listingsReducer,
  reservations: reservationsReducer,
  favorites: favoriteReducer,
  users: usersReducer,
  applications: applicationsReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
