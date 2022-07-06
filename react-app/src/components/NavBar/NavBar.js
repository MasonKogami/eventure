import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './NavBar.css';
import { FaRegPlusSquare } from 'react-icons/fa';
import { FaTicketAlt, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import { FaUser } from 'react-icons/fa';

// const LogoutButton = () => {
//   const history = useHistory();
//   const dispatch = useDispatch();
//   const onLogout = async (e) => {
//     await dispatch(logout());
//     history.push('/landingpage');
//   };

//   return <button onClick={onLogout}>Logout</button>;
// };

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <nav style={{height: '61px'}}>
      <div className='home'>
          <NavLink to='/home' exact={true} activeClassName='active' style={{textDecoration: 'none', marginLeft: '24px', color: '#d1410c', fontSize: '24px', fontWeight: 'bolder'}}>
            Eventure
          </NavLink>
          {/* <NavLink to='/events/create' exact={true} style={{textDecoration: 'none', verticalAlign: 'end', color: 'rgb(61, 100, 255)'}}>
            <BsPlusLg style={{ position: 'relative', bottom: '15px', left: '55px'}}/>
            Create Event
          </NavLink> */}
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
      <div className='logout-ticket' style={{color: '#39364f'}}>
        <div className='create-event-con'>
          <button 
            className='create-event-btn'
            onClick={ async () => {
              history.push('/events/create/')
          }}>
            <FaRegPlusSquare style={{ position: 'relative', bottom: '15px', left: '58px'}}/>
            Create an event</button>
        </div>
        {/* <NavLink to='/events/create' exact={true} style={{position: 'relative', top: '10px', textDecoration: 'none', verticalAlign: 'end', color: 'rgb(61, 100, 255)', fontSize: '14px'}}>
          <FaRegPlusSquare style={{ position: 'relative', bottom: '15px', left: '58px'}}/>
          Create an event
        </NavLink> */}
        <div className='likes'>
         <FaRegHeart style={{position: 'relative', top: '-15px', left: '25px', fontWeight: 'bolder'}}/>
          Likes
        </div>
        <div className='tickets-con'>
          <NavLink className='tickets-link' to={`/users/${sessionUser.id}`}>
            <FaTicketAlt style={{position: 'relative', bottom: '15px', left: '30px'}} />
            Tickets</NavLink>
        </div>
        <div className='dropdown'>
          <button className='dropdown-btn'>
            <FaUser style={{height: '16px', width: '16px', marginRight: '20px'}} />
            {sessionUser?.email}</button>
          <div className='dropdown-content'>
            <button onClick={ async () => {
              await dispatch(logout());
              history.push('/landingpage');
            }} className='logout'>Logout</button>
          </div>
        </div>
        {/* <LogoutButton /> */}
      </div>
    </nav>
  );
}

export default NavBar;
