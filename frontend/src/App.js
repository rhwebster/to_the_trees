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
          <Route path="/" exact>
            <HomePage />
            <Footer width={100%} />
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
          <Route exact path="/favorites">
            <Header isLoaded={isLoaded} />
            <div className="main_content-wrapper">
              <Favorites />
            </div>
          </Route>
          <Route>404: Not Found</Route>
        </Switch>
      )}
    </>
  );
}

export default App;
