import React from 'react';
import Transaction from 'components/Transaction';

export default class TransactionList extends React.Component {
  render() {
    const { transactions, transactionSelect, active } = this.props;

    return (
      <ul className="collection with-header" style={{maxHeight: '70vh', overflowY: 'scroll'}}>
        {!transactions.length ? (
          <li className="collection-item grey-text text-lighten-1 center">
            <h5>No transactions found</h5>
          </li>
        ) : (
          transactions.map(transaction => (
              <Transaction
                key={transaction.id}
                transaction={transaction}
                active={active}
                transactionSelect={transactionSelect}
              />
          ))
        )}
      </ul>
    );
  }
}
