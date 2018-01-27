import React from 'react';
import PropTypes from 'prop-types';
import { getHumanCostFromInteger, timeSince } from '../../helpers';
import './style.css';

class Transaction extends React.PureComponent {
  processTransactionAmount(transaction) {
    return getHumanCostFromInteger(transaction.amount, transaction.currency);
  }

  processTransactionLocalAmount(transaction) {
    if (transaction.local_currency !== transaction.currency) {
      return getHumanCostFromInteger(transaction.local_amount, transaction.local_currency);
    }

    return false;
  }

  processTransactionCategory(transaction) {
    if (transaction.category) {
      if (transaction.category === 'mondo' || transaction.category === 'monzo') {
        return '';
      }

      return transaction.category;
    }

    return 'general';
  }

  processTransactionTitle(transaction) {
    if (transaction.counterparty) {
      if (typeof transaction.counterparty.name !== 'undefined') {
        return transaction.counterparty.name;
      }

      if (typeof transaction.counterparty.number !== 'undefined') {
        return transaction.counterparty.number;
      }
    }

    if (transaction.merchant && typeof transaction.merchant.name !== 'undefined') {
      return transaction.merchant.name;
    }

    if (transaction.is_load) {
      return 'Top up';
    }

    return '';
  }

  render() {
    const { transaction } = this.props;
    const title = this.processTransactionTitle(transaction);
    const amount = this.processTransactionAmount(transaction);
    const created = timeSince(new Date(transaction.created));

    return (
      <li className="mp-transaction" key={transaction.id}>
        <div className="mp-transaction__logo-container">
          {transaction.merchant && (
            <img
              className="mp-transaction__logo"
              src={transaction.merchant.logo}
              alt={`${transaction.merchant.name} logo`}
            />
          )}
        </div>
        <div className="mp-transaction__detail">
          <div>{title}</div>
          <div className="mp-transaction__created">{created}</div>
        </div>
        <div className={`mp-transaction__amount ${amount.includes('+') && 'mp-transaction__amount-positive'}`}>
          {amount}
        </div>
      </li>
    );
  }
}

Transaction.propTypes = {
  transaction: PropTypes.object.isRequired, // eslint-disable-line
};

export default Transaction;
