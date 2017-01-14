import React from 'react';
import moment from 'moment';
import TransactionImage from 'components/TransactionImage';
import CategoryIcon from 'components/CategoryIcon';
import { getDeclineTranslation } from 'lib/utils';

export default class Transaction extends React.Component {
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
      transactionSelect,
      transaction,
      transaction: {
        id,
        title,
        created,
        decline_reason,
        amount,
        localAmount
      },
      active
    } = this.props;

    return (
      <a href="#" className={`collection-item avatar row ${active === id ? 'active' : ''}`} onClick={this.handleClick}>
        <div className="col s10">
          <div className="rounded circle">
            <TransactionImage transaction={transaction} />
          </div>
          <span className="title primary-text">{title}{localAmount ? ' 🌎' : ''}</span>
          {decline_reason ? (
            <p>{getDeclineTranslation(decline_reason)}</p>
          ) : (
            <p className="grey-text text-lighten-1">{moment(created).fromNow()}</p>
          )}
        </div>
        <div className="col s2">
          <p className={`secondary-content ${(amount && amount.includes('+')) ? 'green-text' : 'black-text'}`} style={{fontSize: '1.5em'}}>
            {amount}
          </p>
        </div>
      </a>
    );
  }
}
