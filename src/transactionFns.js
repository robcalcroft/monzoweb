import format from 'date-fns/format';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

export function getFormattedAmount(amount = 0, noPlusSymbol = false) {
  if (amount === undefined || amount === null || amount === '') return '£0.00';
  const amountInPounds = amount / 100;
  const isCredit = amount.toString()[0] !== '-';
  const formattedAmount = Number(amountInPounds.toString().substr(isCredit ? 0 : 1)).toLocaleString('en-GB', {
    style: 'currency',
    currency: 'GBP',
  });
  return isCredit && noPlusSymbol === false ? `+${formattedAmount}` : formattedAmount;
}

export function isOnlinePurchase(merchant = {}) {
  return merchant && merchant.online;
}

export function getFormattedCreationDate(created) {
  return format(created, 'ddd Do MMM YYYY [at] HH:mm');
}

export function getMerchantLogoUrl(merchant = {}) {
  return merchant ? merchant.logo : '';
}

export function getMerchantName(merchant = {}) {
  return merchant ? merchant.name : 'No merchant name';
}

export function getFormattedMerchantAddress(merchant = {}) {
  return merchant && merchant.address && merchant.address.short_formatted ? merchant.address.short_formatted : 'No address available';
}

export function getLatitudeLongitudeParameter(merchant = {}) {
  return merchant && merchant.address && merchant.address.latitude ? `${merchant.address.latitude},${merchant.address.longitude}` : '';
}

export function getTagList(merchant = {}) {
  return merchant && merchant.metadata.suggested_tags ? merchant.metadata.suggested_tags.split(' ').filter(tag => tag !== '') : [];
}

export function getFormattedTimeSinceNow(created) {
  return distanceInWordsToNow(created, {
    addSuffix: true,
  });
}
