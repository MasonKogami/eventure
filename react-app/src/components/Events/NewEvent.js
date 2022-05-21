import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createEvent } from '../../store/events';
import './NewEvent.css';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';

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

    let addressArr = address.split(',');
    
    let newEvent = {
      user_id: sessionUser.id,
      location_name: locationName.trim(),
      address,
      name: name.trim(),
      date: date.toUTCString(),
      capacity
    };

    let submitNewEvent = await dispatch(createEvent(newEvent));
    if (submitNewEvent) {
      setErrors(submitNewEvent);
    } else {
      console.log("hi")
      history.push("/home")
    }
  };

  return (
    <div className='new-event-form-con'>
      <form onSubmit={handleSubmit} className='new-event-form'>
      <h2 style={{color: '#d1410c', fontSize: '32px', fontWeight: 'bolder'}}>Event Form</h2>
        <div className='errors'>
          {errors?.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='basic-info-con'>
          <h2>Basic Info</h2>
          <p>Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.</p>
          <div style={{marginBottom: '10px'}}>
            <label>
              Event Name
            </label>
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            placeholder='Be clear and descriptive.'
            className='styled-input'
          ></input>
        </div>
        <hr style={{backgroundColor: '#eeedf2'}}/>
        <div className='location-con'>
          <h2>Location</h2>
          <p>Help people in the area discover your event and let attendees know where to show up.</p>
          <div style={{marginBottom: '10px'}}>
            <label>
              Location Name
            </label>
          </div>
          <input
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            type='text'
            placeholder='Venue Name'
            className='styled-input'
          ></input>
          <div>
            <div style={{marginBottom: '10px', marginTop: '10px'}}>
              <label>
                Address
              </label>
            </div>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder='Street address, City, State'
              required
              className='styled-input'
            >
            </input>
          </div>
        </div>
        <hr style={{backgroundColor: '#eeedf2'}}/>
        <div className='date-time-con'>
          <h2>Date</h2>
          <div style={{marginBottom: '10px'}}>
            <label>
              Tell event goers when your event starts and ends so they can make plans to attend.
            </label>
          </div>
          <DateTimePicker 
            selected={date}
            value={date}
            minDate={new Date()}
            disableClock={true}
            onChange={(e) => setDate(new Date(e))} 
          />
        </div>
        <div className='capacity-con'>
          <h2>Capacity</h2>
          <p>Tell the event goers how many people they can bring to the party.</p>
          <div style={{marginBottom: '10px'}}>
            <label>
              Capacity
            </label>
          </div>
          <input 
            value={capacity}
            placeholder='Number of people allowed.'
            onChange={(e) => setCapacity(e.target.value)}
            className='styled-input'
          >
          </input>
        </div>
        <button type='submit' className='create-event-button'>
          Create Event
        </button>
      </form>
    </div>
  )
};

export default NewEvent;