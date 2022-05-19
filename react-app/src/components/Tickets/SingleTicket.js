import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateTickets, deleteTickets } from '../../store/tickets';
import { readAllTickets } from '../../store/session';
import Checkout from "../Events/Checkout";
import Modal from '../Modal/Modal';
import ConfirmationModal from "../Modal/Confirmation";

const SingleTicket = ({ ticket, userId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState({});
  const [showCheckoutModal, setCheckoutModal] = useState(false);

  const removeTickets = async (ticket) => {
    await dispatch(deleteTickets(ticket));
  };

  // useEffect(() => {
  //   dispatch(readAllTickets(user));
  // }, [dispatch, user]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
      // if (user) {
      //   dispatch(readAllTickets(userId));
      // }
    })();


  }, [userId]);


  if (!user) {
    return null;
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