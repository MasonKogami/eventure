import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import NewEvent from '../events/NewEvent';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav style={{height: '72px'}}>
      <div className='home'>
          <NavLink to='/' exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
            Eventure
          </NavLink>
          <NavLink to='/events/create' exact={true} style={{textDecoration: 'none'}}>
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
