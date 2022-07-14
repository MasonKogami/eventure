import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { readOneEvent, deleteEvent } from '../../store/events';
import Modal from '../Modal/Modal';
import ConfirmationModal from '../Modal/Confirmation';
import './OneEvent.css';
import EditEventForm from './EditEventForm';
import Checkout from './Checkout';
import { FaCalendarAlt, FaMapPin, FaRegHeart, FaHeart } from 'react-icons/fa';
import { BsFillFileEarmarkTextFill } from 'react-icons/bs';
import { FaTicketAlt } from 'react-icons/fa';
import { grabLikes, createLike, removeLike } from '../../store/likes';

const OneEvent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const inputRef = useRef();
  const sessionUser = useSelector(state => state.session.user);
  const { eventId } = useParams();
  const event = useSelector(state => state.events[eventId]);
  const likes = useSelector(state => state.session.likes);
  const like = likes?.find(like => like.event_id === event?.id);
  const eventHost = event?.user?.username;
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCheckoutModal, setCheckoutModal] = useState(false);

  useEffect(() => {
    dispatch(readOneEvent(eventId))
    dispatch(grabLikes())
  }, [dispatch, eventId]);

  const deleteOneEvent = async (event) => {
    await dispatch(deleteEvent(event));
    history.push("/home");
  };

  const showEditModalFunc = () => {
    setShowEditModal(true);
    window.scrollTo(0, document.body.scrollHeight / 5.5)
  }
  const closeEditModalFunc = () => setShowEditModal(false);
  const showCheckoutModalFunc = () => {
    setCheckoutModal(true);
    window.scrollTo(0, document.body.scrollHeight / 4)
  }
  const closeCheckoutModalFunc = () => setCheckoutModal(false);
  

  if (!sessionUser) {
    return null;
  };

  const handleLike = (e) => {
    e.preventDefault()
    if (like) {
      dispatch(removeLike(like.id))
    } else {
      dispatch(createLike(event.id))
    }
  };

  return (
    <div className='oneevent-page'>
      {/* <div className='bg-image-header'></div> */}
      <div style={{height: '500px', width: '100%', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 15%)', marginTop: '10px'}}>
        <div style={{backgroundImage: `url(${event?.image_url})`, filter: 'blur(6.5px)', height: '500px', width: '100%', backgroundSize: 'cover'}}>
        </div>
      </div>
      <div className='event-listing-div'>
        <div className='event-listing-details'>
          <div style={{backgroundImage: `url(${event?.image_url})`, height: '360px', width: '720px', backgroundSize: 'cover'}}>
            {/* <img alt='event-header' src={`${event?.image_url}`} /> */}
          </div>
          <div className='event-details-con'>
            <div>
              <div style={{color: '#d1410c'}}>
                {event?.date.slice(8, 11)} 
              </div>
              <span style={{color: '#d1410c'}}>{event?.date.slice(5,7)}</span>
            </div>
            <div style={{fontSize: '22px', color: '#1e0a3c', marginBottom: '5px'}}>
              {event?.name}
            </div>
            <div style={{marginBottom: '5px', color: '#1e0a3c'}}>
              By <button className='owner-btn' /* onClick={() => history.push(`/users/${eventHost?.id}`)} */>{eventHost}</button>
            </div>
            {/* <div className='event-owner-buttons-con'>
              {(sessionUser.id === event?.user_id) && (<button className='edit-btn' onClick={showEditModalFunc}>
                Edit</button>)}
              {showEditModal && (
                <Modal inputRef={inputRef} closeModalFunc={closeEditModalFunc} className='edit-event-modal-background'>
                  <EditEventForm inputRef={inputRef} style={{display: 'flex', justifyContent: 'center'}} closeModalFunc={closeEditModalFunc} />
                </Modal>
              )}
              {(sessionUser.id === event?.user_id) && (<ConfirmationModal 
                    message="Are you sure you want to delete this event?"
                    actionButtonLabel="Delete Event"
                    func={() => deleteOneEvent(event)}
                  >
                <button
                  className='delete-btn'
                  onClick={() => window.scrollTo(0, document.body.scrollHeight / 3)}
                >
                  Delete</button>
              </ConfirmationModal>
              )}
            </div> */}
          </div>
        </div>
        <div className='event-listing-ticket-div'>
          <div className='event-like' onClick={handleLike}>
            {like ? <FaHeart style={{color: 'red'}}/> : <FaRegHeart /> }
          </div>
          {(sessionUser.id !== event?.user_id) && (<button className='checkout-btn' onClick={showCheckoutModalFunc}>
            <FaTicketAlt style={{marginRight: '5px', position: 'relative', bottom: '1px'}}/>
            Tickets</button>)}
          {showCheckoutModal && (
            <Modal className='checkoutmodal-background' closeModalFunc={closeCheckoutModalFunc}>
              <Checkout closeModalFunc={closeCheckoutModalFunc}/>
            </Modal>
          )}
          {(sessionUser.id === event?.user_id) && (<div className='event-owner-buttons-con'>
              {(<button className='edit-btn' onClick={showEditModalFunc}>
                {/* <GoPencil style={{marginRight: '6px'}}/> */}
                Edit</button>)}
              {showEditModal && (
                <Modal inputRef={inputRef} closeModalFunc={closeEditModalFunc} className='edit-event-modal-background'>
                  <EditEventForm inputRef={inputRef} style={{display: 'flex', justifyContent: 'center'}} closeModalFunc={closeEditModalFunc} />
                </Modal>
              )}
              {(<ConfirmationModal 
                    message="Are you sure you want to delete this event?"
                    actionButtonLabel="Delete Event"
                    func={() => deleteOneEvent(event)}
                  >
                <button
                  className='delete-btn'
                  onClick={() => window.scrollTo(0, document.body.scrollHeight / 3)}
                >
                  {/* <AiFillDelete style={{marginRight: '5px', position: 'relative', bottom: '1px'}}/> */}
                  Delete</button>
              </ConfirmationModal>
              )}
            </div>)}
        </div>
        {/* <hr style={{width: '80%'}}></hr> */}
        <div className='event-listing-about-section'>
          <div className='description-section'>
            <h2 style={{display: 'flex', color: '#d1410c', marginTop: '10px', marginLeft: '51px'}}>
              <BsFillFileEarmarkTextFill style={{marginRight: '15px', color: 'black'}}/>
              About this Event:</h2>
            <p style={{display: 'flex', justifyContent: 'center', paddingLeft: '55px', paddingRight: '55px', wordBreak: 'break-word', /* marginLeft: 'auto', marginRight: 'auto', */ height: '100%'}}>{event?.description}</p>
          </div>
          <div className='event-date-loc'>
            <div style={{marginBottom: '30px'}}>
              <div style={{fontSize: '20px', color: '#d1410c'}}>
                <FaCalendarAlt style={{marginRight: '15px', color: 'black'}}/>
                Date
              </div>
              <div style={{marginTop: '20px', marginLeft: '35.5px'}}>
                {event?.date.slice(0, 16)}
              </div>
            </div>
            <div>
              <div style={{color: '#d1410c', fontSize: '20px'}}>
                <FaMapPin style={{color: 'black', marginRight: '15px'}}/>
                Location
              </div>
              <div className='event-info'>
                <div style={{marginBottom: '10px'}}>
                  {event?.location_name}
                </div>
                <div>
                  {event?.address}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneEvent;