import React from 'react';
import './AboutMe.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const AboutMe = () => {

  return (
    <div className='aboutme-section'>
      <p style={{color: 'black'}}>© 2022 Eventure</p>
      <a href='https://github.com/MasonKogami' style={{textDecoration: 'none'}}>
        <FaGithub size={30} style={{textDecoration: 'none', color: 'black'}}/>
      </a>
      <a href='https://www.linkedin.com/in/mason-kogami-74b789231/'>
        <FaLinkedin size={30} style={{color: '#0a66c2'}}/>
      </a>
    </div>
  );
};

export default AboutMe;