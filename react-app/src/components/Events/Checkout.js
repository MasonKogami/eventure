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
  const [quantity, setQuantity] = useState(0);
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

  const stopTheProp = e => e.stopPropagation();

  return (
    <div style={{backgroundColor: '#ffff', boxShadow: '0 0 12px rgba(0, 0, 0, 0.5)', height: '80%', width: '40%'}}>
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <h2>Ticket Order Form</h2>
        <form 
          onClick={stopTheProp}
          onMouseDown={stopTheProp}
        >
          <div>
            <label>
              Event Name: {event.name}
            </label>
          </div>
          <div>
            <label>
              Quantity
            </label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type='integer'
              placeholder='How many tickets do you need?'
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
          </div>
        <button 
          type='submit'
          style={{backgroundColor: '#d1410c', color: '#ffff', borderColor: '#d1410c', borderRadius: '4px', cursor: 'pointer'}}
        >Checkout</button>
        </form>
      </div>
      <div>
      </div>
    </div>
  );
};

export default Checkout;