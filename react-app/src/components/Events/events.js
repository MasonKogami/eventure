import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './events.css';
import { readAllEvents } from '../../store/events';
import { NavLink } from 'react-router-dom';

const EventListings = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => Object.values(state.events));
  // console.log(events)

  useEffect(() => {
    dispatch(readAllEvents())
  }, [dispatch]);

  return (
    <>
      <div className='event-div'>
        <h3>Eventures Near You</h3>
      </div>
      <div className='event-feed'>
        <div className='events'>
          {events.map((event) => {
            return (
              <NavLink to={`/events/${event.id}`} className='event-listings' key={event.id}>
                <div style={{color: 'black'}}>
                  {event.name}
                </div>
                <div style={{color: 'orange'}}>
                  {event.date}
                </div>
                <div style={{color: 'gray'}}>
                  {event.location_name}
                </div>
                <div style={{color: 'gray'}}>
                  {event.address}
                </div>
              </NavLink>
            )
          })}
        </div>
      </div>
    </>
  )
};

export default EventListings;