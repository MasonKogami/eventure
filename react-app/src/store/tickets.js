// C O N S T A N T S
const UPDATE_TICKETS = 'tickets/UPDATE_TICKETS';
const DELETE_TICKETS = 'tickets/DELETE_TICKETS';
const LOAD_TICKETS = 'tickets/LOAD_TICKETS';
// A C T I O N S
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
})

// T H U N K S
export const updateTickets = ticket => async dispatch => {
  const response = await fetch(`/api/tickets/${ticket.id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(ticket)
  });
  
  const data = await response.json();

  if (response.ok) {
    await dispatch(updateTicketsAction(data));
    return data;
  } else {
    console.log(data.errors);
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
  console.log(data.tickets);
  dispatch(loadTicketsAction(data.tickets));
  return data;
}

const initialState = {};

const ticketsReducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
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