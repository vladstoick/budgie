const IS_LOGGING_USER = 'LOGGING_USER';
const LOGGED_USER = 'LOGGED_USER';
const LOGIN_ERRORED = 'LOGIN_ERRORED';
const LOGOUT_USER = 'LOGOUT_USER';

import reactCookie from 'react-cookie';
import ApiClient from '../../helpers/ApiClient';
const apiClient = new ApiClient();
const initialState = { };

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case IS_LOGGING_USER:
      return Object.assign({}, { isLoggingUser: true });
    case LOGGED_USER:
      return Object.assign({}, { token: action.token });
    case LOGIN_ERRORED:
      return Object.assign({}, { error: action.error });
    case LOGOUT_USER: return {};
    default: return state;
  }
}

function loggingUser() {
  return {
    type: IS_LOGGING_USER
  };
}

function loggedInUser(token) {
  return {
    type: LOGGED_USER,
    token
  };
}

export function logInErrored(error) {
  return {
    type: LOGIN_ERRORED,
    error
  };
}

export function loadToken() {
  return function load(dispatch) {
    const token = reactCookie.load('token');
    if (token) {
      dispatch(loggedInUser(token));
    }
  };
}


export function loginUser(user) {
  console.log('logging in');
  return async function login(dispatch) {
    dispatch(loggingUser());
    try {
      const data = await apiClient.login(user);
      reactCookie.save('token', data.token);
      dispatch(loggedInUser(data.token));
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
