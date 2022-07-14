import { LOAD_LIKES, POST_LIKE, DELETE_LIKE } from "./likes";

// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const READ_ALL_TICKETS = 'session/READ_ALL_TICKETS';
const LOAD_USER = 'session/LOAD_USER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const loadUserAction = (user) => ({
  type: LOAD_USER,
  user
});

const readAllTicketsAction = user => ({
  type: READ_ALL_TICKETS,
  user
});

const initialState = { user: null };

export const loadUser = user => async dispatch => {
  const response = await fetch(`/api/users/${user.id}`);

  const data = await response.json();

  if (response.ok) {
    dispatch(loadUserAction(data));
    return data;
  } else {
    console.log(data.errors);
  }
};

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
  
    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password, confirmPassword) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      confirm: confirmPassword
    }),
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
};

export const readAllTickets = user => async dispatch => {
  const response = await fetch(`/api/users/${user}/tickets`);

  const data = await response.json();

  if (response.ok) {
    dispatch(readAllTicketsAction(data));
    return data;
  } else {
    console.log(data.errors);
  }
};

export default function reducer(state = initialState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case LOAD_USER:
      return { ...newState, "user": action.user }
    // case READ_ALL_TICKETS:
    //   action.user.tickets.forEach(ticket => {
    //     newState[action.user.id].tickets = ticket
    //   });
    //   return newState;
    case LOAD_LIKES:
      // action.events.forEach(event => newState[event.id] = event);
      // return newState;
      newState = { ...state }
      newState["likes"] = action.likes.likes
      return newState
    case POST_LIKE:
      // newState[action.like.id] = action.like;
      // return newState;
      return {
        ...state,
        likes: [...state.likes, action.like]
      }
    case DELETE_LIKE:
      // const filteredState = { ...Object.values(newState).filter(ticket => ticket.id !== action.ticket.id) }
      // return filteredState;
      return {
        ...state,
        likes: state.likes.filter(like => like.id !== action.id)
      }
    default:
      return state;
  }
}
