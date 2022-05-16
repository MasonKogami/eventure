import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateEvent } from '../../store/events';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';

const EditEventForm = ({ closeModalFunc }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { eventId } = useParams();
  const event = useSelector(state => state.events[eventId]);

  return (
    <div>
          <form>
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
            <div className='location-con'>
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
            <div className='date-time-con'>
              <h2>Date</h2>
              <label>
                Tell event goers when your event starts and ends so they can make plans to attend.
              </label>
              <DateTimePicker 
                selected={date}
                value={date}
                minDate={new Date()}
                // format='y-MM-dd'
                onChange={(e) => {
                  console.log(e)
                  setDate(new Date(e))}} 
              />
            </div>
            <div className='capacity-con'>
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
            <button type='submit' className='create-event-button'>
              Update Event
            </button>
          </form>
        </div>
  );
};

export default EditEventForm;