// C O N S T A N T S
const ADD_TICKETS = 'tickets/ADD_TICKETS'
const UPDATE_TICKETS = 'tickets/UPDATE_TICKETS';
const DELETE_TICKETS = 'tickets/DELETE_TICKETS';
const LOAD_TICKETS = 'tickets/LOAD_TICKETS';
const ONE_TICKET = 'tickets/ONE_TICKET';

// A C T I O N S

const addTicketsAction = ticket => ({
  type: ADD_TICKETS,
  ticket
});

const updateTicketsAction = ticket => ({
  type: UPDATE_TICKETS,
  ticket
});

const deleteTicketsAction = ticket => ({
  type: DELETE_TICKETS,
  ticket
});

const loadTicketsAction = tickets => ({
  type: LOAD_TICKETS,
  tickets
});

const oneTicketAction = ticket => ({
  type: ONE_TICKET,
  ticket
});

// T H U N K S

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

export const updateTickets = ticket => async dispatch => {
  console.log(ticket)
  const response = await fetch(`/api/tickets/${ticket.id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(ticket)
  });
  
  
  if (response.ok) {
    const data = await response.json();
    dispatch(updateTicketsAction(data));
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

export const deleteTickets = ticket => async dispatch => {
  const response = await fetch(`/api/tickets/${ticket.id}`, {
    method: 'DELETE'
  });

  const data = await response.json();

  if (response.ok) {
    await dispatch(deleteTicketsAction(data));
    return data;
  } else {
    console.log(data.errors);
  }
};

export const loadTickets = userId => async dispatch => {
  const response = await fetch(`/api/users/${userId}`);

  const data = await response.json();
  dispatch(loadTicketsAction(data.tickets));
  return data;
};

export const oneTicket = id => async dispatch => {
  const response = await fetch(`/api/tickets/${id}`);

  const data = await response.json();
  dispatch(oneTicketAction(data.ticket));
  return data;
};

const initialState = {};

const ticketsReducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    // case ONE_TICKET:
    //   newState[action.ticket.id] = action.ticket;
    //   return newState;
    case ADD_TICKETS:
      console.log(action)
      newState[action.ticket.id] = action.ticket;
      return newState;
    case UPDATE_TICKETS:
      newState[action.ticket.id] = action.ticket;
      return newState;
    case DELETE_TICKETS:
      const filteredState = { ...Object.values(newState).filter(ticket => ticket.id !== action.ticket.id) }
      return filteredState;
    case LOAD_TICKETS:
      return { ...action.tickets }
    default:
      return newState;
  }
};

export default ticketsReducer;