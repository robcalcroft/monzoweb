// From: https://gist.github.com/Fluidbyte/2973986
import currencyCodes from 'lib/currency-codes.json';

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
export function ajaxFail(err = {}, callback) {
  if (err.responseJSON && err.responseJSON.code === 'unauthorized.bad_access_token' && localStorage.mondo_refresh_token) {
    $.getJSON(`/token?refresh_token=${localStorage.mondo_refresh_token}&grant_type=refresh_token`)
      .done(credentials => {
        localStorage.mondo_access_token = credentials.access_token;
        localStorage.mondo_refresh_token = credentials.refresh_token;
        if (typeof callback === 'function') {
          return callback(credentials);
        }
      })
      .fail(err => {
        localStorage.clear();
        showErrorMessage();
      });
  } else {
    showErrorMessage(err);
  }
}

// Show the sweet alert popup
export function showErrorMessage(err = {}) {
  swal('Error', err.responseJSON ? `${err.responseJSON.message} try logging out and in again` : false
    || 'Internal error, check your network connection, contact me in the menu if this keeps happening', 'error');
}
