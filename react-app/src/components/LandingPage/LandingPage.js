import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import './LandingPage.css';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import { NavLink } from 'react-router-dom';
// import Modal from '../Modal/Modal';
// import AboutMe from "../AboutMe/AboutMe";

const LandingPage = () => {
  // const dispatch = useDispatch();

  const [loginDisplay, setLoginDisplay] = useState('not-displayed')
  const [signupDisplay, setSignupDisplay] = useState('not-displayed')

  const changeLoginDisplay = () => {
    if (loginDisplay === 'not-displayed') {
        window.scrollTo(0, document.body.scrollHeight / 3)
        setLoginDisplay('displayed')
    } else if (loginDisplay === 'displayed') {
        setLoginDisplay('not-displayed')
    } else if (signupDisplay === 'displayed') {
        setLoginDisplay('not-displayed')
    }
  };

  const changeSignupDisplay = () => {
    if (signupDisplay === 'not-displayed') {
        window.scrollTo(0, document.body.scrollHeight / 3)
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
      <div style={{height: '0px'}}>
       <h2 className='landingpage-title'>Eventure</h2>
      </div>
      <div>
        <div className='landingpage-slideshow' />
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
      <div>
        <NavLink to='/login'>Login</NavLink>
        
      </div>
      <div className='mission-statement'>
        <p style={{marginBottom: '0px'}}>Eventure is a global self-service ticketing platform for live experiences that allows anyone to create, share, find and attend events that fuel their passions and enrich their lives.</p>
      </div>
      <div>
        <div style={{backgroundImage: 'url(https://cdn.evbstatic.com/s3-build/fe/build/images/7240401618ed7526be7cec3b43684583-2_tablet_1067x470.jpg)', height: '470px', minHeight: '32.4em', minWidth: '100vh', width: '100%', backgroundSize: 'cover'}}/>
      </div>
      <div className='mission-statement'>
        <p style={{marginBottom: '0px'}}>From music festivals, marathons, conferences, community rallies, and fundraisers, to gaming competitions and air guitar contests. Our mission is to bring the world together through live experiences.</p>
      </div>
      <div>
        <div style={{backgroundImage: 'url(https://cdn.evbstatic.com/s3-build/fe/build/images/6aaf4a36e35b1b71bc077e200ac7429c-1_tablet_1067x470.jpg)', height: '470px', minHeight: '32.4em', minWidth: '100vh', width: '100%', backgroundSize: 'cover'}}/>
      </div>
      {/* <AboutMe style={{position: 'relative', bottom: '0px'}} /> */}
    </div>
  )
};

export default LandingPage;