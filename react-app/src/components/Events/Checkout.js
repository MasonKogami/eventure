import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { readOneEvent } from '../../store/events';
import { addTickets } from '../../store/events';
// import Modal from '../Modal/Modal';

const Checkout = ({ closeModalFunc }) => {
  const dispatch = useDispatch();
  const history  = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const { eventId } = useParams();
  const event = useSelector(state => state.events[eventId]);
  const [quantity, setQuantity] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(readOneEvent(eventId))
  }, [dispatch, eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tickets = {
      user_id: sessionUser.id,
      event_id: eventId,
      quantity
    };

    let newTickets = await dispatch(addTickets(tickets));
    if (newTickets.errors) {
      setErrors(newTickets.errors);
    } else {
      closeModalFunc();
    }
  };

  return (
    <div style={{boxShadow: '0 0 12px rgba(0, 0, 0, 0.5)'}}>
      <h2>Ticket Order Form</h2>
      <form>
        <div>
          <label>
            {event.name}
          </label>
        </div>
        <div>
          <label>
            Quantity
          </label>
          <input
            value={quantity}
            onChange={(e) => e.target.value}
            type='integer'
            placeholder='How many tickets do you need?'
          >
          </input>
        </div>
      <button>Checkout</button>
      </form>
    </div>
  );
};

export default Checkout;