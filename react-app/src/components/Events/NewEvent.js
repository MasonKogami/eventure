import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createEvent } from '../../store/events';
import './NewEvent.css';
// import DateTimePicker from 'react-datetime-picker';
// import 'react-datetime-picker/dist/DateTimePicker.css';
import DatePicker from 'react-date-picker';
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaMapPin } from 'react-icons/fa';
import { BsFillFileEarmarkTextFill } from 'react-icons/bs';
import { FaLightbulb } from 'react-icons/fa';

const NewEvent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [locationName, setLocationName] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const today = new Date();
  const tomorrow = new Date();
  // console.log(tomorrow.getHours() + 1)
  tomorrow.setDate(today.getDate() + 1);
  // console.log(today.toLocaleDateString())
  // console.log(tomorrow.toLocaleDateString())
  // tomorrow.setHours(today.getHours() + 1)
  const [date, setDate] = useState(tomorrow);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pattern = /\S+/;

    if (!pattern.test(name)) return;
    if (!pattern.test(locationName)) return;

    // let addressArr = address.split(',');
    
    let newEvent = {
      user_id: sessionUser.id,
      location_name: locationName.trim(),
      address,
      name: name.trim(),
      date: date.toString().slice(0, 16),
      description
    };

    let submitNewEvent = await dispatch(createEvent(newEvent));
    if (submitNewEvent) {
      setErrors(submitNewEvent);
    } else {
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
          <FaLightbulb />
          <h2>Event Name</h2>
          <p style={{marginBottom: '0px', marginTop: '2.5px'}}>Name your event and tell event-goers why they should come.</p>
          <p style={{marginTop: '0px'}}>Add details that highlight what makes it unique.</p>
          <div style={{marginBottom: '10px'}}>
            <label>
              Event Name
            </label>
            <label style={{fontSize: '12px', color: '#d1410c', marginLeft: '8px'}}>
              Required *
            </label>
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            placeholder='Be clear and descriptive.'
            className='styled-input'
            required
          ></input>
        </div>
        <hr style={{backgroundColor: '#eeedf2'}}/>
        <div className='location-con'>
          <FaMapPin />
          <h2>Location</h2>
          <p style={{width: '900px'}}>Help people in the area discover your event and let attendees know where to show up.</p>
          <div style={{marginBottom: '10px'}}>
            <label>
              Location Name
            </label>
            <label style={{fontSize: '12px', color: '#d1410c', marginLeft: '8px'}}>
              Required *
            </label>
          </div>
          <input
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            type='text'
            placeholder='Venue Name'
            className='styled-input'
            required
          ></input>
          <div>
            <div style={{marginBottom: '10px', marginTop: '10px'}}>
              <label>
                Address
              </label>
              <label style={{fontSize: '12px', color: '#d1410c', marginLeft: '8px'}}>
              Required *
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
          <FaCalendarAlt />
          <h2>Date</h2>
          <div style={{marginBottom: '10px'}}>
            <p style={{width: '650px'}}>
              Tell event goers when your event starts and ends so they can make plans to attend.
            </p>
            <label style={{fontSize: '12px', color: '#d1410c', marginLeft: '0px'}}>
              Required *
            </label>
          </div>
          {/* <input
            type='date'
            min={`${today}`}
            // value={tomorrow}
            onChange={(e) => setDate(e)}
            pattern="\d{4}-\d{2}-\d{2}"
          >
          </input> */}
          <DatePicker
            selected={tomorrow}
            minDate={tomorrow} 
            value={tomorrow}
            onChange={(e) => {
              console.log(e)
              setDate(e)}}
          />
          {/* <DateTimePicker 
            name='react-datetime'
            selected={date}
            value={date}
            minDate={tomorrow}
            disableClock={true}
            onChange={(e) => setDate(new Date(e))}
            /> */}
            
          {/* <select style={{height: '29.5px', width: '80px', marginLeft: '25px', borderRadius: '0px', fontWeight: 'bold', position: 'relative', bottom: '1px'}}>
            <option>8:00 AM</option>
            <option>9:00 AM</option>
            <option>10:00 AM</option>
            <option>11:00 AM</option>
            <option>12:00 PM</option>
            <option>1:00 PM</option>
            <option>2:00 PM</option>
            <option>3:00 PM</option>
            <option>4:00 PM</option>
            <option>5:00 PM</option>
            <option>6:00 PM</option>
            <option>7:00 PM</option>
            <option>8:00 PM</option>
            <option>9:00 PM</option>
            <option>10:00 PM</option>
          </select> */}
        </div>
        <div className='description-con'>
          <BsFillFileEarmarkTextFill  />
          <h2>Description</h2>
          <p>Tell the event goers what your event is all about.</p>
          <div style={{marginBottom: '10px'}}>
            <label>
              Description
            </label>
            <label style={{fontSize: '12px', color: '#d1410c', marginLeft: '8px'}}>
              Required *
            </label>
          </div>
          <textarea 
            value={description}
            placeholder='Add a description.'
            onChange={(e) => setDescription(e.target.value)}
            className='styled-textarea'
            required
          >
          </textarea>
        </div>
        <button type='submit' className='create-event-button'>
          Create Event
        </button>
      </form>
    </div>
  )
};

export default NewEvent;