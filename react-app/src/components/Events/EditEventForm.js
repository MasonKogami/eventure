import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateEvent } from '../../store/events';
// import DateTimePicker from 'react-datetime-picker';
// import 'react-datetime-picker/dist/DateTimePicker.css';
import './EditEventForm.css';
import DatePicker from 'react-date-picker';
import "react-datepicker/dist/react-datepicker.css";

const EditEventForm = ({ closeModalFunc }) => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const event = useSelector(state => state.events[eventId]);
  const [locationName, setLocationName] = useState(event.location_name);
  const [address, setAddress] = useState(event.address);
  const [name, setName] = useState(event.name);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const [date, setDate] = useState(new Date(event.date));
  const [description, setDescription] = useState(event.description);
  const [errors, setErrors] = useState([]);

  const editOneEvent = async (e) => {
    e.preventDefault();

    const pattern = /\S+/;
    if (!pattern.test(name)) return;
    if (!pattern.test(locationName)) return;

    let updatedEvent = {
      user_id: sessionUser.id,
      location_name: locationName.trim(),
      address,
      name: name.trim(),
      date: date.toUTCString(),
      description,
    };

    let data = await dispatch(updateEvent(updatedEvent, eventId));
    if (data) {
      setErrors(data);
    } else {
      closeModalFunc();
    }
  };

  const stopTheProp = e => e.stopPropagation();

  return (
    <div className='edit-modal-form-con'>
      <form 
        onSubmit={editOneEvent}
        onClick={stopTheProp}
        onMouseDown={stopTheProp}
        className="edit-modal-form"
      >
        <div className='errors'>
          {errors?.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
        <div>
          <h2 style={{color: '#d1410c', fontWeight: 'bolder', marginTop: '0px', marginBottom: '0px'}}>Event Name</h2>
          <p style={{marginTop: '5px', marginBottom: '5px'}}>Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.</p>
          <div style={{marginBottom: '5px'}}>
            <label>
              Event Name
            </label>
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            placeholder='Be clear and descriptive.'
            className='styled-inputs'
            required
          ></input>
        </div>
        <div>
          <h2 style={{color: '#d1410c', fontWeight: 'bolder', marginTop: '10px', marginBottom: '0px'}}>Location</h2>
          <p style={{marginTop: '5px', marginBottom: '5px'}}>Help people in the area discover your event and let attendees know where to show up.</p>
          <div style={{marginBottom: '5px'}}>
            <label>
              Location Name
            </label>
          </div>
          <input
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            type='text'
            placeholder='Venue Name'
            style={{marginBottom: '10px'}}
            className='styled-inputs'
            required
          ></input>
          <div>
            <div style={{marginBottom: '5px'}}>
              <label>
                Address
              </label>
            </div>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder='Street address, City, State'
              className='styled-inputs'
              required
            >
            </input>
          </div>
        </div>
        <div>
          <h2 style={{color: '#d1410c', fontWeight: 'bolder', marginTop: '10px', marginBottom: '0px'}}>Date</h2>
          <div style={{marginBottom: '5px'}}>
            <label>
              Tell event goers when your event starts and ends so they can make plans to attend.
            </label>
          </div>
          <div>
            {/* <DateTimePicker 
              selected={date}
              value={date}
              minDate={new Date()}
              disableClock={true}
              onChange={(e) => setDate(new Date(e))} 
            /> */}
            <DatePicker
            selected={date}
            minDate={tomorrow} 
            value={date}
            onChange={(e) => {
              console.log(e)
              setDate(e)}}
            />
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
        </div>
        <div>
          <h2 style={{color: '#d1410c', fontWeight: 'bolder', marginTop: '10px', marginBottom: '0px'}}>Description</h2>
          <p style={{marginTop: '5px', marginBottom: '5px'}}>Tell the event goers what your event is all about!</p>
          <div style={{marginBottom: '5px'}}>
            <label>
              Description
            </label>
          </div>
          <textarea 
            value={description}
            placeholder='Add a description.'
            onChange={(e) => setDescription(e.target.value)}
            style={{resize: 'none', height: '100px', width: '800px'}}
            className='styled-inputs'
            required
          >
          </textarea>
        </div>
        <button type='submit' className='update-event-btn'>
          Update Event
        </button>
        <button
          onClick={() => closeModalFunc()}
          className='cancel-edit-btn'
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditEventForm;