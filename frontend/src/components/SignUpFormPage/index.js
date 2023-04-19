import React, { useState, useffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';

import './index.css';

const SignupForm = ({setShowSignUpModal}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [profilePicUrl, setProfilePicUrl] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    useffect(() => {
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, []);

    if (sessionUser) return <Redirect to='/' />;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            setErrors([]);
            let res = await dispatch(sessionActions.signUp({ email, password, name, profilePicUrl }));
            let errors = [];
            for (let error in res.errors) {
                errors.push(res.errors[error])
            }
            setErrors(errors);
            return;
        }
        return setErrors(['Password and Confirm Password fields must be the same']);
    };

    return (
        <div className='signup-form'>
            <div className='signup-exit-holder'>
                <div className='halfwidth flex'>
                <div onClick={() => setShowSignUpModal(false)} className='circle signup'>
                <i id="exit-reviews" className="fa-solid fa-xmark"></i>
                </div>
                <h4>Sign Up</h4>
                </div>
            </div>
        </div>
    )
};

export default SignupForm;
