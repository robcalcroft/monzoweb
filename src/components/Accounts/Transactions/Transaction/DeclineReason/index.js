import React from 'react';

export default class DeclineReason extends React.Component {

  static getTranslation(declinedCode) {
    if (!declinedCode) return false;

    switch (declinedCode) {
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
        return 'Declined, unknown \'' + declinedCode + '\'';
    }
  }

}
