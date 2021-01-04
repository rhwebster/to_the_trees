import picture from "./TreehouseBackground.jpg"
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";

const HomePage = () => {
    const loggedInUser = useSelector(state => {
        return state.session.user;
    });

    const fullState = useSelector(state => {
        return state;
    });

    return (
        <div>
            <div id="home-page">
                <img src={picture} />
                <div id="home-page-banner">
                    <h1>To The Trees!</h1>
                </div>
            </div>
            {loggedInUser && <h2>Hey {loggedInUser.firstName}!</h2>}
            <h3>Find Your <NavLink exact to="/listings">Treehouse Getaway</NavLink></h3>
        </div>
    );
};

export default HomePage;