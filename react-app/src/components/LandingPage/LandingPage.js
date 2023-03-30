import './LandingPage.css';
// import LoginForm from '../auth/LoginForm';
// import SignUpForm from '../auth/SignUpForm';
// import Modal from '../Modal/Modal';
// import AboutMe from "../AboutMe/AboutMe";
import { SiRender } from "react-icons/si";
import LandingPageNavBar from './LandingPage-NavBar';

const LandingPage = () => {

  // const [loginDisplay, setLoginDisplay] = useState('not-displayed');
  // const [signupDisplay, setSignupDisplay] = useState('not-displayed');

  // const changeLoginDisplay = () => {
  //   if (loginDisplay === 'not-displayed') {
  //       window.scrollTo(0, document.body.scrollHeight / 3)
  //       setLoginDisplay('displayed')
  //   } else if (loginDisplay === 'displayed') {
  //       setLoginDisplay('not-displayed')
  //   } else if (signupDisplay === 'displayed') {
  //       setLoginDisplay('not-displayed')
  //   }
  // };

  // const changeSignupDisplay = () => {
  //   if (signupDisplay === 'not-displayed') {
  //       window.scrollTo(0, document.body.scrollHeight / 3)
  //       setSignupDisplay('displayed')
  //   } else if (signupDisplay === 'displayed') {
  //       setSignupDisplay('not-displayed')
  //   } else if (loginDisplay === 'displayed') {
  //       setSignupDisplay('not-displayed')
  //   }
  // };

  // const toggleLoginSignupFunc = () => {
  //   changeLoginDisplay();
  //   changeSignupDisplay();
  // };

  return (
    <div className='landingpage-con'>
      <LandingPageNavBar />
      <div className='lp-title-ctn'>
       <h2 className='landingpage-title'>Bringing the world together through live experiences.</h2>
       <h3 className='cta'>Discover your next adventure.</h3>
      </div>
      <div className='landingpage-cover'>
        <img alt='mp-cover' src='https://eventbrite-s3.s3.amazonaws.com/marketing/landingpages/assets/About-Header.jpg' />
      </div>
      {/* <div className='user-forms'>
        <button className='user-buttons' onClick={changeLoginDisplay}>Log In</button>
        <button className='user-buttons' onClick={changeSignupDisplay}>Sign Up</button>
        <div className={`modal-background-home-page ${loginDisplay}`} onMouseDown={changeLoginDisplay}>
          <LoginForm closeModalFunc={changeLoginDisplay} toggleLoginSignupFunc={toggleLoginSignupFunc} />
        </div>
        <div className={`modal-background-home-page ${signupDisplay}`} onMouseDown={changeSignupDisplay}>
          <SignUpForm closeModalFunc={changeSignupDisplay} toggleLoginSignupFunc={toggleLoginSignupFunc} />
        </div>
      </div> */}
      {/* <div className='lb-ctn'>
        <button
          className='lb-v2'
          onClick={ async () => { history.push("/login") }}
        >Log In</button>
        <button
          className='lb-v2'
          onClick={ async () => { history.push("/signup") }}
        >Sign Up</button>
      </div> */}
      <div className='r1'>
        <p className='p1'>Browse through thousands of live experiences.</p>
        <p className='p2'>Find your passion through music, marathons, and more.</p>
      </div>
      <div className='reason1-img-ctn'>
        <img alt='reason-1' src='https://cdn.evbstatic.com/s3-build/fe/build/images/7240401618ed7526be7cec3b43684583-2_tablet_1067x470.jpg' className='reason1'/>
      </div>
      <div className='r2'>
        <p className='p3'>Explore anywhere.</p>
        <p className='p4'>Discover your next adventure and see where it takes you.</p>
      </div>
      <div className='reason2-img-ctn'>
        <img alt='reason-2' src='https://cdn.evbstatic.com/s3-build/fe/build/images/6aaf4a36e35b1b71bc077e200ac7429c-1_tablet_1067x470.jpg' className='reason2'/>
      </div>
      <div className='r3'>
        <div className='r3-bg'>
          <p className='p5'>Connect with others.</p>
          <p className='p6'>Remember to be kind and love one another.</p>
        </div>
      </div>
      <div className='reason3-img-ctn'>
        <img alt='reason-3' src='https://cdn.evbstatic.com/s3-build/fe/build/images/c7befabb4613c322b8708745f3f6a1fe-7_tablet_1067x470.jpg' className='reason3'/>
      </div>
      <div className='mission-statement'>
        <p style={{marginBottom: '0px'}}>Eventure is a global self-service ticketing platform for live experiences that allows anyone to create, share, find and attend events that fuel their passions and enrich their lives. From music festivals, marathons, conferences, community rallies, and fundraisers, to gaming competitions and air guitar contests. Our mission is to bring the world together through live experiences.</p>
      </div>
      <div className='btm-split-section' id='tech-used'>
        <div className='tech-section'>        
          <h3 id='tech-used'>Technology Used:</h3>
          <div className='tech-ctn'>
            <img alt='' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
            <img alt='' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" />
            <img alt='' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" />
            <i className="devicon-flask-original"></i>
            <img alt='' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" />
            <img alt='' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" />
            <img alt='' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" />
            <img alt='' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" />
            <img alt='' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" />
            <SiRender style={{height: '70px', width: '40px', color: '#0fe0b6'}}/>
          </div>
          <section>I utilized React and JavaScript for the frontend with global state management through Redux. I spent a few weeks learning Python prior to this project so I accompanied the frontend with a Python and Flask backend. For the database, I added PostgreSQL for a multi-version concurrency database for a seamless data read and write. I deployed initially to Heroku prior to some changes in their tiers, it is now deployed with Render. I have also containerized this project with Docker. To top it off, I included an AWS S3 bucket for user-uploaded images, users can upload and it will auto-scale to adjust for additional storage as needed.</section>
        </div>
        <div className='about-section'>
          <div className='about-title-ctn'>
            <h3 id='about'>About The Developer:</h3>
          </div>
          <div className='about-dev-ctn'>
            <img alt='profile-pic' src='https://drive.google.com/uc?id=13LK-asdns3YeRqMisyTDE1kXKtEAoJ7C' />
            <p>Hi! My name is Mason Kogami. This is my capstone project that I completed during my coding bootcamp at App Academy. I have since graduated and further developed this project and have crafted this project to be special with lots of love and detail.</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default LandingPage;