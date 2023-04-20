import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './index.css'

const LoginForm = ({setShowLoginModal}) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const res = await dispatch(sessionActions.login({ email, password }));
        let errors = [];
        if (res.message === 'Invalid Credentials') errors.push('Invalid Credentials')

        if ((res && res.errors) || (res && res.message)) {
            for (let err in res.errors) {
                errors.push(res.errors[err])
            }
            setErrors(errors);
            return;
        } else {
            setEmail('');
            setPassword('');
            setErrors([]);
            setShowLoginModal(false)
        }
    }

    return (
        <div className='form-card'>
            <div className='exit-holder'>
                <div className='halfwidth flex'>
                <div className='circle signup' onClick={() => setShowLoginModal(false)}>
                <i id="exit-reviews" className='fa-solid fa=xmark'></i>
                </div>
                <h4>Log In</h4>
                </div>
            </div>
            <div className='form-holder'>
                <form className='login-form' onSubmit={handleSubmit}>
                    <h4 className='login-header'>Welcome To ToTheTrees! The best treehouses await</h4>
                    <div className='login-exterior'>
                        <div className='input-fields'>
                            <label className='label' id='email-label'>Email</label>
                            <input className='login-input' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div className='input-fields confirm'>
                            <label className='label' id='password-label'>Password</label>
                            <input className='password-input' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                    </div>
                    <ul>
                        {errors && (errors.map((err, i) => <li key={i}>{err}</li>))}
                    </ul>
                    <div className='button-holder'>
                        <input type='submit' className='login-button'>Log In</input>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default LoginForm;