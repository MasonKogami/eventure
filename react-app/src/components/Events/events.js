import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './events.css';
import { readAllEvents } from '../../store/events';
import { NavLink } from 'react-router-dom';

const EventListings = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => Object.values(state.events));
  console.log(events)

  useEffect(() => {
    dispatch(readAllEvents())
  }, [dispatch]);

  // const EventListing = ({event}) => {
  //   return (
  //     <div>
  //       <NavLink to={`/events/${event.id}`} />
  //     </div>
  //   )
  // }

  return (
    <>
      <h3>Events</h3>
      <ul className='events'>
        {events.map((event) => {
          return (
            <NavLink to={`/events/${event.id}`} className='event-listings'>
              {event.name}
            </NavLink>
          )
        })}
      </ul>
    </>
  )
};

export default EventListings;