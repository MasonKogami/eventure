import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { login } from '../../store/session';
import './SignupForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [showPassword, setPasswordVisibility] = useState(false);
  const history = useHistory();

  useEffect(() => {
    document.title = 'Eventure - Log In or Sign Up';
  }, []);

  const onSignUp = async (e) => {
    e.preventDefault();
    
    const data = await dispatch(signUp(username, email, password, confirmPassword));
    if (data) setErrors(data);
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
  };

  const redirectOnLogin = () => {
    dispatch(login('demo@aa.io', 'password'))
    .then(() => {
      history.push("/home")
    })
  };

  return (
    <div className='split-scrn-ctn'>
      <div className='signup-body-ctn'>
        <div className='signup-body'>
          <div className='title-ctn'>
            <button
                  className='login-home-btn'
                  onClick={ async () => { user ? history.push("/home") : history.push("/") }}
                >Eventure</button>
            <h2 className='login-title'>
              Sign Up</h2>
          </div>
          <form onSubmit={onSignUp} className='signup-form'>
            <div style={{fontSize: '14px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '80%'}}>
              {errors.map((error, ind) => (
                <div style={{color: '#d1410c', padding: '5px 0px'}} key={ind}>{error}</div>
              ))}
            </div>
            <label>
              Username
            </label>
            <div className='form-ctn'>
              <div className='form-field'>
                <input
                  type='text'
                  name='username'
                  onChange={updateUsername}
                  value={username}
                  required={true}
                  className='form-input'
                ></input>
              </div>
            </div>
            <div className='form-ctn'>
              <label>
                Email
              </label>
              <div className='form-field'>
                <input
                  type='text'
                  name='email'
                  onChange={updateEmail}
                  value={email}
                  required={true}
                  className='form-input'
                ></input>
              </div>
            </div>
            <label>
              Password
            </label>
            <div className='form-ctn'>
              <div className='password-field'>
                <input
                  type={showPassword ? "text" : "password"}
                  name='password'
                  onChange={updatePassword}
                  value={password}
                  required={true}
                  className='form-input'
                />
                <div onClick={togglePassword} className='eye-btn'>
                  { showPassword? <FaEyeSlash /> : <FaEye /> }
                </div>
              </div>
            </div>
            <label>
              Confirm
            </label>
            <div className='password-field'>
              <input
                type={showPassword ? "text" : "password"}
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={confirmPassword}
                required={true}
                className='form-input'
              />
              <div onClick={togglePassword} className='eye-btn'>
                { showPassword? <FaEyeSlash /> : <FaEye /> }
              </div>
            </div>
            <div className='submit-button'>
              <button className='sub-btn' type='submit'>Sign Up</button>
            </div>
          </form>
          <div className='divider'>
            <div className='or-divider'>or</div>
            <div className='or-line'></div>
          </div>
          <div className='demo-button'>
              <button className='demo-btn' onClick={ 
                  () => redirectOnLogin()
                }>
                Demo User
              </button>
          </div>
          <button
          className='toggle-signup'
            onClick={ async () => { history.push("/login") }}
          >Log In</button>
        </div>
      </div>
      <div className='split-scrn-img'>
      </div>
    </div>
  );
};

export default SignUpForm;
