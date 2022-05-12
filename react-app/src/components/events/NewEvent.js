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

    let submitNewEvent = await dispatch(createEvent(newEvent))
    .catch( async (res) => {
      const data = await res.json();
      if (data && data.errors) {
          setErrors(data.errors);
      }
  })
    if (errors.length && submitNewEvent) {
      history.push(`/events/${submitNewEvent.id}`);
    }
  };

  return (
    <div className='new-event-form-con'>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((e) => {
            return (
              <li key={e}>{e}</li>
            )
          })}
        </ul>
        <div>
          <h1>Basic Info</h1>
          <label>
            Event Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            placeholder='Event Name'
          >
          </input>
        </div>
        <div>
          Location
          <label>
            Venue Location
          </label>
          <input
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            type='text'
            placeholder='Event Name'
          ></input>
        </div>
        <div>
          Date and Time
          <label>
            Tell event goers when your event starts and ends so they can make plans to attend.
          </label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
          >
          </input>
        </div>
      </form>
    </div>
  )
};

export default NewEvent;