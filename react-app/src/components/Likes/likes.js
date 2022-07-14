import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { grabLikes, createLike, removeLike } from '../../store/likes';
import { readAllEvents } from '../../store/events';
import './likes.css';

const Likes = () => {
  const dispatch = useDispatch();
  const likes = useSelector(state => state.session.likes.sort((a, b) => b.id - a.id));
  const events = useSelector(state => Object.values(state.events));

  useEffect(() => {
    dispatch(grabLikes());
    dispatch(readAllEvents());
  }, [dispatch]);

  return (
    <div className='likes-page'>
      <h2 className='likes-title'>Likes</h2>
      <div className='like-cards'>
        {likes?.map((like) => {
          let address;
          const handleLike = (e) => {
            e.preventDefault()
            if (like) {
              dispatch(removeLike(like.id))
            } else {
              dispatch(createLike(event.id))
            }
          };
          const event = events?.find(event => event.id === like.event_id);
          if (event?.address.includes(',')) {
            address = event?.address.split(',').slice(1).join(', ');
          } else if (!event?.address.includes(',')) {
            address = event?.address
          return (
            <div className='like-card' key={like?.id}>
              <div className='event-like-info'>
                <NavLink to={`/events/${event?.id}`} className='event-name'>
                  {event.name}
                </NavLink>
                <div style={{color: '#d1410c', fontSize: '14px'}}>
                  {event?.date.slice(0, 16)}  
                </div>
                <div style={{fontSize: '14px'}}>
                  {address}
                </div>
              </div>
              <div className='like-image-btn-con'>
                <div className='like-card-image' style={{backgroundImage: `url(${event?.image_url})`, backgroundSize: 'cover'}}>
                  
                </div>
                <button className='likes-page-btn' onClick={handleLike}>
                  {like ? <FaHeart style={{color: 'red'}}/> : <FaRegHeart /> }
                </button>
              </div>
            </div>
          )
        }
          return (
            <div className='like-card' key={like?.id}>
              <div className='event-like-info'>
                <NavLink to={`/events/${event?.id}`} className='event-name'>
                  {event.name}
                </NavLink>
                <div style={{color: '#d1410c', fontSize: '14px'}}>
                  {event?.date.slice(0, 16)}  
                </div>
                <div style={{fontSize: '14px'}}>
                  {address}
                </div>
              </div>
              <div className='like-image-btn-con'>
                <div className='like-card-image' style={{backgroundImage: `url(${event?.image_url})`, backgroundSize: 'cover'}}>
                  
                </div>
                <button className='likes-page-btn' onClick={handleLike}>
                  {like ? <FaHeart style={{color: 'red'}}/> : <FaRegHeart /> }
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Likes;