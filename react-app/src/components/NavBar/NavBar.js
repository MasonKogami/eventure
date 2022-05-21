import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './NavBar.css';
import { BsPlusLg } from 'react-icons/bs';
import { FaTicketAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import { FaUser } from 'react-icons/fa';

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/landingpage');
  };

  return <button style={{cursor: 'pointer', backgroundColor: '#d1410c', color: '#ffff', borderRadius: '4px', border: '1px solid #d1410c', height: '29px', width: '70px'}} onClick={onLogout}>Logout</button>;
};

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  return (
    <nav style={{height: '61px'}}>
      <div className='home'>
          <NavLink to='/home' exact={true} activeClassName='active' style={{textDecoration: 'none', marginLeft: '24px', color: '#d1410c', fontSize: '20px', fontWeight: 'bolder'}}>
            Eventure
          </NavLink>
          <NavLink to='/events/create' exact={true} style={{textDecoration: 'none', verticalAlign: 'end', color: 'rgb(61, 100, 255)'}}>
            <BsPlusLg style={{ position: 'relative', bottom: '15px', left: '55px'}}/>
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
      <div className='logout-ticket' style={{paddingRight: '24px', color: '#39364f'}}>
        <div style={{marginRight: '15px'}}>
          <FaTicketAlt style={{position: 'relative', bottom: '15px', left: '34px'}} />
          <NavLink to={`/users/${sessionUser.id}`} style={{textDecoration: 'none', color: '#39364f'}}>Tickets</NavLink>
        </div>
        <FaUser />
        <div style={{color: '#39364f'}}>
          {sessionUser?.username}
        </div>
        <LogoutButton />
      </div>
    </nav>
  );
}

export default NavBar;
