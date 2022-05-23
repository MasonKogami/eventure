import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTickets } from '../../store/tickets';
import EditTickets from "./EditTickets";
import Modal from '../Modal/Modal';
import ConfirmationModal from "../Modal/Confirmation";
import'./SingleTicket.css';

const SingleTicket = ({ ticketEvent, ticket }) => {
  const dispatch = useDispatch();
  const [showCheckoutModal, setCheckoutModal] = useState(false);
  
  const removeTickets = async (ticket) => {
    await dispatch(deleteTickets(ticket));
  };

  const showCheckoutModalFunc = () => setCheckoutModal(true);
  const closeCheckoutModalFunc = () => setCheckoutModal(false);

  return (
    <div className='singleticket-con'>
      <div className='ticket-name'>
        {ticket.event_name}
      </div>
      <div className='ticket-quantity'>
        {ticket.quantity}
      </div>
      <div className='refund-tickets'>
        {<ConfirmationModal 
                message="Are you sure you want to refund these tickets?"
                actionButtonLabel="Refund Tickets"
                func={() => removeTickets(ticket)}
              >
            <button
              style={{ fontSize: '12px', cursor: 'pointer', backgroundColor: '#d1410c', color: '#ffff', borderRadius: '4px', border: '1px solid #d1410c', height: '30px', width: '110px', marginTop: '10px'}}
            >Refund Tickets</button>
          </ConfirmationModal>
        }
      </div>
      <div className='update-tickets'>
        {<button style={{ fontSize: '12px', cursor: 'pointer', backgroundColor: '#d1410c', color: '#ffff', borderRadius: '4px', border: '1px solid #d1410c', height: '30px', width: '110px', marginTop: '10px'}} onClick={showCheckoutModalFunc}>Update Tickets</button>}
          {showCheckoutModal && (
            <Modal closeModalFunc={closeCheckoutModalFunc} className='modal-background'>
              <EditTickets ticketEvent={ticketEvent} ticket={ticket} style={{justifyContent: 'center'}} closeModalFunc={closeCheckoutModalFunc} />
            </Modal>
          )}
      </div>
    </div>
  );
};

export default SingleTicket;