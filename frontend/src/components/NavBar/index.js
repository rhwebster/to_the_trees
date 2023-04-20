import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './index.css';

function NavBar({ isLoaded }) {
    const user = useSelector(state => state.session.user);

    return (
        <div className='flex navbar'>
            <div className='flex center mini'>
                <div>
                    <NavLink exact to='/'></NavLink>
                </div>
            </div>
        </div>
    )
};

export default NavBar;