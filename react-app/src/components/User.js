import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { readAllEvents } from '../store/events';
import { loadTickets } from '../store/tickets';
import SingleTicket from './Tickets/SingleTicket';
import { FaUser } from 'react-icons/fa';
import './User.css';

function User() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const tickets = useSelector(state => Object.values(state.tickets));

  useEffect(() => {
    dispatch(loadTickets(userId));
    dispatch(readAllEvents())
  }, [dispatch, userId]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  };

  return (
    <div className='user-profile-con'>
      <div className='user-title'>
        <FaUser style={{height: '50px'}}/>
        <h2>{user.username}'s Profile</h2>
      </div>
      <div className='orders'>
        <h2>{user.username}'s Orders:</h2>
      </div>
      <div className='grid'>
        {tickets?.map((ticket) => {
          return (
            <SingleTicket key={ticket.id} ticket={ticket} userId={userId} ticketEvent={ticket.event_id}/>
          )
        })}
      </div>
    </div>
  );
}
export default User;
