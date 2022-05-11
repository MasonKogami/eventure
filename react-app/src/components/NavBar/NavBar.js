import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <div>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
        </div>
        <div>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
        </div>
        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
