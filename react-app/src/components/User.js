import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { readAllEvents } from '../store/events';
import { loadTickets } from '../store/tickets';
// import SingleTicket from './Tickets/SingleTicket';
import { FaUser } from 'react-icons/fa';
// import { FaTicketAlt } from 'react-icons/fa';
import './User.css';

function User() {
  const dispatch = useDispatch();
  // const [user, setUser] = useState({});
  // const { userId }  = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const tickets = useSelector(state => Object.values(state.tickets));
  const events = useSelector(state => Object.values(state.events))

  useEffect(() => {
    dispatch(loadTickets(sessionUser.id));
    dispatch(readAllEvents())
  }, [dispatch, sessionUser]);

  // useEffect(() => {
  //   if (!userId) {
  //     return;
  //   }
  //   (async () => {
  //     const response = await fetch(`/api/users/${userId}`);
  //     const user = await response.json();
  //     setUser(user);
  //   })();
  // }, [userId]);

  // if (!user) {
  //   return null;
  // };

  return (
    <div className='user-profile-con'>
      <div className='user-title'>
        <button className='user-profile-icon'>
          <FaUser className='fa-user-icon'/>
        </button>
        <div className='user-profile-content'>
          <h2 className='username-profile'>{sessionUser.username}'s Profile</h2>
          <div className='orders-likes-content'>{tickets?.length} order(s) • 0 Like(s)</div>
        </div>
      </div>
      <div className='orders'>
        <h2>Orders:</h2>
      </div>
      <div className='grid'>
        {tickets?.sort((a, b) => b.id - a.id).map((ticket) => {
          const event = events.find(event => event.id === ticket?.event_id)
          return (
            <NavLink to={`/tickets/${ticket?.id}`} key={ticket.id} className='single-ticket-listing'>
              {/* <FaTicketAlt /> */}
              <div className='event-date-info'>{event?.date.slice(8, 11)} <span style={{color: '#39364f', fontSize: '22px'}}>{event?.date.slice(5,7)}</span></div>
              <div className='event-image'></div>
              <div className='single-event-content'>
                <div style={{fontSize: '25px'}}>{ticket?.event_name}</div>
                <div style={{fontSize: '16px'}}>{`Order #${ticket.id} - ${ticket?.quantity} ticket(s)`}</div>
                <div style={{fontSize: '16px'}}>Purchased on {event?.created_at.slice(0, 16)}</div>
              </div>
            </NavLink>
          )
        })}
      </div>
    </div>
  );
}
export default User;
