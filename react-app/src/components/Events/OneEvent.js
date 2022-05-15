import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { readAllEvents, readOneEvent } from '../../store/events';

const OneEvent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const { eventId } = useParams();
  const events = useSelector(state => state.events);
  const event = useSelector(state => state.events[eventId]);
  // console.log(events)
  // console.log(event);

  useEffect(() => {
    dispatch(readOneEvent(eventId))
  }, [dispatch, eventId]);

  return (
    <div>
      <div>
        {event?.name}
      </div>
      <div>
        {event?.date}
      </div>
      <div>
        {event?.location_name}
      </div>
      <div>
      {event?.address}
      </div>
    </div>
  );
};

export default OneEvent;