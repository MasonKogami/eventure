import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { updateEvent } from '../../store/events';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import './EditEventForm.css';

const EditEventForm = ({ closeModalFunc }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { eventId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const event = useSelector(state => state.events[eventId]);
  const [locationName, setLocationName] = useState(event.location_name);
  const [address, setAddress] = useState(event.address);
  const [name, setName] = useState(event.name);
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
          <h2 style={{color: '#d1410c', fontWeight: 'bolder', marginTop: '0px', marginBottom: '0px'}}>Basic Info</h2>
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
          <h2 style={{color: '#d1410c', fontWeight: 'bolder', marginTop: '10px', marginBottom: '0px'}}>Date</h2>
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
            style={{height: '100px', width: '500px'}}
          >
          </textarea>
        </div>
        <button type='submit' style={{ fontSize: '12px', cursor: 'pointer', backgroundColor: '#d1410c', color: '#ffff', borderRadius: '4px', border: '1px solid #d1410c', height: '30px', width: '90px', marginTop: '10px'}}>
          Update Event
        </button>
      </form>
      <button
        onClick={() => history.push(`/events/${eventId}`)}
        className='cancel-edit-modal'
        style={{cursor: 'pointer', backgroundColor: '#d1410c', color: '#ffff', borderRadius: '4px', border: '1px solid #d1410c', height: '30px', width: '60px', marginLeft: '10px'}}
      >
        Cancel
      </button>
    </div>
  );
};

export default EditEventForm;