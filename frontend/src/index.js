import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ModalProvider } from './context/Modal';

import './index.css';

import { restoreCSRF, csrfFetch } from './store/csrf';
import configureStore from './store';
import * as sessionActions from './store/session';
import * as listingActions from './store/listing';
import * as tReviewActions from './store/treehouseReview';
import * as gReviewActions from './store/userReview';
import * as resyActions from './store/reservation';


const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();
  
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.listingActions = listingActions;
  window.tReviewActions = tReviewActions;
  window.gReviewActions = gReviewActions;
  window.resyActions = resyActions;
}

function Root() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
