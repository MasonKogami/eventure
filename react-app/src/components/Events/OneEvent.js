import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { readOneEvent, deleteEvent, updateEvent } from '../../store/events';
import Modal from '../Modal/Modal';
import ConfirmationModal from '../Modal/Confirmation';
import './OneEvent.css';
import EditEventForm from './EditEventForm';

const OneEvent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const { eventId } = useParams();
  const event = useSelector(state => state.events[eventId]);
  const [showEditModal, setShowEditModal] = useState(false);
  // console.log(events)
  // console.log(event);
  // console.log(sessionUser);

  useEffect(() => {
    dispatch(readOneEvent(eventId))
  }, [dispatch, eventId]);

  const deleteOneEvent = async (event) => {
    await dispatch(deleteEvent(event));
    history.push("/home"); // timing issue
  };

  const editOneEvent = async (event) => {
    await dispatch(updateEvent(event));
    history.push(`/events/${event.id}`);
  };

  const showEditModalFunc = () => setShowEditModal(true);
  const closeEditModalFunc = () => setShowEditModal(false);

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
          {/* {(sessionUser.id === event?.host_id) && <button onClick={() => Submit}>Edit Event</button>} */}
          {(sessionUser.id === event?.host_id) && (<button onClick={showEditModalFunc}>Edit Event</button>)}
          {showEditModal && (
            <Modal closeModalFunc={closeEditModalFunc} className='modal-background'>
              <EditEventForm closeModalFunc={closeEditModalFunc} />
            </Modal>
          )}
        </div>
        <div>
          {/* {(sessionUser.id === event?.host_id) && <button onClick={() => deleteOneEvent(event)}>Delete Event</button>} */}
          {(sessionUser.id === event?.host_id) && (<ConfirmationModal 
                message="Are you sure you want to delete this event?"
                actionButtonLabel="Delete Event"
                func={() => deleteOneEvent(event)}
              >
            <button
              style={{marginRight: "12px"}}
              // onClick={() => deleteEvent(event)}
            >Delete Event</button>
          </ConfirmationModal>
          )}
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