import { checkStatus, fetchFail } from './helpers';

export const fetchAccounts = () => fetch('https://api.monzo.com/accounts', {
  headers: {
    authorization: `Bearer ${localStorage.monzo_access_token}`,
  },
})
  .then(checkStatus)
  .then(response => response.json())
  .catch(fetchFail);

export const fetchTransactions = accountId => fetch(`https://api.monzo.com/transactions?expand[]=merchant&account_id=${accountId}`, {
  headers: {
    authorization: `Bearer ${localStorage.monzo_access_token}`,
  },
})
  .then(checkStatus)
  .then(response => response.json())
  .catch(fetchFail);

export const fetchBalance = accountId => fetch(`https://api.monzo.com/balance?account_id=${accountId}`, {
  headers: {
    Authorization: `Bearer ${localStorage.monzo_access_token}`,
  },
})
  .then(checkStatus)
  .then(response => response.json())
  .catch(fetchFail);
