import {
  TRANSACTIONS_REQUEST,
  TRANSACTIONS_REQUEST_SUCCESS,
  TRANSACTIONS_REQUEST_FAILURE,
  SET_ACTIVE_TRANSACTION,
} from '../actions';

const initialState = {
  fetching: true,
  list: [],
  error: '',
  selected: {},
};

export default function test(state = initialState, action) {
  switch (action.type) {
    case TRANSACTIONS_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case TRANSACTIONS_REQUEST_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: action.payload.transactions.reverse(),
      };
    case TRANSACTIONS_REQUEST_FAILURE:
      return {
        ...state,
        fetching: false,
        error: 'Error',
      };
    case SET_ACTIVE_TRANSACTION:
      return {
        ...state,
        selected: action.transaction,
      };
    default:
      return state;
  }
}
