import React, { useState } from 'react';
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
  const [capacity, setCapacity] = useState(event.capacity);
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
      capacity,
    };

    let newEvent = await dispatch(updateEvent(updatedEvent, eventId));
    if (newEvent.errors) {
        setErrors(newEvent.errors);
    } else {
      closeModalFunc();
    }
  };

  const stopTheProp = e => e.stopPropagation();

  return (
    <div className='edit-modal-form'>
      <form 
        onSubmit={editOneEvent}
        onClick={stopTheProp}
        onMouseDown={stopTheProp}
      >
        <ul>
          {errors.map((e) => {
            return (
              <li key={e.id}>{e}</li>
            )
          })}
        </ul>
        <div>
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
        <div>
          <h2>Location</h2>
          <p>Help people in the area discover your event and let attendees know where to show up.</p>
          <div>
            <label>
              Location Name
            </label>
          </div>
          <input
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            type='text'
            placeholder='Venue Name'
          ></input>
          <div>
            <label>
              Address
            </label>
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
          <h2>Date</h2>
          <label>
            Tell event goers when your event starts and ends so they can make plans to attend.
          </label>
          <div>
            <DateTimePicker 
              selected={date}
              value={date}
              minDate={new Date()}
              onChange={(e) => setDate(new Date(e))} 
            />
          </div>
        </div>
        <div>
          <h2>Capacity</h2>
          <p>Tell the event goers how many people they can bring to the party.</p>
          <label>
            Capacity
          </label>
          <input 
            value={capacity}
            placeholder='Number of people allowed.'
            onChange={(e) => setCapacity(e.target.value)}
          >
          </input>
        </div>
        <button type='submit'>
          Update Event
        </button>
        <button
          onClick={closeModalFunc}>
            Cancel
        </button>
      </form>
    </div>
  );
};

export default EditEventForm;