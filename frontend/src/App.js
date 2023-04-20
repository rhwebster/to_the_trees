import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getCurrentUser } from './store/session';

import SignupForm from './components/SignUpForm'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getCurrentUser());
    setIsLoaded(true);
  }, [dispatch]);

  return (
    <>
      <NavBar isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/signup'>
            <SignupForm />
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
