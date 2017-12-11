import 'whatwg-fetch';
// From: https://gist.github.com/Fluidbyte/2973986
import currencyCodes from './currency-codes.json';

export function mapRange(value, low1, high1, low2, high2) {
  return (low2 + ((high2 - low2) * (value - low1))) / (high1 - low1);
}

export function isEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function intToAmount(amount, currency = 'GBP') {
  if (!amount && typeof amount === 'undefined') {
    return false;
  }

  const currencySymbol = currencyCodes[currency].symbol;
  let addition = false;

  let newAmount = String(amount);

  // See if it's an addition to the account
  if (!newAmount.includes('-') && newAmount !== '0') {
    addition = true;
  }

  // Remove the minus
  newAmount = newAmount.replace('-', '');

  // Format it with decimal places
  let formattedAmount = '0';
  if (newAmount > 2) {
    formattedAmount = `${newAmount.substr(0, newAmount.length - 2)}.${newAmount.substr(-2)}`;
  } else if (newAmount === 2) {
    formattedAmount = `0.${newAmount}`;
  } else {
    formattedAmount = `0.0${newAmount}`;
  }

  return `${addition ? '+ ' : ''}${currencySymbol}${formattedAmount}`;
}

// From Underscore.js - saves importing the whole lib!
/* eslint-disable */
export function once(func) {
  let ran = false,
    memo;
  return function () {
    if (ran) return memo;
    ran = true;
    memo = func.apply(this, arguments);
    func = null;
    return memo;
  };
}
/* eslint-enable */

// Check the status of an AJAX query
export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

// Create error message
export function errorMessage(error = {}) {
  if (error.response && error.response.json()) {
    return `${error.response.json().message} try logging out and in again`;
  }

  return 'Internal error, check your network connection, contact me in the menu if this keeps happening';
}

// Asks for a reissued token if the current access token has expired
export function ajaxFail(error = {}, callback) {
  if (!error.response) {
    return console.error(error);
  }

  return error.response.json().then((responseJSON) => {
    if (responseJSON.code === 'unauthorized.bad_access_token' && localStorage.monzo_refresh_token) {
      fetch(`/token?refresh_token=${localStorage.monzo_refresh_token}&grant_type=refresh_token`)
        .then(checkStatus)
        .then(response => response.json())
        .then((credentials) => {
          localStorage.monzo_access_token = credentials.access_token;
          localStorage.monzo_refresh_token = credentials.refresh_token;

          if (typeof callback === 'function') {
            return callback(null, credentials);
          }
          return true;
        })
        .catch((ajaxError) => {
          localStorage.clear();
          return callback(errorMessage(ajaxError));
        });
    }
  });
}

// Convert a Transaction decline code e.g. INSUFFICIENT_FUNDS into a human readable string.
export function getDeclineTranslation(declinedCode) {
  if (!declinedCode) {
    return false;
  }

  switch (declinedCode) {
    case 'INVALID_EXPIRY_DATE':
      return 'Declined, the expiry date was wrong';
    case 'INSUFFICIENT_FUNDS':
      return 'Declined, you had insufficient funds.';
    case 'CARD_INACTIVE':
      return 'Declined, card inactive.';
    case 'CARD_BLOCKED':
      return 'Declined, card blocked.';
    case 'PIN_RETRY_COUNT_EXCEEDED':
      return 'Declined, PIN retry count exceeded.';
    case 'INVALID_CVC':
      return 'Declined, invalid CVC code used';
    default:
      return `Declined, unknown code: ${declinedCode}`;
  }
}
