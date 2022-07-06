import React from 'react';
import './AboutMe.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const AboutMe = () => {

  return (
    <div className='aboutme-section'>
      <p style={{color: 'whitesmoke'}}>© 2022 Eventure</p>
      <a target='_blank' href='https://github.com/MasonKogami' style={{textDecoration: 'none'}}>
        <FaGithub size={30} style={{textDecoration: 'none', color: 'whitesmoke'}}/>
      </a>
      <a target='_blank' href='https://www.linkedin.com/in/masonkogami/'>
        <FaLinkedin size={30} style={{color: '#0a66c2'}}/>
      </a>
    </div>
  );
};

export default AboutMe;