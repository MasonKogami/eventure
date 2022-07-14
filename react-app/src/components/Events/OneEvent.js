import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { readOneEvent, deleteEvent } from '../../store/events';
import Modal from '../Modal/Modal';
import ConfirmationModal from '../Modal/Confirmation';
import './OneEvent.css';
import EditEventForm from './EditEventForm';
import Checkout from './Checkout';
import { FaCalendarAlt, FaMapPin } from 'react-icons/fa';
import { BsFillFileEarmarkTextFill } from 'react-icons/bs';
import { FaTicketAlt } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { GoPencil } from 'react-icons/go';

const OneEvent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const inputRef = useRef();
  const sessionUser = useSelector(state => state.session.user);
  const { eventId } = useParams();
  const event = useSelector(state => state.events[eventId]);
  const eventHost = event?.user?.username;
  console.log(eventHost);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCheckoutModal, setCheckoutModal] = useState(false);
  // console.log(eventHost);
  // console.log(events)
  // console.log(sessionUser);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  useEffect(() => {
    dispatch(readOneEvent(eventId))
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
  }

  return (
    <div className='oneevent-page'>
      {/* <div className='bg-image-header'></div> */}
      <div style={{height: '500px', width: '100%', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 15%)', marginTop: '10px'}}>
        <div style={{backgroundImage: `url(${event?.image_url})`, filter: 'blur(6.5px)', height: '500px', width: '100%'}}>
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
            <div style={{fontSize: '22px', color: '#1e0a3c'}}>
              {event?.name}
            </div>
            <div style={{marginBottom: '15px', color: '#1e0a3c'}}>
              By <button className='owner-btn' /* onClick={() => history.push(`/users/${eventHost?.id}`)} */>{eventHost}</button>
            </div>
            <div className='event-owner-buttons-con'>
              {(sessionUser.id === event?.user_id) && (<button className='edit-btn' onClick={showEditModalFunc}>
                {/* <GoPencil style={{marginRight: '6px'}}/> */}
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
                  {/* <AiFillDelete style={{marginRight: '5px', position: 'relative', bottom: '1px'}}/> */}
                  Delete</button>
              </ConfirmationModal>
              )}
            </div>
          </div>
        </div>
        <div className='event-listing-ticket-div'>
          {(sessionUser.id !== event?.user_id) && (<button className='checkout-btn' onClick={showCheckoutModalFunc}>
            <FaTicketAlt style={{marginRight: '5px', position: 'relative', bottom: '1px'}}/>
            Tickets</button>)}
          {showCheckoutModal && (
            <Modal className='checkoutmodal-background' closeModalFunc={closeCheckoutModalFunc}>
              <Checkout closeModalFunc={closeCheckoutModalFunc}/>
            </Modal>
          )}
        </div>
        {/* <hr style={{width: '80%'}}></hr> */}
        <div className='event-listing-about-section'>
          <FaCalendarAlt />
          <FaMapPin style={{marginTop: '13px'}}/>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '1px', fontSize: '20px', color: '#d1410c', fontWeight: 'bolder'}}>
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
            <BsFillFileEarmarkTextFill style={{display: 'flex', justifyContent: 'center', marginTop: '12px'}} />
            <h4 style={{display: 'flex', justifyContent: 'center', color: '#d1410c', marginTop: '10px'}}>About this Event:</h4>
            <p style={{display: 'flex', justifyContent: 'center', paddingLeft: '55px', paddingRight: '55px', wordBreak: 'break-word', /* marginLeft: 'auto', marginRight: 'auto', */ height: '100%'}}>{event?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneEvent;