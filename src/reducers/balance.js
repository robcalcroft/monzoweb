import {
  BALANCE_REQUEST,
  BALANCE_REQUEST_SUCCESS,
  BALANCE_REQUEST_FAILURE,
} from '../actions';

const initialState = {
  fetching: true,
  total: '0',
  spentToday: '0',
  currency: 'GBP',
};

export default function test(state = initialState, action) {
  switch (action.type) {
    case BALANCE_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case BALANCE_REQUEST_SUCCESS:
      return {
        ...state,
        fetching: false,
        total: String(action.payload.balance),
        spentToday: String(action.payload.spend_today),
        currency: action.payload.currency,
      };
    case BALANCE_REQUEST_FAILURE:
      return {
        ...state,
        fetching: false,
        error: 'Error',
      };
    default:
      return state;
  }
}
