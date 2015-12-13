const IS_LOGGING_USER = 'LOGGING_USER';
const LOGGED_USER = 'LOGGED_USER';
const LOGIN_ERRORED = 'LOGIN_ERRORED';
const LOGOUT_USER = 'LOGOUT_USER';
import fetch from 'isomorphic-fetch';


const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case IS_LOGGING_USER:
      return Object.assign({}, { isLoggingUser: true });
    case LOGGED_USER:
      return Object.assign({}, { token: action.token });
    case LOGIN_ERRORED:
      return Object.assign({}, { error: action.error });
    case LOGOUT_USER: return initialState;
    default: return state;
  }
}

function loggingUser() {
  return {
    type: IS_LOGGING_USER
  };
}

function loggedUser(token) {
  return {
    type: LOGGED_USER,
    token
  };
}

function logInErrored(error) {
  return {
    type: LOGIN_ERRORED,
    error
  };
}

// import { signIn } from '../api/user';
export function loginUser(user) {
  console.log('Logging IN');
  return async function login(dispatch) {
    dispatch(loggingUser());
    try {
      const request = await fetch('http://api.staging.bought.today/v1' + '/login', {
        method: 'post',
        body: JSON.stringify(user)
      });
      const data = await request.json();
      if (request.status === 401) {
        throw new Error(data.error);
      }
      dispatch(loggedUser(data.token));
    } catch (error) {
      dispatch(logInErrored(error.message));
    }
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}
