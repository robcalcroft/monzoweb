// From: https://gist.github.com/Fluidbyte/2973986
import currencyCodes from 'lib/currency-codes.json';
import 'whatwg-fetch';

export function intToAmount(amount, currency = 'GBP') {
  if (amount === undefined || amount === null || amount === false) {
    return false;
  }

  const currencySymbol = currencyCodes[currency].symbol;
  let addition = false;

  amount = String(amount);

  // See if it's an addition to the account
  if (!amount.includes('-') && amount !== '0') {
    addition = true;
  }

  // Remove the minus
  amount = amount.replace('-', '');

  // Format it with decimal places
  let formattedAmount = amount.length > 2 ?
    `${amount.substr(0, amount.length - 2)}.${amount.substr(-2)}` :
    amount.length === 2 ? `0.${amount}` : `0.0${amount}`;

  return `${addition ? '+ ' : ''}${currencySymbol}${formattedAmount}`;
}

// From Underscore.js - saves importing the whole lib!
export function once(func) {
  let ran = false, memo;
  return function() {
    if (ran) return memo;
    ran = true;
    memo = func.apply(this, arguments);
    func = null;
    return memo;
  };
};

// Asks for a reissued token if the current access token has expired
export function ajaxFail(error = {}, callback) {
  const responseJSON = error.response.json();
  if (responseJSON && responseJSON.code === 'unauthorized.bad_access_token' && localStorage.mondo_refresh_token) {
    fetch(`/token?refresh_token=${localStorage.mondo_refresh_token}&grant_type=refresh_token`)
      .then(checkStatus)
      .then(response => response.json())
      .then(credentials => {
        localStorage.mondo_access_token = credentials.access_token;
        localStorage.mondo_refresh_token = credentials.refresh_token;
        if (typeof callback === 'function') {
          return callback(credentials);
        }
      })
      .catch(error => {
        localStorage.clear();
        showErrorMessage(err);
      });
  } else {
    showErrorMessage(error);
  }
}

// Show the sweet alert popup
export function showErrorMessage(error = {}) {
  swal('Error', error.response && error.response.json() ? `${error.response.json().message} try logging out and in again` : false
    || 'Internal error, check your network connection, contact me in the menu if this keeps happening', 'error');
}

// Check the status of an AJAX query
export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  let error = new Error(response.statusText);
  error.response = response;
  throw error;
}
