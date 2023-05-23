import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logOut, login } from '../../store/session';

import { Modal } from '../../context/Modal';
import LoginForm from '../LoginForm';
import SignupForm from '../SignUpForm';

import './profileButton.css';

const ProfileButton = ({ user }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const userInfo = useSelector(state => state.session.user)

    const [showMenu, setShowMenu] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignUpModal] = useState(false);

    useEffect(() => {
        return (showSignupModal || showLoginModal) ? document.body.style.overflow = 'hidden' :
            document.body.style.overflow = 'unset';
    }, [showLoginModal, showSignupModal]);

    const loginDemo = () => {
        const demo = {
            email: 'barney@awesome.com',
            password: 'suitup'
        }
        dispatch(login(demo));
    }

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const close = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', close);

        return () => document.removeEventListener('click', close);
    }, [showMenu]);

    const logoutUser = (e) => {
        e.preventDefault();
        dispatch(logOut());
        setShowLoginModal(false);
        setShowSignUpModal(false);
        history.push('/');
    };

    if (user) {
        return (
            <>
                <div id='profile-button' className={showMenu ? 'flex menu-open' : 'flex'} onClick={() => setShowMenu(!showMenu)}>
                    <i className='fa-solid fa-bars menu'></i>
                    <i className='fa-solid fa-circle-user profile'></i>
                    {showMenu && (
                        <ul className='profile-dropdown'>
                            <li id='username-splash'>
                                <button>Welcome, {userInfo.name.split()[0]}</button>
                            </li>
                            <Link to='/newListing'>
                                <li id='host-button'>
                                    <button>Host Your Treehouse</button>
                                </li>
                            </Link>
                            <Link to='/reservations'>
                                <li id='host-button'>
                                    <button>Upcoming Reservations</button>
                                </li>
                            </Link>
                            <li onClick={logOut}>
                                <button>Log Out</button>
                            </li>
                        </ul>
                    )}
                </div>
            </>
        )
    } else {
        return (
            <>
                <div id='profile-button' className={showMenu ? 'flex menu-open' : 'flex'} onClick={openMenu}>
                    <i className='fa-solid fa-bars menu'></i>
                    <i className='fa-solid fa-circle-user profile'></i>
                    {showMenu && (
                        <ul className='profile-dropdown'>
                            <li onClick={() => setShowLoginModal(true)}>
                                <button>Log In</button>
                            </li>
                            <li onClick={() => setShowSignUpModal(true)}>
                                <button>Sign Up</button>
                            </li>
                            <li onClick={() => loginDemo()}>
                                <button>Login as Demo</button>
                            </li>
                        </ul>
                    )}
                </div>
                {showLoginModal && (
                    <Modal onClose={() => setShowLoginModal(false)}>
                        <LoginForm setShowLoginModal={setShowLoginModal} />
                    </Modal>
                )}
                {showSignupModal && (
                    <Modal onClose={() => setShowSignUpModal(false)}>
                        <SignupForm setShowSignUpModal={setShowSignUpModal}/>
                    </Modal>
                )}
            </>
        )
    }
};

export default ProfileButton;