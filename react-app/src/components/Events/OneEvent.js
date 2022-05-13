import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { readOneEvent } from '../../store/events';

const OneEvent = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const { eventId } = useParams();
  const events = useSelector(state => state.events);
  const event = useSelector(state => state.events[eventId]);

  console.log(events)
  console.log(event);

  useEffect(() => {
    dispatch(readOneEvent(eventId))
  }, [dispatch, eventId]);

  return (
    <div>
      <img>
        Insert Image Here
      </img>
    </div>
  );
};

export default OneEvent;