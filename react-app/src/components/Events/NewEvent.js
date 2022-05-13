import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createEvent } from '../../store/events';
import Calendar from 'react-calendar';
import './NewEvent.css';
import 'react-calendar/dist/Calendar.css';

const NewEvent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [locationName, setLocationName] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [capacity, setCapacity] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pattern = /\S+/;

    if (!pattern.test(name)) return;
    if (!pattern.test(locationName)) return;

    let newEvent = {
      locationName: locationName.trim(),
      address,
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
          ></input>
        </div>
        <hr style={{backgroundColor: '#eeedf2'}}/>
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
        <hr style={{backgroundColor: '#eeedf2'}}/>
        <div className='date-time-con'>
          <h2>Date</h2>
          <label>
            Tell event goers when your event starts and ends so they can make plans to attend.
          </label>
          {/* <input 
            type='date' 
            value={date}
            min=''
            max=''
            placeholder='today'
            required
            onChange={(e) => setDate(e.target.value)}
          >
          </input> */}
          <Calendar onChange={setDate} value={date}/>
        </div>
        <button type='submit' className='create-event-button'>
          Create Event
        </button>
      </form>
    </div>
  )
};

export default NewEvent;