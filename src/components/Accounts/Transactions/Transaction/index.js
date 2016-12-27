import React from 'react';
import moment from 'moment';
import CategoryIcon from 'components/CategoryIcon';
import { intToAmount } from 'lib/utils';

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
      active,
      accountCurrency
    } = this.props;

    const {
      id,
      category,
      merchant,
      created,
      decline_reason
    } = transaction;

    const title = transaction.merchant ? transaction.merchant.name : transaction.is_load ? 'Monzo' : '';
    const amount = intToAmount(transaction.amount, transaction.currency);
    const counterParty = transaction.counterparty ? transaction.counterparty.name : '';

    const localAmount = transaction.local_currency !== accountCurrency ? intToAmount(transaction.local_amount, transaction.local_currency) : false;

    // This will change when I see more reasons!
    const formattedDeclinedReason = (decline_reason === 'INSUFFICIENT_FUNDS') ? `Declined, you didn't have ${amount}` : false;

    return (
      <a href="#" className={`collection-item avatar row ${active === id ? 'active' : ''}`} onClick={this.handleClick}>
        <div className="col s10">
          <div className="rounded circle">
            {merchant && merchant.logo ? <img src={merchant.logo} alt={counterParty || title} width="100%" /> : <CategoryIcon category={category} />}
          </div>
          <span className="title primary-text">{counterParty || title}{localAmount ? ' 🌎' : ''}</span>
          {formattedDeclinedReason ? (
            <p>{formattedDeclinedReason}</p>
          ) : (
            <p className="grey-text text-lighten-1">{moment(created).fromNow()}</p>
          )}
        </div>
        <div className="col s2">
          <p className={`secondary-content ${amount.includes('+') ? 'green-text' : 'black-text'}`} style={{fontSize: '1.5em'}}>
            {amount}
          </p>
        </div>
      </a>
    );
  }
}
