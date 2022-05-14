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
      <div className='event-div'>
        <h3>Events Near You</h3>
      </div>
      <div className='event-feed'>
        <div className='events'>
          {events.map((event) => {
            return (
              <NavLink to={`/events/${event.id}`} className='event-listings'>
                <div>
                </div>
                <div>
                  {event.name}
                </div>
                <div>
                  {event.date}
                </div>
                <div>
                  {event.location_name}
                </div>
                <div>
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