import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { readOneEvent } from '../../store/events';
import { addTickets } from '../../store/events';
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

    let newTickets = await dispatch(addTickets(tickets));
    if (newTickets) {
      setErrors(newTickets);
    } else {
      closeModalFunc();
      history.push(`/users/${sessionUser.id}`)
    }
  };

  const stopTheProp = e => e.stopPropagation();

  return (
    <div style={{backgroundColor: '#ffff', boxShadow: '0 0 12px rgba(0, 0, 0, 0.5)', minHeight: '400px', width: '75%', maxHeight: '750px'}}>
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <div style={{borderBottom: '2px solid #eeedf2', width: '100%', display: 'flex', justifyContent: 'center'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h2 style={{color: '#d1410c', fontSize: '30px', fontWeight: 'bolder', marginBottom: '15px'}}>Ticket Order Form</h2>
            <div style={{marginBottom: '2px'}}>
              <label>
                {event?.name}
              </label>
            </div>
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
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
          </div>
          <div style={{display: 'flex', justifyContent: 'center', marginLeft: '150px', marginRight: '150px'}}>
            <p style={{display: 'flex', justifyContent: 'center', verticalAlign: 'middle', textAlign: 'center'}}>Tell us how many tickets you need to start your next Eventure. Ticket orders are limited to 10 per order to allow everyone a chance!</p>
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{padding: '5px'}}>
              <label>
                Quantity
              </label>
            </div>
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
      <div style={{fontSize: '20px', fontWeight: 'bolder', display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '15px', color: '#d1410c'}}>
        <label>
          Order Summary:
        </label>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
        {quantity}x - {event.name}
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
        <button 
          type='submit'
          className='checkout-button1'
          disabled={submitError !== 'able'}
          style={{marginRight: '10px'}}
        >Checkout</button>
        <button
          className='checkout-button2'
          onClick={closeModalFunc}
        >Cancel</button>
      </div>
        </form>
      </div>
      {/* <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
        <label>
          Order Summary
        </label>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
        {quantity}x {event.name}
      </div> */}
    </div>
  );
};

export default Checkout;