import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './events.css';
import { readAllEvents } from '../../store/events';
import { NavLink } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { grabLikes, createLike, removeLike } from '../../store/likes';

const EventListings = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => Object.values(state.events));
  const likes = useSelector(state => state.session.likes);

  useEffect(() => {
    dispatch(grabLikes())
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
            let address;
            const like = likes?.find(like => like.event_id === event.id);
            const handleLike = (e) => {
              e.preventDefault()
              if (like) {
                dispatch(removeLike(like.id))
              } else {
                dispatch(createLike(event.id))
              }
            }
            if (event?.address.includes(',')) {
              address = event?.address.split(',').slice(1).join(', ');
            } else if (!event?.address.includes(',')) {
              address = event?.address
              return (
                <div to={`/events/${event.id}`} className='event-listings' key={event.id}>
                  <NavLink className='image-div' alt='' to={`/events/${event?.id}`} style={{backgroundImage: `url(${event?.image_url})`}}></NavLink>
                  <button className='event-like-btn' onClick={handleLike}>
                    {like ? <FaHeart style={{color: 'red'}}/> : <FaRegHeart /> }
                  </button>
                  <div className='event-listing-content'>
                    <NavLink to={`/events/${event?.id}`} className='event-name'>
                      {event.name}
                    </NavLink>
                    <div style={{color: '#d1410c', fontSize: '14px'}}>
                      {event.date.slice(0, 16)}
                    </div>
                    <div style={{color: 'gray', fontSize: '14px'}}>
                      {event.location_name}
                    </div>
                    <div style={{color: 'gray', fontSize: '14px'}}>
                      {address}
                    </div>
                  </div>
                </div>
              )
            }
            return (
              <div to={`/events/${event.id}`} className='event-listings' key={event.id}>
                <NavLink className='image-div' alt='' to={`/events/${event?.id}`} style={{backgroundImage: `url(${event?.image_url})`}}></NavLink>
                <button className='event-like-btn' onClick={handleLike}>
                  {like ? <FaHeart style={{color: 'red'}}/> : <FaRegHeart /> }
                </button>
                <div className='event-listing-content'>
                  <NavLink to={`/events/${event?.id}`} className='event-name'>
                    {event.name}
                  </NavLink>
                  <div style={{color: '#d1410c', fontSize: '14px'}}>
                    {event.date.slice(0, 16)}
                  </div>
                  <div style={{color: 'gray', fontSize: '14px'}}>
                    {event.location_name}
                  </div>
                  <div style={{color: 'gray', fontSize: '14px'}}>
                    {address}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
};

export default EventListings;