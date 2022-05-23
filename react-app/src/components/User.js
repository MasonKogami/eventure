import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { readAllEvents } from '../store/events';
import { loadTickets } from '../store/tickets';
// import { loadUser } from '../store/session';
import SingleTicket from './Tickets/SingleTicket';
import './User.css';

function User() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  // const events = useSelector(state => state.events);
  // const test = useSelector(state => state.session.user);
  const tickets = useSelector(state => Object.values(state.tickets));
  // const tickets = user?.tickets;
  // const tickets = useSelector(state => state.session.user.tickets);

  useEffect(() => {
    dispatch(loadTickets(userId));
    dispatch(readAllEvents())
  }, [dispatch, userId]);

  // useEffect(() => {
  //   dispatch(loadUser(user));
  // }, [dispatch, user]);

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
      <h2 className='user-title'>{user.username}'s Tickets</h2>
      <div className='table-headers'>
        <h2>Event Name</h2>
        <h2>Ticket Quantity</h2>
        <h2>Actions</h2>
      </div>
      <div>
        {tickets?.map((ticket) => {
          return (
            <SingleTicket key={ticket.id} ticket={ticket} userId={userId} />
          )
        })}
      </div>
    </div>
  );
}
export default User;
