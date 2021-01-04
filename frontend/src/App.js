import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage";
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import ListingsPage from "./components/ListingsPage";
import ListingPage from "./components/ListingPage";
import UploadPictureForm from './components/UploadPictures';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          {/* <Route exact path="/">
            <Listings />
          </Route> */}
          {/* <Route>
            <h2>Page Not Found</h2>
          </Route> */}
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/listings" exact>
            <ListingsPage />
          </Route>
          <Route exact path="/listings/:id">
            <ListingPage />
          </Route>
          <Route path="/testing">
            <UploadPictureForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
