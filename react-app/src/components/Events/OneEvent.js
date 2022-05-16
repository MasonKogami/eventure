import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { readOneEvent, deleteEvent } from '../../store/events';
import './OneEvent.css';

const OneEvent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const { eventId } = useParams();
  const event = useSelector(state => state.events[eventId]);
  // console.log(events)
  // console.log(event);
  console.log(sessionUser);

  useEffect(() => {
    dispatch(readOneEvent(eventId))
  }, [dispatch, eventId]);

  const deleteOneEvent = async (event) => {
    await dispatch(deleteEvent(event));
    history.push("/home"); // timing issue
};

  return (
    <div>
      <div className='bg-image-header'></div>
      <div className='header-div'>
        <div>
          <img src='https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F230834389%2F285623250502%2F1%2Foriginal.20210604-004626?w=600&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=f94e8cdbce75497cb7ede588ea34da22' />
        </div>
        <div>
          {event?.name}
          {event?.date}
        </div>
        <div>
          <p>By {sessionUser.username}</p>
        </div>
        <div>
          <button>Edit Event</button>
        </div>
        <div>
          {(sessionUser.id === event?.host_id) && <button onClick={() => deleteOneEvent(event)}>Delete Event</button>}
        </div>
      </div>
      <div>
        {event?.location_name}
        {event?.address}
      </div>
    </div>
  );
};

export default OneEvent;