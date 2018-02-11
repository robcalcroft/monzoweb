import {
  ACCOUNTS_REQUEST,
  ACCOUNTS_REQUEST_SUCCESS,
  ACCOUNTS_REQUEST_FAILURE,
  SET_ACTIVE_ACCOUNT_ID,
} from '../actions';

const initialState = {
  fetching: true,
  list: [],
  error: '',
  activeId: '',
};

export default function test(state = initialState, action) {
  switch (action.type) {
    case ACCOUNTS_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case ACCOUNTS_REQUEST_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: action.payload.accounts,
        activeId: action.payload.accounts[action.payload.accounts.length - 1].id,
      };
    case ACCOUNTS_REQUEST_FAILURE:
      return {
        ...state,
        fetching: false,
        error: 'Error',
      };
    case SET_ACTIVE_ACCOUNT_ID:
      return {
        ...state,
        activeId: action.id,
      };
    default:
      return state;
  }
}
