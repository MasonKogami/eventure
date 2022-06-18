import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTickets } from '../../store/tickets';
import EditTickets from "./EditTickets";
import Modal from '../Modal/Modal';
import ConfirmationModal from "../Modal/Confirmation";
import { loadTickets } from '../../store/tickets';
import { readAllEvents } from '../../store/events';
import'./SingleTicket.css';
import { useHistory, useParams } from 'react-router-dom';
import  { MdKeyboardBackspace } from 'react-icons/md';

const SingleTicket = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { ticketId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const tickets = useSelector(state => Object.values(state.tickets));
  const ticket = tickets.find(ticket => ticket.id === +ticketId);
  const [showCheckoutModal, setCheckoutModal] = useState(false);
  // console.log(tickets);
  // console.log(ticket);

  useEffect(() => {
    dispatch(loadTickets(sessionUser.id));
    dispatch(readAllEvents())
  }, [dispatch, sessionUser.id]);
  
  const removeTickets = async (ticket) => {
    await dispatch(deleteTickets(ticket));
  };

  const showCheckoutModalFunc = () => setCheckoutModal(true);
  const closeCheckoutModalFunc = () => setCheckoutModal(false);

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
        <div className='ticket-name'>
          {ticket?.event_name}
        </div>
        <div className='ticket-quantity'>
          {ticket?.quantity}
        </div>
        <div className='refund-tickets'>
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
      </div>
    </div>
  );
};

export default SingleTicket;