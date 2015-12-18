const IS_FETCHING_DATA = {};
const FETCHED_DATA = {};
const FETCH_ERRORED = {};

import fetch from 'isomorphic-fetch';
// import config from '../../config';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case IS_FETCHING_DATA:
      return Object.assign({}, { isFetchingData: true });
    case FETCHED_DATA:
      return Object.assign({}, { data: action.payments });
    case FETCH_ERRORED:
      return Object.assign({}, { error: action.error });
    default: return state;
  }
}

export function fetchPayments() {
  return {
    type: IS_FETCHING_DATA
  };
}

export function fetchedPayments(payments) {
  console.log('ss');
  return {
    type: FETCHED_DATA,
    payments
  };
}

export function fetchErrored(error) {
  return {
    type: FETCH_ERRORED,
    error
  };
}

export function loadPayments() {
  return async function load(dispatch, getState) {
    dispatch(fetchPayments());
    const token = getState().user.token;
    try {
      let url = '/api/users/me/payments?token=' + token;
      if (__SERVER__) {
        url = 'http://localhost:3000' + url;
      }
      const request = await fetch(url);
      const data = await request.json();
      if (request.status >= 400) {
        throw new Error(data.error);
      }
      dispatch(fetchedPayments(data));
    } catch (error) {
      console.log(error);
      dispatch(fetchErrored(error.message));
    }
  };
}
