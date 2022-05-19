import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTickets, deleteTickets } from '../../store/tickets';
import Checkout from "../Events/Checkout";
import Modal from '../Modal/Modal';
import ConfirmationModal from "../Modal/Confirmation";

const SingleTicket = ({ user, ticket }) => {
  const dispatch = useDispatch();
  const [showCheckoutModal, setCheckoutModal] = useState(false);

  const removeTickets = async (ticket) => {
    await dispatch(deleteTickets(ticket));
  };

  const showCheckoutModalFunc = () => setCheckoutModal(true);
  const closeCheckoutModalFunc = () => setCheckoutModal(false);

  return (
    <div>
      <div>
        <label>
          {ticket.event_name}
        </label>
      </div>
      <div>
        <label>
          {ticket.quantity}
        </label>
      </div>
      <div>
        {<ConfirmationModal 
                message="Are you sure you want to refund these tickets?"
                actionButtonLabel="Refund Tickets"
                func={() => removeTickets(ticket)}
              >
            <button
              style={{marginRight: "12px"}}
            >Refund Tickets</button>
          </ConfirmationModal>
        }
      </div>
      <div>
        {<button onClick={showCheckoutModalFunc}>Update Ticket Quantity</button>}
          {showCheckoutModal && (
            <Modal closeModalFunc={closeCheckoutModalFunc} className='modal-background'>
              <Checkout style={{display: 'flex', justifyContent: 'center'}} closeModalFunc={closeCheckoutModalFunc} />
            </Modal>
          )}
      </div>
    </div>
  );
};

export default SingleTicket;