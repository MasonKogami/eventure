import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './events.css';
import { readAllEvents } from '../../store/events';

const EventListings = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => Object.values(state.events));
  console.log(events);

  useEffect(() => {
    dispatch(readAllEvents())
  }, [dispatch]);

  return (
    <>
      <h3>Events</h3>
      <ul className='events'>
        {events.map((event) => {
          return (
            <li key={event.id} className='event-listing'>
              {event.name}
            </li>
          )
        })}
      </ul>
    </>
  )
};

export default EventListings;