// C O N S T A N T S
const UPDATE_TICKETS = 'tickets/UPDATE_TICKETS';
const DELETE_TICKETS = 'tickets/DELETE_TICKETS';

// A C T I O N S
const updateTicketsAction = ticket => ({
  type: UPDATE_TICKETS,
  ticket
});

const deleteTicketsAction = ticket => ({
  type: DELETE_TICKETS,
  ticket
});

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

const initialState = {};

const ticketsReducer = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    case UPDATE_TICKETS:
      newState[action.ticket.id] = action.ticket;
      return newState;
    case DELETE_TICKETS:
      delete newState[action.ticket.id];
      return newState;
    default:
      return newState;
  }
};

export default ticketsReducer;