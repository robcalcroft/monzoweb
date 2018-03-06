export const ACCOUNTS_REQUEST = 'ACCOUNTS_REQUEST';
export const ACCOUNTS_REQUEST_SUCCESS = 'ACCOUNTS_REQUEST_SUCCESS';
export const ACCOUNTS_REQUEST_FAILURE = 'ACCOUNTS_REQUEST_FAILURE';
export const SET_ACTIVE_ACCOUNT_ID = 'SET_ACTIVE_ACCOUNT_ID';
export const TRANSACTIONS_REQUEST = 'TRANSACTIONS_REQUEST';
export const TRANSACTIONS_REQUEST_SUCCESS = 'TRANSACTIONS_REQUEST_SUCCESS';
export const TRANSACTIONS_REQUEST_FAILURE = 'TRANSACTIONS_REQUEST_FAILURE';
export const SET_ACTIVE_TRANSACTION = 'SET_ACTIVE_TRANSACTION';
export const BALANCE_REQUEST = 'BALANCE_REQUEST';
export const BALANCE_REQUEST_SUCCESS = 'BALANCE_REQUEST_SUCCESS';
export const BALANCE_REQUEST_FAILURE = 'BALANCE_REQUEST_FAILURE';
export const SEARCH_FILTER = 'SEARCH_FILTER';

export function accountsRequest(payload) {
  return {
    type: ACCOUNTS_REQUEST,
    payload,
  };
}

export function accountsRequestSuccess(payload) {
  return {
    type: ACCOUNTS_REQUEST_SUCCESS,
    payload,
  };
}

export function accountsRequestFailure(payload) {
  return {
    type: ACCOUNTS_REQUEST_SUCCESS,
    payload,
  };
}

export function setActiveAccountId(id) {
  return {
    type: SET_ACTIVE_ACCOUNT_ID,
    id,
  };
}

export function transactionsRequest(payload) {
  return {
    type: TRANSACTIONS_REQUEST,
    payload,
  };
}

export function transactionsRequestSuccess(payload) {
  return {
    type: TRANSACTIONS_REQUEST_SUCCESS,
    payload,
  };
}

export function transactionsRequestFailure(payload) {
  return {
    type: TRANSACTIONS_REQUEST_FAILURE,
    payload,
  };
}

export function setActiveTransaction(transaction) {
  return {
    type: SET_ACTIVE_TRANSACTION,
    transaction,
  };
}

export function balanceRequest(payload) {
  return {
    type: BALANCE_REQUEST,
    payload,
  };
}

export function balanceRequestSuccess(payload) {
  return {
    type: BALANCE_REQUEST_SUCCESS,
    payload,
  };
}

export function balanceRequestFailure(payload) {
  return {
    type: BALANCE_REQUEST_FAILURE,
    payload,
  };
}

export function searchFilter(payload) {
  return {
    type: SEARCH_FILTER,
    payload,
  };
}
