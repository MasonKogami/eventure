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
      </div>
      <div className='logout-ticket' style={{color: '#39364f'}}>
        <div className='create-event-con'>
          <button 
            className='create-event-btn'
            onClick={ async () => {
              history.push('/events/create/')
          }}>
            <FaRegPlusSquare style={{ position: 'relative', bottom: '3px', left: '-1px'}}/>
            Create an event</button>
        </div>
        <div className='likes'>
          <button className='likes-btn'>
            <FaRegHeart style={{position: 'relative', top: '-3px', left: '-1px', fontWeight: 'bolder'}}/>
            Likes
          </button>
        </div>
        <div className='tickets-con'>
          <button 
            className='tickets-btn'
            onClick={() => {
              history.push(`/users/${sessionUser?.id}`)
            }}
          >
            <FaTicketAlt style={{position: 'relative', bottom: '3px', left: '1px'}} />
            Tickets</button>
        </div>
        <div className='dropdown'>
          <button className='dropdown-btn'>
            <button className='user-icon'>
              <FaUser />
            </button>
            {sessionUser?.email}</button>
          <div className='dropdown-content'>
            <button
              className='tickets-dropdown-btn'
              onClick={() => history.push(`/users/${sessionUser?.id}`)}
            >Tickets</button>
            <button
              className='likes-dropdown-btn'
            >Likes</button>
            {/* <button
              className='settings-dropdown-btn'
              onClick={() => history.push(`/users/${sessionUser?.id}`)}
            >Account Settings</button> */}
            <button onClick={ async () => {
              await dispatch(logout());
              history.push('/landingpage');
            }} className='logout'>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
