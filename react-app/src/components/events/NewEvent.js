import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createEvent } from '../../store/events';

const NewEvent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const [locationName, setLocationName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pattern = /\S+/;

    if (!pattern.test(name)) return;

    let newEvent = {
      locationName,
      address,
      city,
      state,
      name: name.trim(),
      date,
      capacity
    };

    let submitNewEvent = await dispatch(createEvent(newEvent));

    history.push(`/events/${submitNewEvent.id}`);
  };

  return (
    <div className='new-event-form-con'>
      <form onSubmit={handleSubmit}>

      </form>
    </div>
  )
};

export default NewEvent;