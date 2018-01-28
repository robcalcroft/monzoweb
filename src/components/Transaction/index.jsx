import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CategoryIcon from '../CategoryIcon';
import { getHumanCostFromInteger, timeSince } from '../../helpers';
import './style.css';

class Transaction extends React.PureComponent {
  processTransactionAmount(transaction) {
    if (transaction.notes === 'Active card check') {
      return 'Card check';
    }
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
      if (transaction.counterparty.name) {
        return transaction.counterparty.name;
      }

      if (transaction.counterparty.number) {
        return transaction.counterparty.number;
      }
    }

    if (transaction.merchant) {
      const googlePlacesName = (
        transaction.merchant.metadata && transaction.merchant.metadata.google_places_name
      );
      if (transaction.merchant.name) {
        if (transaction.merchant.atm) {
          return `${transaction.merchant.name}${googlePlacesName ? ` - ${googlePlacesName}` : ''}`;
        }
        return transaction.merchant.name;
      }
    }

    if (transaction.is_load) {
      return 'Top up';
    }

    if (transaction.notes) {
      return <i>{transaction.notes}</i>;
    }

    return '';
  }

  processTransactionExtraInfo(transaction) {
    if (transaction.metadata && transaction.metadata.faster_payment) {
      return 'Bank transfer';
    }

    if (transaction.merchant) {
      if (transaction.merchant.online) {
        return 'Online';
      }
      if (transaction.merchant.address && transaction.merchant.address.city) {
        return transaction.merchant.address.city;
      }
    }

    return '';
  }

  render() {
    const { transaction } = this.props;
    const title = this.processTransactionTitle(transaction);
    const amount = this.processTransactionAmount(transaction);
    const extraInfo = this.processTransactionExtraInfo(transaction);
    const created = timeSince(new Date(transaction.created));
    const transactionLogoClassName = 'mzw-transaction__logo';
    let iconOrLogo = <CategoryIcon className={transactionLogoClassName} />;

    if (transaction.merchant) {
      if (transaction.merchant.logo) {
        iconOrLogo = (
          <img
            className={transactionLogoClassName}
            src={transaction.merchant.logo}
            alt={`${transaction.merchant.name} logo`}
          />
        );
      } else if (transaction.merchant.category) {
        iconOrLogo = (
          <CategoryIcon
            className={transactionLogoClassName}
            category={transaction.merchant.category}
          />
        );
      }
    } else if (transaction.counterparty && transaction.counterparty.name) {
      iconOrLogo = (
        <CategoryIcon
          className={transactionLogoClassName}
          character={transaction.counterparty.name.charAt(0)}
        />
      );
    } else if (transaction.is_load) {
      iconOrLogo = (
        <CategoryIcon
          className={transactionLogoClassName}
          character="+"
        />
      );
    }

    return (
      <li className="mzw-transaction" key={transaction.id}>
        <div className="mzw-transaction__logo-container">{iconOrLogo}</div>
        <div className="mzw-transaction__detail">
          <div>{title}</div>
          <div className="mzw-transaction__info">
            <span>{created}</span>
            {extraInfo && (
              <Fragment>
                <span>&nbsp;&mdash;&nbsp;</span>
                <span>{extraInfo}</span>
              </Fragment>
            )}
          </div>
        </div>
        <div className={`mzw-transaction__amount ${amount.includes('+') && 'mzw-transaction__amount-positive'}`}>
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
