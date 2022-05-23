import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import './LandingPage.css';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
// import Modal from '../Modal/Modal';
// import AboutMe from "../AboutMe/AboutMe";

const LandingPage = () => {
  // const dispatch = useDispatch();

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
    <div className='landingpage-con'>
      <div>
        <div className='landingpage-slideshow' />
      </div>
      <div style={{height: '0px'}}>
       <h2 className='landingpage-title'>Eventure</h2>
      </div>
      <div className='user-forms'>
        <button className='user-buttons' onClick={changeLoginDisplay}>Log In</button>
        <button className='user-buttons' onClick={changeSignupDisplay}>Sign Up</button>
        <div className={`modal-background-home-page ${loginDisplay}`} onMouseDown={changeLoginDisplay}>
          <LoginForm closeModalFunc={changeLoginDisplay} toggleLoginSignupFunc={toggleLoginSignupFunc} />
        </div>
        <div className={`modal-background-home-page ${signupDisplay}`} onMouseDown={changeSignupDisplay}>
          <SignUpForm closeModalFunc={changeSignupDisplay} toggleLoginSignupFunc={toggleLoginSignupFunc} />
        </div>
      </div>
      <div className='mission-statement'>
        <p>Eventure is a global self-service ticketing platform for live experiences that allows anyone to create, share, find and attend events that fuel their passions and enrich their lives. From music festivals, marathons, conferences, community rallies, and fundraisers, to gaming competitions and air guitar contests. Our mission is to bring the world together through live experiences.</p>
      </div>
      {/* <AboutMe style={{position: 'relative', bottom: '0px'}} /> */}
    </div>
  )
};

export default LandingPage;