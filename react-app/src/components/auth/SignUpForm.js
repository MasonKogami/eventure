import React, { useEffect, useState } from 'react';
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
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const closeSignupModal = () => {
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
      <form onSubmit={onSignUp} className='signup-form'>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
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
          <input
            type='password'
            name='repeat_password'
            placeholder='Confirm Password'
            onChange={updateRepeatPassword}
            value={confirmPassword}
            required={true}
          ></input>
        </div>
        <button style={{cursor: 'pointer', backgroundColor: '#d1410c', color: '#ffff', borderRadius: '4px', border: '1px solid #d1410c', height: '29px', width: '85px'}} type='submit'>Sign Up</button>
      </form>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '13px'}}>
        <button style={{cursor: 'pointer', backgroundColor: '#d1410c', color: '#ffff', borderRadius: '4px', border: '1px solid #d1410c', height: '29px', width: '85px'}} onClick={closeSignupModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
