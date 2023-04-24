import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { restoreUser } from './store/session';

import SignupForm from './components/SignUpForm';
import NavBar from './components/NavBar';
import Listings from './components/ListingsPage';
import ListingDetails from './components/ListingPage';
import EditListingForm from ''

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser())
    .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <NavBar isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/signup'>
            <SignupForm />
          </Route>
          <Route exact path='/'>
            <Listings />
          </Route>
          <Route path='/listings/:listingId'>
            <ListingDetails />
          </Route>
          <Route path='/listings/:listingId/edit'>
            <EditListingForm />
          </Route>
          <Route>
            404 Page Not Found
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
