import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';
import { BsPlusLg } from 'react-icons/bs';

const NavBar = () => {
  return (
    <nav style={{height: '72px'}}>
      <div className='home'>
          <NavLink to='/home' exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
            Eventure
          </NavLink>
          <NavLink to='/events/create' exact={true} style={{textDecoration: 'none', verticalAlign: 'end', color: 'rgb(61, 100, 255)'}}>
            <BsPlusLg style={{ position: 'relative', bottom: '17px', left: '55px'}}/>
            Create Event
          </NavLink>
      </div>
      {/* <div className='login-signup'>
          <NavLink to='/login' exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
            Login
          </NavLink>
          <NavLink to='/sign-up' exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
            Sign Up
          </NavLink>
      </div> */}
      {/* <li>
        <NavLink to='/users' exact={true} activeClassName='active'>
          Users
        </NavLink>
      </li> */}
      <div className='logout-ticket'>
        <div>
          Tickets
        </div>
        <LogoutButton />
      </div>
    </nav>
  );
}

export default NavBar;
