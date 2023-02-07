import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import './LoginForm.css';

const LoginForm = ({ closeModalFunc, toggleLoginSignupFunc }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [loginDisplay] = useState('displayed');
  const [showPassword, setPasswordVisibility] = useState(false);
  const history = useHistory();

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

  const togglePassword = () => {

    setPasswordVisibility(!showPassword);
  }

  const stopTheProp = e => e.stopPropagation();

  return (
    <div className={`login-body ${loginDisplay}`} onClick={stopTheProp} onMouseDown={stopTheProp}>
      {/* <h2 style={{fontSize: '18px', height: '22px', marginBottom: '5px', position: 'relative', left: '46px', color: '#d1410c'}}>Eventure</h2> */}
      <h2 style={{color: '#39364f', fontWeight: 'bolder', fontSize: '35px', marginBottom: '10px', position: 'relative', left: '38px', marginTop: '15px'}}>
        Log in</h2>
      <form onSubmit={onLogin} className='login-form'>
        <div>
          {errors.map((error, ind) => (
            <div style={{color: '#d1410c'}} key={ind}>{error}</div>
          ))}
        </div>
        <div className='email-field'>
          <div style={{marginLeft: '8px'}}>
            <label>
              Email
            </label>
            {/* <label style={{fontSize: '12px', color: '#d1410c', marginLeft: '8px'}}>
              Required *
            </label> */}
          </div>
          <input
            name='email'
            type='text'
            value={email}
            onChange={updateEmail}
            style={{height: '35px', width: '250px'}}
          />
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
            name='password'
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={updatePassword}
            style={{height: '35px', width: '250px', position: 'relative'}}
          />
          <div onClick={togglePassword} className='eye-btn'>
            { showPassword? <FaEyeSlash /> : <FaEye /> }
          </div>
        </div>
        <div className='submit-button'>
          <button className='sub-btn' type='submit'>Log in</button>
        </div>
      </form>
      {/* <button onClick={togglePassword} className='password-vis-btn'>
        { showPassword? <FaEyeSlash /> : <FaEye /> }
      </button> */}
      <div className='or-divider'>or</div>
      <div className='or-line'></div>
      <div className='demo-button'>
        <button className='demo-btn' onClick={() => dispatch(login('demo@aa.io', 'password'))}>
          Demo User
        </button>
      </div>
      <div>
        <button
          onClick={ async () => {
            history.push("/")
          }}
        >Back</button>
      </div>
      <div className='toggle-signup' onClick={toggleLoginSignupFunc}>Sign Up</div>
      <button 
        onClick={ async () => { history.push("/signup") }}
      >Sign Up</button>
    </div>
  );
};

export default LoginForm;
