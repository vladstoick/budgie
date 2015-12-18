const IS_FETCHING_DATA = {};
const FETCHED_DATA = {};
const FETCH_ERRORED = {};

import ApiClient from '../../helpers/ApiClient';
const apiClient = new ApiClient();

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
  return async function load(dispatch) {
    dispatch(fetchPayments());
    try {
      const data = await apiClient.getPayments();
      dispatch(fetchedPayments(data));
    } catch (error) {
      dispatch(fetchErrored(error.message));
    }
  };
}
