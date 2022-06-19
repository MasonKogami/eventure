import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { oneTicket, deleteTickets } from '../../store/tickets';
import EditTickets from "./EditTickets";
import Modal from '../Modal/Modal';
import ConfirmationModal from "../Modal/Confirmation";
import { readAllEvents } from '../../store/events';
import'./SingleTicket.css';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import  { MdKeyboardBackspace } from 'react-icons/md';

const SingleTicket = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { ticketId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  // const tickets = useSelector(state => Object.values(state.tickets));
  const ticket = useSelector(state => state.tickets[ticketId]);
  // const ticket = tickets.find(ticket => ticket.id === +ticketId);
  const [showCheckoutModal, setCheckoutModal] = useState(false);
  // const [quantity, setQuantity] = useState(ticket?.quantity);
  // const [errors, setErrors] = useState([]);
  const event = useSelector(state => state.events[ticket?.event_id]);
  // console.log(tickets);
  // console.log(quantity);
  // console.log(ticket);

  useEffect(() => {
    // dispatch(loadTickets(sessionUser.id));
    dispatch(oneTicket(ticketId))
    dispatch(readAllEvents())
  }, [dispatch, sessionUser.id, ticketId]);
  
  const removeTickets = async (ticket) => {
    await dispatch(deleteTickets(ticket));
  };

  const showCheckoutModalFunc = () => setCheckoutModal(true);
  const closeCheckoutModalFunc = () => setCheckoutModal(false);
  // const displayEditForm = () => {
  //   document.getElementById('edit-btn').style.display = 'none';
  //   document.getElementById('edit-form').style.display = 'block';
  //   document.getElementById('cancel-edit-form').style.display = 'block';
  // };

  // const closeEditForm = () => {
  //   document.getElementById('cancel-edit-form').style.display = 'none';
  //   document.getElementById('edit-form').style.display = 'none';
  //   document.getElementById('edit-btn').style.display = 'block';
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const tickets = {
  //     id: ticket.id,
  //     user_id: sessionUser.id,
  //     event_id: event.id,
  //     event_name: event.name,
  //     quantity
  //   };

  //   let newTickets = await dispatch(updateTickets(tickets));
  //   if (newTickets) {
  //     setErrors(newTickets);
  //   } else {
      // closeModalFunc();
      // document.getElementById('edit-form').style.display = 'none';
      // document.getElementById('edit-btn').style.display = 'block';
  //     history.push(`/users/${sessionUser.id}`)
  //   }
  // };

  return (
    <div className='single-ticket-page'>
      <div
        type='button'
        className='back-to-orders'
        onClick={() => history.push(`/users/${ticket?.user_id}`)}
      >
      <MdKeyboardBackspace style={{marginRight: '5px'}}/>
        Back to Orders
      </div>
      <div className='singleticket-con'>
        <div style={{height: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
          <NavLink to={`/events/${event?.id}`} className='ticket-name'>
            {ticket?.event_name}
          </NavLink>
          <div>
            <div style={{fontSize: '16px'}}>
              {`Order #${ticket?.id} - ${ticket?.quantity} ticket(s)`}
            </div>
            <div>
              {`Event Date: ${event?.date.slice(0, 16)}`}
            </div>
            <div>
              {event?.address.split(',').slice(1).join(',')}
            </div>
          </div>
        </div>
        <hr style={{borderTop: '1px solid #DBDAE3', width: '85.5%', position: 'relative', right: '108px'}}/>
        <div className='refund-tickets' style={{width: '20px'}}>
          {<ConfirmationModal 
                  message="Are you sure you want to refund these tickets?"
                  actionButtonLabel="Refund Tickets"
                  func={() => {
                    removeTickets(ticket)
                    history.push(`/users/${ticket?.user_id}`)
                  }}
                >
              <button
                style={{ fontSize: '12px', cursor: 'pointer', backgroundColor: '#d1410c', color: '#ffff', borderRadius: '4px', border: '1px solid #d1410c', height: '30px', width: '110px', marginTop: '10px'}}
              >Refund</button>
            </ConfirmationModal>
          }
        </div>
        <div className='update-tickets'>
          {<button style={{ fontSize: '12px', cursor: 'pointer', backgroundColor: '#d1410c', color: '#ffff', borderRadius: '4px', border: '1px solid #d1410c', height: '30px', width: '110px', marginTop: '8px'}} onClick={showCheckoutModalFunc}>Update</button>}
            {showCheckoutModal && (
              <Modal closeModalFunc={closeCheckoutModalFunc} className='modal-background-edit'>
                <EditTickets ticket={ticket} style={{justifyContent: 'center'}} closeModalFunc={closeCheckoutModalFunc} />
              </Modal>
            )}
        </div>
        {/* <button id='edit-btn' style={{width: '77px'}} onClick={() => displayEditForm()}>Edit Order</button>
        <form
          id='edit-form'
          onSubmit={handleSubmit}
          style={{display: 'none'}}
        >
          <div>
            {errors?.map((error, ind) => (
              <div style={{color: '#d1410c'}} key={ind}>{error}</div>
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
              onChange={(e) => {
                console.log(e.target.value)
                setQuantity(e.target.value)}}
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
            {quantity}x - {event?.name}
          </div>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
            <button 
              type='submit'
              className='checkout-button1'
              // disabled={submitError !== 'able'}
              style={{marginRight: '10px'}}
            >Checkout</button>
          </div>
        </form>
        <button
          id='cancel-edit-form'
          style={{display: 'none', width: '60px', display: 'flex'}}
          className='checkout-button2'
          onClick={closeEditForm}
        >Cancel</button> */}
        {/* <div>
          {ticket?.event_name}
        </div> */}
      </div>
      <div
        type='button'
        className='back-to-orders2'
        onClick={() => history.push(`/users/${ticket?.user_id}`)}
      >
      <MdKeyboardBackspace style={{marginRight: '5px'}}/>
        Back to Orders
      </div>
    </div>
  );
};

export default SingleTicket;