import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { readAllEvents } from '../store/events';
import { updateTickets, deleteTickets } from '../store/tickets';

const Ticket = ({ event, ticket }) => {
  console.log(event);
  console.log(ticket);
  const Event = event.id === ticket.event_id;

  return (
    <div>
      <div>
        <label>
          {Event.name}
        </label>
      </div>
      <div>
        <label>
          {/* number of tickets for event */}
          {ticket.quantity}
        </label>
      </div>
    </div>
  )
}

function User() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const events = useSelector(state => state.events);
  const tickets = user?.tickets;
  console.log(Object.values(events));
  console.log(user);
  console.log(tickets);

  useEffect(() => {
    dispatch(readAllEvents())
  }, [dispatch]);

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
  }

  return (
    <div>
      <div>{user.username}</div>
      <div>
        <label>
          Tickets
        </label>
      </div>
      <div>
        {tickets?.map((ticket) => {
          return (
            <div key={ticket.id}>
              {Object.values(events).map(event => {
                <Ticket key={event.id} event={event} ticket={ticket}/>
              })}
            </div>
          )
        })}
      </div>
    </div>
  );
}
export default User;
