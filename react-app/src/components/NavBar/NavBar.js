import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './NavBar.css';
import { BsPlusLg } from 'react-icons/bs';
import { FaTicketAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/login');
  };

  return <button onClick={onLogout}>Logout</button>;
};

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
          <FaTicketAlt style={{position: 'relative', bottom: '18px', left: '34px'}} />
          Tickets
        </div>
        <LogoutButton />
      </div>
    </nav>
  );
}

export default NavBar;
