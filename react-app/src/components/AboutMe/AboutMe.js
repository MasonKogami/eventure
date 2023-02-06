import React from 'react';
import './AboutMe.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const AboutMe = () => {

  return (
    <div className='aboutme-section'>
      <a style={{color: 'whitesmoke', textDecoration: 'none'}} target='_blank' rel='noreferrer' href='https://masonkogami.dev'>© 2022 Mason Kogami</a>
      <a target='_blank' rel='noreferrer' href='https://github.com/MasonKogami' style={{textDecoration: 'none'}}>
        <FaGithub size={30} style={{textDecoration: 'none', color: 'whitesmoke'}}/>
      </a>
      <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/masonkogami/'>
        <FaLinkedin size={30} style={{color: '#0a66c2'}}/>
      </a>
      <p>Built With: </p>
      <img alt='' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
      <img alt='' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" />
      <img alt='' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" />
      <i className="devicon-flask-original"></i>
      <img alt='' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" />
      <img alt='' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" />
      <img alt='' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" />
      <img alt='' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" />
      <img alt='' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" />
      <img alt='' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-plain.svg" />
    </div>
  );
};

export default AboutMe;