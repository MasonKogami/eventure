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

  
  if (response.ok) {
    const data = await response.json();
    dispatch(createEventAction(data));
    // return data;
  } else if (response.status !== 200 && response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
};

export const readAllEvents = () => async dispatch => {
  const response = await fetch('/api/events/');

  const data = await response.json();

  if (response.ok) {
    await dispatch(readAllEventsAction(data.events));
    return data;
  } else {
    console.log(data.errors);
  }
};

export const readOneEvent = id => async dispatch => {
  const response = await fetch(`/api/events/${id}`);

  const data = await response.json();

  if (response.ok) {
    await dispatch(readOneEventAction(data));
    return data;
  } else {
    console.log(data.errors);
  }
};

export const updateEvent = (event, id) => async dispatch => {
  const response = await fetch(`/api/events/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(event)
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(updateEventAction(data));
    // return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    const data = await response.json();
    data.errors.push("An error occurred. Please try again.")
    return data.errors;
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

// T I C K E T  C O N S T A N T
const ADD_TICKETS = 'boards/ADD_TICKETS'

// T I C K E T  A C T I O N S
const addTicketsAction = ticket => ({
  type: ADD_TICKETS,
  ticket
});

// T I C K E T  T H U N K
export const addTickets = ticket => async dispatch => {
  const response = await fetch(`/api/events/${ticket.event_id}/tickets`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(ticket)
  });

  
  if (response.ok) {
    const data = await response.json();
    dispatch(addTicketsAction(data));
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors
    }
  } else {
    const data = await response.json();
    data.errors.push("An error occurred. Please try again.")
    return data.errors;
  }
};

// R E D U C E R
let initialState = {};
const eventsReducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
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
    case ADD_TICKETS:
      newState[action.ticket.id] = action.ticket;
      return newState;
    default:
      return state;
  }
}

export default eventsReducer;