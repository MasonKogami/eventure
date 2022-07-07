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
      <div className='header-div'>
        {/* <div>
          <img alt='event-header' src='https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F230834389%2F285623250502%2F1%2Foriginal.20210604-004626?w=600&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=f94e8cdbce75497cb7ede588ea34da22' />
        </div> */}
        <div style={{fontSize: '40px', color: '#d1410c', fontWeight: 'bolder'}}>
          {event?.name}
        </div>
        <div style={{marginBottom: '4px'}}>
          Hosted by {eventHost}
        </div>
        <hr style={{width: '80%'}}></hr>
        <FaCalendarAlt />
        <div style={{fontSize: '20px', marginBottom: '8px', color: '#d1410c', fontWeight: 'bolder'}}>
          Date
        </div>
        <div>
          {event?.date.slice(0, 16)}
        </div>
        <div>
          {(sessionUser.id === event?.user_id) && (<button className='edit-btn' onClick={showEditModalFunc}>
            <GoPencil style={{marginRight: '6px'}}/>
            Edit</button>)}
          {showEditModal && (
            <Modal inputRef={inputRef} closeModalFunc={closeEditModalFunc} className='edit-event-modal-background'>
              <EditEventForm inputRef={inputRef} style={{display: 'flex', justifyContent: 'center'}} closeModalFunc={closeEditModalFunc} />
            </Modal>
          )}
        </div>
        <div>
          {(sessionUser.id === event?.user_id) && (<ConfirmationModal 
                message="Are you sure you want to delete this event?"
                actionButtonLabel="Delete Event"
                func={() => deleteOneEvent(event)}
              >
            <button
              className='delete-btn'
              onClick={() => window.scrollTo(0, document.body.scrollHeight / 3)}
            >
              <AiFillDelete style={{marginRight: '5px', position: 'relative', bottom: '1px'}}/>
              Delete</button>
          </ConfirmationModal>
          )}
        </div>
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
            {(sessionUser.id !== event?.user_id) && (<button className='checkout-btn' onClick={showCheckoutModalFunc}>
              <FaTicketAlt style={{marginRight: '5px', position: 'relative', bottom: '1px'}}/>
              Tickets</button>)}
            {showCheckoutModal && (
              <Modal className='checkoutmodal-background' closeModalFunc={closeCheckoutModalFunc}>
                <Checkout closeModalFunc={closeCheckoutModalFunc}/>
              </Modal>
            )}
          </div>
          <BsFillFileEarmarkTextFill style={{display: 'flex', justifyContent: 'center', marginTop: '12px'}} />
          <h4 style={{display: 'flex', justifyContent: 'center', color: '#d1410c', marginTop: '10px'}}>About this Event:</h4>
          <p style={{display: 'flex', justifyContent: 'center', paddingLeft: '55px', paddingRight: '55px', wordBreak: 'break-word', /* marginLeft: 'auto', marginRight: 'auto', */ height: '100%'}}>{event?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default OneEvent;