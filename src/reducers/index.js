import { combineReducers } from 'redux';
import accounts from './accounts';
import transactions from './transactions';
import balance from './balance';
import search from './search';

export default combineReducers({
  accounts,
  transactions,
  balance,
  search,
});
