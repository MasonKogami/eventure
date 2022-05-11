import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './events.css';
import { readAllEvents } from '../../store/events';

const EventListings = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const events = useSelector(state => Object.values(state.events));

  useEffect(() => {
    dispatch(readAllEvents())
  }, [dispatch]);

  return (
    <>
      <ul>
        {events.map((event) => {
          <li key={event.id}>
            {event.name}
          </li>
        })}
      </ul>
    </>
  )
};

export default EventListings;