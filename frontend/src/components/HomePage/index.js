import picture from "./TreehouseBackground.jpg"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
    const loggedInUser = useSelector(state => {
        return state.session.user;
    });

    return (
        <div>
            <div id="home-page">
                <img src={picture} />
                <div id="home-page-banner">
                    <h1>To The Trees!</h1>
                    <h2>Find Your <Link to="/listings">Treehouse Getaway</Link></h2>
                </div>
            </div>
            {loggedInUser && <h3>Welcome {loggedInUser.username}</h3>}
        </div>
    );
};

export default HomePage;