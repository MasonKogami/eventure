import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { readOneEvent } from '../../store/events';
import { addTickets } from '../../store/events';
// import Modal from '../Modal/Modal';
import './Checkout.css';

const Checkout = ({ closeModalFunc }) => {
  const dispatch = useDispatch();
  const history  = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const { eventId } = useParams();
  const event = useSelector(state => state.events[eventId]);
  const [quantity, setQuantity] = useState(0);
  const [errors, setErrors] = useState([]);
  const [submitError, setSubmitError] = useState('disabled');

  useEffect(() => {
    dispatch(readOneEvent(eventId))
  }, [dispatch, eventId]);

  useEffect(() => {
    if (quantity !== 0) {
      setSubmitError('able');
    } else {
      setSubmitError('disabled');
    }
  }, [quantity]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tickets = {
      user_id: sessionUser.id,
      event_id: event.id,
      event_name: event.name,
      quantity
    };

    console.log(tickets);

    let newTickets = await dispatch(addTickets(tickets));
    if (newTickets.errors) {
      setErrors(newTickets.errors);
    } else {
      // alert(`Success! You have acquired tickets to ${event.name}!`)
      closeModalFunc();
      history.push(`/users/${sessionUser.id}`)
    }
  };

  const stopTheProp = e => e.stopPropagation();

  return (
    <div style={{backgroundColor: '#ffff', boxShadow: '0 0 12px rgba(0, 0, 0, 0.5)', height: '80%', width: '40%'}}>
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <div style={{borderBottom: '2px solid #eeedf2', width: '100%', display: 'flex', justifyContent: 'center'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h2 style={{color: '#d1410c'}}>Ticket Order Form</h2>
            <label>
              {event?.name}
            </label>
            <div>
              <label>
                {event?.date}
              </label>
            </div>
          </div>
        </div>
        <form 
          onClick={stopTheProp}
          onMouseDown={stopTheProp}
          onSubmit={handleSubmit}
        >
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
          className='checkout-button1'
          disabled={submitError !== 'able'}
        >Checkout</button>
        </form>
        <button
          className='checkout-button2'
          onClick={closeModalFunc}
        >Cancel</button>
      </div>
      <div>
      </div>
    </div>
  );
};

export default Checkout;