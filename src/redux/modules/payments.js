const IS_FETCHING_DATA = 'IS_FETCHING_DATA';
const FETCHED_DATA = 'FETCHED_DATA';
const FETCH_DATA_ERRORED = 'FETCH_DATA_ERRORED';
const CREATING_PAYMENT = 'CREATING_PAYMENT';
const CREATED_PAYMNET = 'CREATED_PAYMNET';
const CREATE_PAYMENT_ERRORED = 'CREATE_PAYMENT_ERRORED';

import ApiClient from '../../helpers/ApiClient';
const apiClient = new ApiClient();

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case IS_FETCHING_DATA:
      return Object.assign({}, { isFetchingData: true });
    case FETCHED_DATA:
      return Object.assign({}, { data: action.payments });
    case FETCH_DATA_ERRORED:
      return Object.assign({}, { error: action.error });
    case CREATING_PAYMENT:
      return Object.assign(state, { isCreatingPayment: true});
    case CREATED_PAYMNET:
      return Object.assign(state, { createdPayment: true});
    case CREATE_PAYMENT_ERRORED:
      return Object.assign(state, { creatingPaymentError: action.error});
    default: return state;
  }
}

function fetchPayments() {
  return {
    type: IS_FETCHING_DATA
  };
}

function fetchedPayments(payments) {
  return {
    type: FETCHED_DATA,
    payments
  };
}

function fetchDataErrored(error) {
  return {
    type: FETCH_DATA_ERRORED,
    error
  };
}

export function loadPayments() {
  return async (dispatch) => {
    dispatch(fetchPayments());
    try {
      const data = await apiClient.getPayments();
      dispatch(fetchedPayments(data));
    } catch (error) {
      dispatch(fetchDataErrored(error.message));
    }
  };
}

export function creatingPayment() {
  return {
    type: CREATING_PAYMENT
  };
}

export function createdPayment(payment) {
  return {
    type: CREATED_PAYMNET,
    payment
  };
}

export function createPaymentErrorred(error) {
  return {
    type: CREATE_PAYMENT_ERRORED,
    error
  };
}

export function createPayment(payment) {
  return async (dispatch) => {
    console.log(payment);
    dispatch(creatingPayment());
    try {
      const data = await apiClient.createPayment(payment);
      dispatch(createdPayment(data.payment));
    } catch (error) {
      dispatch(createPaymentErrorred(error));
    }
  };
}
