import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { readAllEvents } from '../store/events';
import { updateTickets, deleteTickets } from '../store/tickets';

function User() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const events = useSelector(state => state.events);
  const tickets = user?.tickets;

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
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', alignItems: 'center'}}>
      <div>{user.username}'s Tickets</div>
      <div>
        <h2>Event Name</h2>
        <h2>Ticket Quantity</h2>
      </div>
      <div>
        {tickets?.map((ticket) => {
          return (
            <div key={ticket.id}>
              <div>
                {ticket.event_name}
              </div>
              <div>
                {ticket.quantity}
              </div>
            </div>
          )
        })}
      </div>
      <div>
        {/* {(sessionUser.id === event?.host_id) && (<button onClick={showEditModalFunc}>Edit Event</button>)}
          {showEditModal && (
            <Modal closeModalFunc={closeEditModalFunc} className='modal-background'>
              <EditEventForm style={{display: 'flex', justifyContent: 'center'}} closeModalFunc={closeEditModalFunc} />
            </Modal>
        )} */}
      </div>
      <div>
        <button>Refund</button>
          {/* {(sessionUser.id === event?.host_id) && (<button onClick={showEditModalFunc}>Edit Event</button>)}
          {showEditModal && (
            <Modal closeModalFunc={closeEditModalFunc} className='modal-background'>
              <EditEventForm style={{display: 'flex', justifyContent: 'center'}} closeModalFunc={closeEditModalFunc} />
            </Modal>
          )} */}
      </div>
    </div>
  );
}
export default User;
