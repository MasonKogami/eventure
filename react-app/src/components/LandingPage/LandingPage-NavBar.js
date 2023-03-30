import { useState } from 'react';
import './LandingPage-NavBar.css';

const LandingPageNavBar = () => {

  // navbar scrolling color change
  const [color, setColor] = useState(false);

  const changeColor = () => {
    if (window.scrollY >= 70) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  // event listener for scroll
  window.addEventListener("scroll", changeColor);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <nav className={color ? 'landingpage-navbar scroll-bg' : 'landingpage-navbar'}>
        <h4 id='top-of-page' onClick={scrollToTop}>Eventure</h4>
        <ul className='navbar-links'>
          <li className='navbar-item'>
            <a href='/'>Login</a>
          </li>
          <li className='navbar-item'>
            <a href='/'>Signup</a>
          </li>
          <li className='navbar-item'>
            <a href='#mission-statement'>Mission Statement</a>
          </li>
          <li className='navbar-item'>
            <a href='#tech-used'>Tech Stack</a>
          </li>
          <li className='navbar-item'>
            <a href='#about'>About</a>
          </li>
        </ul>
      </nav>
    </div>
  )
};

export default LandingPageNavBar;