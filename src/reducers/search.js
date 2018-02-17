import { SEARCH_VISIBLE, SEARCH_FILTER } from '../actions';

const initialState = {
  visible: false,
  filter: '',
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case SEARCH_VISIBLE:
      return {
        ...state,
        visible: !state.visible,
        filter: !state.visible === false ? '' : state.filter,
      };
    case SEARCH_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
}
