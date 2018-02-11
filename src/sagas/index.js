import { call, put, takeEvery } from 'redux-saga/effects';
import {
  ACCOUNTS_REQUEST,
  accountsRequestSuccess,
  accountsRequestFailure,
  TRANSACTIONS_REQUEST,
  transactionsRequestSuccess,
  transactionsRequestFailure,
  BALANCE_REQUEST,
  balanceRequestSuccess,
  balanceRequestFailure,
} from '../actions';
import { fetchAccounts, fetchTransactions, fetchBalance } from '../api';

function* fetchAccountsGen() {
  try {
    const accounts = yield call(fetchAccounts);
    yield put(accountsRequestSuccess(accounts));
  } catch (e) {
    yield put(accountsRequestFailure());
  }
}

function* fetchTransactionsGen(action) {
  try {
    const transactions = yield call(fetchTransactions, action.payload);
    yield put(transactionsRequestSuccess(transactions));
  } catch (e) {
    yield put(transactionsRequestFailure());
  }
}

function* fetchBalanceGen(action) {
  try {
    const balanceInfo = yield call(fetchBalance, action.payload);
    yield put(balanceRequestSuccess(balanceInfo));
  } catch (e) {
    yield put(balanceRequestFailure());
  }
}

export default function* sagas() {
  yield takeEvery(ACCOUNTS_REQUEST, fetchAccountsGen);
  yield takeEvery(TRANSACTIONS_REQUEST, fetchTransactionsGen);
  yield takeEvery(BALANCE_REQUEST, fetchBalanceGen);
}
