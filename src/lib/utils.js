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
