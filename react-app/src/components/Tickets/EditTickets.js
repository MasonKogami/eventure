import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
import { oneTicket, updateTickets } from '../../store/tickets';
import './EditTickets.css';

const EditTickets = ({ ticket, closeModalFunc }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const event = useSelector(state => state.events[ticket.event_id]);
  // const { ticketId } = useParams();
  const [quantity, setQuantity] = useState(ticket?.quantity);
  const [errors, setErrors] = useState([]);
  const [submitError, setSubmitError] = useState('disabled');

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
      id: ticket.id,
      user_id: sessionUser.id,
      event_id: event.id,
      event_name: ticket?.event_name,
      quantity
    };

    let newTickets = await dispatch(updateTickets(tickets));
    if (newTickets) {
      setErrors(newTickets);
    } else {
      dispatch(oneTicket(ticket.id))
      .then(() => closeModalFunc())
    }
  };

  const stopTheProp = e => e.stopPropagation();

  return (
    <div className='edit-tickets-con'>
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <div style={{borderBottom: '2px solid #eeedf2', width: '100%', display: 'flex', justifyContent: 'center', boxShadow: '0 5px 12px (0, 0, 0, .5)'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h2 style={{color: '#d1410c', fontSize: '30px', fontWeight: 'bolder', marginBottom: '15px'}}>Ticket Order Form</h2>
            <div style={{marginBottom: '2px'}}>
              <label>
                {ticket?.event_name}
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
          style={{height: '250px', backgroundColor: '#ffff', boxShadow: '0 5px 12px (0, 0, 0, .5)'}}
        >
          <div className='edit-errors'>
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
            {quantity}x - {ticket?.event_name}
          </div>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
            <button 
              type='submit'
              className='edit-button1'
              disabled={submitError !== 'able'}
              style={{marginRight: '10px'}}
            >Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTickets;