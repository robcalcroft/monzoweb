import React from 'react';
import PropTypes from 'prop-types';
import Transaction from '../Transaction';
import Loader from '../Loader';
import './style.css';

class Transactions extends React.PureComponent {
  constructor() {
    super();

    this.fetchTransactions = this.fetchTransactions.bind(this);

    this.state = {
      transactions: [],
      fetching: true,
    };
  }

  componentWillReceiveProps({ currentAccountId }) {
    if (currentAccountId === '') {
      return false;
    }

    return this.fetchTransactions(currentAccountId);
  }

  fetchTransactions(accountId) {
    this.setState({
      fetching: true,
    });

    fetch(`https://api.getmondo.co.uk/transactions?expand[]=merchant&account_id=${accountId}`, {
      headers: {
        authorization: `Bearer ${localStorage.monzo_access_token}`,
      },
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }
        throw new Error('Broken server');
      })
      .then(response => response.json())
      .then(response => this.setState({
        transactions: response.transactions,
        fetching: false,
      }))
      .catch(error => console.log(error));
  }

  render() {
    const { transactions, fetching } = this.state;

    return (
      <div className={`mzw-transactions ${fetching && 'mzw-transactions--loading'}`}>
        {fetching ? <Loader /> : (
          <ul className="mzw-transactions__list">
            {transactions.reverse().map(transaction => (
              <Transaction key={transaction.id} transaction={transaction} />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

Transactions.propTypes = {
  currentAccountId: PropTypes.string.isRequired,
};

export default Transactions;
