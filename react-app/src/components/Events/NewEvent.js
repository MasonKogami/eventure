import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createEvent } from '../../store/events';
import Calendar from 'react-calendar';
import './NewEvent.css';

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
      <form onSubmit={handleSubmit} className='new-event-form'>
        <ul>
          {errors.map((e) => {
            return (
              <li key={e}>{e}</li>
            )
          })}
        </ul>
        <div className='basic-info-con'>
          <h2>Basic Info</h2>
          <p>Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.</p>
          <div>
            <label>
              Event Name
            </label>
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            placeholder='Be clear and descriptive.'
          >
          </input>
        </div>
        <div className='location-con'>
          <h2>Location</h2>
          <p>Help people in the area discover your event and let attendees know where to show up.</p>
          <div>
            <label>
              Venue Location
            </label>
          </div>
          <input
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            type='text'
            placeholder='Be clear and descriptive.'
          ></input>
        </div>
        <div className='date-time-con'>
          <h2>Date and Time</h2>
          <label>
            Tell event goers when your event starts and ends so they can make plans to attend.
          </label>
          <Calendar>
            
          </Calendar>
        </div>
      </form>
    </div>
  )
};

export default NewEvent;