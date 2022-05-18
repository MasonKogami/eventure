import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { readOneEvent } from '../../store/events';
import { addTickets } from '../../store/events';
import Modal from '../Modal/Modal';

const Checkout = ({ closeModalFunc }) => {
  const dispatch = useDispatch();
  const history  = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const { eventId } = useParams();
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

  return (
    <div>
      <p>Your next Eventure awaits!</p>
      <button>Checkout</button>
      <form>

      </form>
    </div>
  );
};

export default Checkout;