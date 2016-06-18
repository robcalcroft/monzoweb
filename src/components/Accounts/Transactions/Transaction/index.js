import React from 'react';
import moment from 'moment';

export default class Transaction extends React.Component {
  render() {
    const {
      props: {
        amount,
        logo,
        merchant,
        id,
        transactionSelect,
        active,
        created,
        declinedReason,
        localAmount,
        counterParty
      }
    } = this;

    // This will change when I see more reasons!
    const formattedDeclinedReason = declinedReason === 'INSUFFICIENT_FUNDS' ? `Declined, you didn't have ${amount}` : false;

    return (
      <a
        href="#"
        className={`collection-item avatar row ${active ? 'active' : ''}`}
        data-tid={id}
        onClick={transactionSelect}
      >
        <div className="col s10">
          <img src={logo || require('assets/shopping-bag.svg')} alt={merchant} className="rounded circle" />
          <span className="title primary-text">{counterParty || merchant}{`${localAmount ? ' 🌎' : ''}`}</span>
          {
            formattedDeclinedReason ? (
              <p>{formattedDeclinedReason}</p>
            ) : (
              <p className="grey-text text-lighten-1">{moment(created).fromNow()}</p>
            )
          }
        </div>
        <div className="col s2">
          <p className={`secondary-content secondary-color-text ${amount.includes('+') ? 'green-text' : ''}`}>
            {!formattedDeclinedReason ? amount : ''}
          </p>
        </div>
      </a>
    );
  }
}
