import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
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
  const [showPassword, setPasswordVisibility] = useState(false);

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

  const togglePassword = () => {

    setPasswordVisibility(!showPassword);
  }

  const stopTheProp = e => e.stopPropagation();

  return (
    <div className={`signup-body ${signupDisplay}`} onClick={stopTheProp} onMouseDown={stopTheProp}>
      <h2 style={{color: '#39364f', fontWeight: 'bolder', fontSize: '35px', marginBottom: '10px', position: 'relative', left: '38px'}}>
        Sign Up</h2>
      <form onSubmit={onSignUp} className='signup-form'>
        <div style={{fontSize: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          {errors.map((error, ind) => (
            <div style={{color: '#d1410c'}} key={ind}>{error}</div>
          ))}
        </div>
        <div className='username-field'>
          <div style={{marginLeft: '7.5px'}}>
            <label>
              Username
            </label>
            {/* <label style={{fontSize: '12px', color: '#d1410c', marginLeft: '8px'}}>
              Required *
            </label> */}
          </div>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            required={true}
            style={{height: '35px', width: '250px'}}
          ></input>
        </div>
        <div className='email-field'>
          <div style={{marginLeft: '7.5px'}}>
            <label>
              Email
            </label>
            {/* <label style={{fontSize: '12px', color: '#d1410c', marginLeft: '8px'}}>
              Required *
            </label> */}
          </div>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            required={true}
            style={{height: '35px', width: '250px'}}
          ></input>
        </div>
        <div className='password-field'>
          <div>
            <label>
              Password
            </label>
            {/* <label style={{fontSize: '12px', color: '#d1410c', marginLeft: '8px'}}>
              Required *
            </label> */}
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name='password'
            onChange={updatePassword}
            value={password}
            required={true}
            style={{height: '35px', width: '250px'}}
          />
          <div onClick={togglePassword} className='eye-btn'>
            { showPassword? <FaEyeSlash /> : <FaEye /> }
          </div>
        </div>
        <div className='password-field'>
          <div>
            <label>
              Confirm
            </label>
            {/* <label style={{fontSize: '12px', color: '#d1410c', marginLeft: '8px'}}>
              Required *
            </label> */}
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={confirmPassword}
            required={true}
            style={{height: '35px', width: '250px'}}
          />
          <div onClick={togglePassword} className='eye-btn'>
            { showPassword? <FaEyeSlash /> : <FaEye /> }
          </div>
        </div>
        <div className='submit-button'>
          <button className='submit-btn' type='submit'>Sign Up</button>
        </div>
      </form>
      <div className='or-divider2'>or</div>
      <div className='or-line'></div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '13px'}}>
        <button className='cancel-btn' onClick={closeSignupModal}>
          Cancel
        </button>
      </div>
      <div className='toggle-login' onClick={toggleLoginSignupFunc}>Log in</div>
    </div>
  );
};

export default SignUpForm;
