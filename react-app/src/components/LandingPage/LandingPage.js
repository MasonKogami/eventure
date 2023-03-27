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
       <h2 className='landingpage-title'>Have An <p className='eventure-title-logo'>Eventure</p>!</h2>
       <h3 className='cta'>Browse events, purchase tickets, and find your next <p style={{color: '#d1410c'}}>Eventure</p>.</h3>
      </div>
      <div className='landingpage-cover'>
        <img alt='mp-cover' src='https://eventbrite-s3.s3.amazonaws.com/marketing/landingpages/assets/About-Header.jpg' />
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
        <p style={{marginBottom: '0px'}}>Eventure is a global self-service ticketing platform for live experiences that allows anyone to create, share, find and attend events that fuel their passions and enrich their lives. From music festivals, marathons, conferences, community rallies, and fundraisers, to gaming competitions and air guitar contests. Our mission is to bring the world together through live experiences.</p>
      </div>
      <div>
        <div style={{backgroundImage: 'url(https://cdn.evbstatic.com/s3-build/fe/build/images/7240401618ed7526be7cec3b43684583-2_tablet_1067x470.jpg)', height: '470px', minHeight: '32.4em', minWidth: '100vh', width: '100%', backgroundSize: 'cover'}}/>
      </div>
      {/* <div className='mission-statement'>
        <p style={{marginBottom: '0px'}}>From music festivals, marathons, conferences, community rallies, and fundraisers, to gaming competitions and air guitar contests. Our mission is to bring the world together through live experiences.</p>
      </div> */}
      {/* <div>
        <div style={{backgroundImage: 'url(https://cdn.evbstatic.com/s3-build/fe/build/images/6aaf4a36e35b1b71bc077e200ac7429c-1_tablet_1067x470.jpg)', height: '470px', minHeight: '32.4em', minWidth: '100vh', width: '100%', backgroundSize: 'cover'}}/>
      </div> */}
      {/* <AboutMe style={{position: 'relative', bottom: '0px'}} /> */}
      <div className='tech-section'>        
        <h3>Technology Used:</h3>
        <section>I utilized React and JavaScript for the frontend with global state management through Redux. I previously learned Python prior to this project so I accompanied the frontend with a Python and Flask backend. For the database, I added PostgreSQL for a multi-version concurrency database for a seamless data read and write. I deployed initially to Heroku prior to some changes in their tiers, it is now deployed with Render. I have also containerized this project with Docker. To top it off, I included an AWS S3 bucket for user-uploaded images, users can upload and it will auto-scale to adjust for additional storage as needed.</section>
      </div>
      <div className='about-section'>
        <div className='about-title-ctn'>
          <h3>About The Developer:</h3>
          <img alt='profile-pic' src='https://drive.google.com/uc?id=13LK-asdns3YeRqMisyTDE1kXKtEAoJ7C' />
        </div>
        <section>Hi! My name is Mason Kogami. This is my capstone project that I completed during my coding bootcamp at App Academy. I have since graduated and further developed this project and have crafted this project to be special with lots of love and detail.</section>
      </div>
    </div>
  )
};

export default LandingPage;