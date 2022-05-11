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
}

// R E D U C E R