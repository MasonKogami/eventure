import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './LandingPage.css';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import Modal from '../Modal/Modal';

const LandingPage = () => {
  const dispatch = useDispatch();

  const [loginDisplay, setLoginDisplay] = useState('not-displayed')
  const [signupDisplay, setSignupDisplay] = useState('not-displayed')

  const changeLoginDisplay = () => {
    if (loginDisplay === 'not-displayed') {
        setLoginDisplay('displayed')
    } else if (loginDisplay === 'displayed') {
        setLoginDisplay('not-displayed')
    } else if (signupDisplay === 'displayed') {
        setLoginDisplay('not-displayed')
    }
  };

  const changeSignupDisplay = () => {
    if (signupDisplay === 'not-displayed') {
        setSignupDisplay('displayed')
    } else if (signupDisplay === 'displayed') {
        setSignupDisplay('not-displayed')
    } else if (loginDisplay === 'displayed') {
        setSignupDisplay('not-displayed')
    }
  };

  const toggleLoginSignupFunc = () => {
    changeLoginDisplay();
    changeSignupDisplay();
  };

  return (
    <>
      <h2>Eventure</h2>
      <div className='landingpage-slideshow' />
      <div className='user-forms'>
        <button onClick={changeLoginDisplay}>Log In</button>
        <button onClick={changeSignupDisplay}>Sign Up</button>
        <div className={`modal-background-home-page ${loginDisplay}`} onMouseDown={changeLoginDisplay}>
          <LoginForm closeModalFunc={changeLoginDisplay} toggleLoginSignupFunc={toggleLoginSignupFunc} />
        </div>
        <div className={`modal-background-home-page ${signupDisplay}`} onMouseDown={changeSignupDisplay}>
          <SignUpForm closeModalFunc={changeSignupDisplay} toggleLoginSignupFunc={toggleLoginSignupFunc} />
        </div>
      </div>
      {/* <div className="user-buttons-div">
          <button  onClick={demoLogin}>Demo User</button>
          <button  onClick={changeLoginDisplay}>Log In</button>
          <button  onClick={changeSignupDisplay}>Sign Up</button>
          <div className={`modal-background-home-page ${loginDisplay}`} onMouseDown={changeLoginDisplay}>
              <LoginForm closeModalFunc={changeLoginDisplay} toggleLoginSignupFunc={toggleLoginSignupFunc} />
          </div>
          <div className={`modal-background-home-page ${signupDisplay}`} onMouseDown={changeSignupDisplay}>
              <SignUpForm closeModalFunc={changeSignupDisplay} toggleLoginSignupFunc={toggleLoginSignupFunc} />
          </div>
      </div> */}
    </>
  )
};

export default LandingPage;