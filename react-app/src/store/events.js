// C O N S T A N T S
const CREATE_EVENT = 'events/CREATE_EVENT'
const READ_ALL_EVENTS = 'events/READ_ALL_EVENTS'
const READ_ONE_EVENT = 'events/READ_ONE_EVENT'
const UPDATE_EVENT = 'events/UPDATE_EVENT'
const DELETE_EVENT = 'events/DELETE_EVENT'

// A C T I O N S
const createEventAction = event => ({
  type: CREATE_EVENT,
  event
});

const readAllEventsAction = events => ({
  type: READ_ALL_EVENTS,
  events
});

const readOneEventAction = event => ({
  type: READ_ONE_EVENT,
  event
});

const updateEventAction = event => ({
  type: UPDATE_EVENT,
  event
});

const deleteEventAction = event => ({
  type: DELETE_EVENT,
  event
});

// T H U N K S 
export const createEvent = event => async dispatch => {
  const response = await fetch('/api/events/create', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(event)
  });

  const data = await response.json();

  if (response.ok) {
    await dispatch(createEventAction(data));
    return data;
  } else {
    console.log(data.errors);
  }
};

export const readAllEvents = events => async dispatch => {
  const response = await fetch('/api/events/');

  const data = await response.json();

  if (response.ok) {
    await dispatch(readAllEventsAction(data.events));
    return data;
  } else {
    console.log(data.errors);
  }
};

export const readOneEvent = event => async dispatch => {
  const response = await fetch(`/api/events/${event.id}`);

  const data = await response.json();

  if (response.ok) {
    await dispatch(readOneEventAction(data));
    return data;
  } else {
    console.log(data.errors);
  }
};

export const updateEvent = event => async dispatch => {
  const response = await fetch(`/api/events/${event.id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(event)
  });

  const data = await response.json();
  
  if (response.ok) {
    await dispatch(updateEventAction(data));
    return data;
  } else {
    console.log(data.errors);
  }
};

export const deleteEvent = event => async dispatch => {
  const response = await fetch(`/api/events/${event.id}`, {
    method: 'DELETE'
  });

  const data = await response.json();

  if (response.ok) {
    await dispatch(deleteEventAction(data));
    return data
  } else {
    console.log(data.errors);
  }
};

// R E D U C E R
let initialState = {};
const eventsReducer = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    case CREATE_EVENT:
      newState[action.event.id] = action.event;
      return newState;
    case READ_ALL_EVENTS:
      action.events.forEach(event => newState[event.id] = event);
      return newState;
    case READ_ONE_EVENT:
      newState[action.event.id] = action.event;
      return newState;
    case UPDATE_EVENT:
      newState[action.event.id] = action.event;
      return newState;
    case DELETE_EVENT:
      delete newState[action.event.id];
      return newState;
    default:
      return state;
  }
}

export default eventsReducer;