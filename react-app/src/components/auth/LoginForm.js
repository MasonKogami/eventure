import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';

const LoginForm = ({ closeModalFunc, toggleLoginSignupFunc }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [loginDisplay] = useState('displayed');

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

  if (user) {
    return <Redirect to='/home' />;
  }

  const stopTheProp = e => e.stopPropagation();

  return (
    <div className={`login-body ${loginDisplay}`} onClick={stopTheProp} onMouseDown={stopTheProp}>
      <h2 style={{color: '#d1410c', fontWeight: 'bolder', display: 'flex', justifyContent: 'center', fontSize: '35px', marginBottom: '10px'}}>
        Login <span style={{margin: '0px 10px'}}>or</span> <span className='toggle-signup' onClick={toggleLoginSignupFunc}>Sign Up</span></h2>
      <form onSubmit={onLogin} className='login-form'>
        <div>
          {errors.map((error, ind) => (
            <div style={{color: '#d1410c'}} key={ind}>{error}</div>
          ))}
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
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            style={{height: '20px', width: '250px'}}
          />
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
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            style={{height: '20px', width: '250px'}}
          />
          <div className='submit-button'>
            <button className='sub-btn' type='submit'>Login</button>
          </div>
        </div>
      </form>
      <div className='demo-button'>
        <button className='demo-btn' onClick={() => dispatch(login('demo@aa.io', 'password'))}>
          Demo User
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
