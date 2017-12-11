import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import TransactionImage from '../../components/TransactionImage';
import { getDeclineTranslation } from '../../lib/utils';

class Transaction extends React.Component {
  constructor() {
    super();

    // Bind property functions
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();

    const { transactionSelect, transaction: { id } } = this.props;
    transactionSelect(id);
  }

  render() {
    const {
      transaction,
      transaction: {
        id,
        title,
        created,
        decline_reason: declineReason,
        amount,
        localAmount,
      },
      active,
    } = this.props;

    return (
      <a href="#" className={`collection-item avatar row ${active === id ? 'active' : ''}`} onClick={this.handleClick}>
        <div className="col s10">
          <div className="rounded circle">
            <TransactionImage transaction={transaction} />
          </div>
          <span className="title primary-text">{title}{localAmount ? ' 🌎' : ''}</span>
          {declineReason ? (
            <p>{getDeclineTranslation(declineReason)}</p>
          ) : (
            <p className="grey-text text-lighten-1">{moment(created).fromNow()}</p>
          )}
        </div>
        <div className="col s2">
          <p className={`secondary-content ${(amount && amount.includes('+')) ? 'green-text' : 'black-text'}`} style={{ fontSize: '1.5em' }}>
            {amount}
          </p>
        </div>
      </a>
    );
  }
}

Transaction.propTypes = {
  transactionSelect: PropTypes.func.isRequired,
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  active: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default Transaction;
