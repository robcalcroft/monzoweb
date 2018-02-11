import { checkStatus } from './helpers';

export const fetchAccounts = () => fetch('https://api.getmondo.co.uk/accounts', {
  headers: {
    authorization: `Bearer ${localStorage.monzo_access_token}`,
  },
})
  .then(checkStatus)
  .then(response => response.json());

export const fetchTransactions = accountId => fetch(`https://api.getmondo.co.uk/transactions?expand[]=merchant&account_id=${accountId}`, {
  headers: {
    authorization: `Bearer ${localStorage.monzo_access_token}`,
  },
})
  .then(checkStatus)
  .then(response => response.json());

export const fetchBalance = accountId => fetch(`https://api.getmondo.co.uk/balance?account_id=${accountId}`, {
  headers: {
    Authorization: `Bearer ${localStorage.monzo_access_token}`,
  },
})
  .then(checkStatus)
  .then(response => response.json());
