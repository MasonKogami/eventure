import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import './LoginForm.css';

const LoginForm = ({ closeModalFunc, toggleLoginSignupFunc }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [showPassword, setPasswordVisibility] = useState(false);
  const history = useHistory();

  useEffect(() => {
    document.title = 'Eventure - Log In or Sign Up';
  }, []);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const redirectOnLogin = () => {
    dispatch(login('demo@aa.io', 'password'))
    .then(() => {
      history.push("/home")
    })
  };

  const togglePassword = () => {

    setPasswordVisibility(!showPassword);
  }

  return (
    <div className='split-scrn-ctn'>
      <div className='login-body-ctn'>
        <div className='login-body'>
          <div className='title-ctn'>
            <button
              className='login-home-btn'
              onClick={ async () => { user ? history.push("/home") : history.push("/") }}
            >Eventure</button>
            <h2 className='login-title'>
              Log in</h2>
          </div>
          <form onSubmit={onLogin} className='login-form'>
            <div>
              {errors.map((error, ind) => (
                <div style={{color: '#d1410c'}} key={ind}>{error}</div>
              ))}
            </div>
            <div className='email-input-ctn'>
              <label>
                Email Address
              </label>
              <div className='email-field'>
                <div>
                  {/* <label style={{fontSize: '12px', color: '#d1410c', marginLeft: '8px'}}>
                    Required *
                  </label> */}
                </div>
                <input
                  name='email'
                  type='text'
                  value={email}
                  onChange={updateEmail}
                  className='email-input'
                />
              </div>
            </div>
            <label>
              Password
            </label>
            <div className='password-field'>
              <div>
                {/* <label style={{fontSize: '12px', color: '#d1410c', marginLeft: '8px'}}>
                  Required *
                </label> */}
              </div>
              <input
                name='password'
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={updatePassword}
                className='password-input'
              />
              <div onClick={togglePassword} className='eye-btn'>
                { showPassword? <FaEyeSlash /> : <FaEye /> }
              </div>
            </div>
            <div className='submit-button'>
              <button className='sub-btn' type='submit'>Log in</button>
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
            onClick={ async () => { history.push("/signup") }}
            className='toggle-signup'
          >Sign Up</button>
        </div>
      </div>
      <div className='split-scrn-img'>
      </div>
    </div>
  );
};

export default LoginForm;
