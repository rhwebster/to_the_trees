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
            setErrors({});
            return dispatch(sessionActions.signUp({ email, password, name, profilePicUrl }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            });
        }
        return setErrors({ confirmPassword: 'Password and Confirm Password fields must be the same' });
    };

    return (
        <div className='form-card signup'>
            <div className='signup-exit-holder'>
                <div className='halfwidth flex'>
                <div onClick={() => setShowSignUpModal(false)} className='circle signup'>
                <i id="exit-reviews" className="fa-solid fa-xmark"></i>
                </div>
                <h4>Sign Up</h4>
                </div>
            </div>
            <div className='form-holder signup'>
                <form className='signup-form' onSubmit={handleSubmit}>
                    <h4 className='signup-header'>Welcome to ToTheTrees: The best treehouses await</h4>
                    <div className='signup-exterior'>
                        <div className='input-fields'>
                            <label className='label' id='email'>Email</label>
                            <input className='signup-input' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='input-fields'>
                            <label className='label' id='name'>Name</label>
                            <input className='signup-input' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='input-fields'>
                            <label className='label' id='profilePicUrl'>Profile Picture (optional)</label>
                            <input className='signup-input' type='text' value={profilePicUrl} onChange={(e) => setProfilePicUrl(e.target.value)} />
                        </div>
                        <div className='input-fields'>
                            <label className='label' id='password'>Password</label>
                            <input className='signup-input' type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='input-fields'>
                            <label className='label' id='confirm-password'>Confirm Password</label>
                            <input className='signup-input' type='text' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                    </div>
                    <ul>
                        {errors && errors.map((err, i) => <li key={i}>{err}</li>)}
                    </ul>
                    <div className='button-holder signup'>
                        <input type='submit' className='signup-button'>Sign Up</input>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default SignupForm;
