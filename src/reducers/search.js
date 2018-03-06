import { SEARCH_FILTER } from '../actions';

const initialState = {
  filter: '',
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case SEARCH_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
}
