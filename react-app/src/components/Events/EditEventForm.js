import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateEvent } from '../../store/events';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import './EditEventForm.css';

const EditEventForm = ({ closeModalFunc }) => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const event = useSelector(state => state.events[eventId]);
  const [locationName, setLocationName] = useState(event.location_name);
  const [address, setAddress] = useState(event.address);
  const [name, setName] = useState(event.name);
  const [date, setDate] = useState(new Date(event.date));
  const [description, setDescription] = useState(event.description);
  const [errors, setErrors] = useState([]);

  // if (locationName.length < 2) {
  //   errors.push("Venue names must be longer than 2 characters.")
  // } else if (locationName.length > 30) {
  //   errors.push("Venue names must be 30 characters or less.")
  // }

  // if (address.length < 20) {
  //   errors.push("Address must be longer than 20 characters.")
  // } else if (address.length > 50) {
  //   errors.push("Address must be 50 characters or less.")
  // }

  // if (name.length < 2) {
  //   errors.push("Event names must be longer than 2 characters.")
  // } else if (name.length > 30) {
  //   errors.push("Event names must be 30 characters or less.")
  // }

  // if (description < 10) {
  //   errors.push("An event must allow at least 10 people to attend an event.")
  // } else if (description > 1000000) {
  //   errors.push("An event description cannot exceed 100,000.")
  // };

  const editOneEvent = async (e) => {
    e.preventDefault();

    const pattern = /\S+/;
    if (!pattern.test(name)) return;
    if (!pattern.test(locationName)) return;

    console.log(locationName)
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
          <h2 style={{color: '#d1410c', fontWeight: 'bolder', marginTop: '0px'}}>Basic Info</h2>
          <p>Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.</p>
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
          ></input>
        </div>
        <div>
          <h2 style={{color: '#d1410c', fontWeight: 'bolder', marginTop: '10px'}}>Location</h2>
          <p>Help people in the area discover your event and let attendees know where to show up.</p>
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
              required
            >
            </input>
          </div>
        </div>
        <div>
          <h2 style={{color: '#d1410c', fontWeight: 'bolder', marginTop: '10px'}}>Date</h2>
          <div style={{marginBottom: '5px'}}>
            <label>
              Tell event goers when your event starts and ends so they can make plans to attend.
            </label>
          </div>
          <div>
            <DateTimePicker 
              selected={date}
              value={date}
              minDate={new Date()}
              disableClock={true}
              onChange={(e) => setDate(new Date(e))} 
            />
          </div>
        </div>
        <div>
          <h2 style={{color: '#d1410c', fontWeight: 'bolder', marginTop: '10px'}}>Description</h2>
          <p>Tell the event goers what your event is all about!</p>
          <div style={{marginBottom: '5px'}}>
            <label>
              Description
            </label>
          </div>
          <textarea 
            value={description}
            placeholder='Add a description.'
            onChange={(e) => setDescription(e.target.value)}
            style={{height: '100px', width: '500px'}}
          >
          </textarea>
        </div>
        <button type='submit' style={{ fontSize: '12px', cursor: 'pointer', backgroundColor: '#d1410c', color: '#ffff', borderRadius: '4px', border: '1px solid #d1410c', height: '30px', width: '90px', marginTop: '10px'}}>
          Update Event
        </button>
        <button
          onClick={closeModalFunc}
          style={{cursor: 'pointer', backgroundColor: '#d1410c', color: '#ffff', borderRadius: '4px', border: '1px solid #d1410c', height: '30px', width: '60px', marginLeft: '10px'}}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditEventForm;