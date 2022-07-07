import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignupForm.css';

const SignUpForm = ({ closeModalFunc, toggleLoginSignupFunc }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [signupDisplay] = useState('displayed');

  const onSignUp = async (e) => {
    e.preventDefault();
    
    const data = await dispatch(signUp(username, email, password, confirmPassword));
    if (data) setErrors(data);
  };

  const closeSignupModal = () => {
    window.scrollTo(0,0);
    closeModalFunc();
    setErrors([]);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  };

  const stopTheProp = e => e.stopPropagation();

  return (
    <div className={`signup-body ${signupDisplay}`} onClick={stopTheProp} onMouseDown={stopTheProp}>
      <h2 style={{color: '#d1410c', fontWeight: 'bolder', display: 'flex', justifyContent: 'center', fontSize: '35px', marginBottom: '10px'}}>
        Sign Up <span style={{margin: '0px 10px'}}>or</span> <span className='toggle-login' onClick={toggleLoginSignupFunc}>Login</span></h2>
      <form onSubmit={onSignUp} className='signup-form'>
        <div style={{fontSize: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          {errors.map((error, ind) => (
            <div style={{color: '#d1410c'}} key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <div style={{marginBottom: '3px'}}>
            <label>
              Username
            </label>
            <label style={{fontSize: '12px', color: '#d1410c', marginLeft: '8px'}}>
              Required *
            </label>
          </div>
          <input
            type='text'
            name='username'
            placeholder='Username'
            onChange={updateUsername}
            value={username}
            required={true}
          ></input>
        </div>
        <div>
          <div style={{marginBottom: '3px'}}>
            <label>
              Email
            </label>
            <label style={{fontSize: '12px', color: '#d1410c', marginLeft: '8px'}}>
              Required *
            </label>
          </div>
          <input
            placeholder='Email'
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            required={true}
          ></input>
        </div>
        <div>
          <div style={{marginBottom: '3px'}}>
            <label>
              Password
            </label>
            <label style={{fontSize: '12px', color: '#d1410c', marginLeft: '8px'}}>
              Required *
            </label>
          </div>
          <input
            placeholder='Password'
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            required={true}
          ></input>
        </div>
        <div>
          <div style={{marginBottom: '3px'}}>
            <label>
              Confirm
            </label>
            <label style={{fontSize: '12px', color: '#d1410c', marginLeft: '8px'}}>
              Required *
            </label>
          </div>
          <input
            type='password'
            name='repeat_password'
            placeholder='Confirm Password'
            onChange={updateRepeatPassword}
            value={confirmPassword}
            required={true}
          ></input>
        </div>
        <button className='submit-btn' type='submit'>Sign Up</button>
      </form>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '13px'}}>
        <button className='cancel-btn' onClick={closeSignupModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
