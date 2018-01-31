import React from 'react';
import PropTypes from 'prop-types';
import Transaction from '../Transaction';
import Loader from '../Loader';
import { checkStatus, ajaxFail } from '../../helpers';
import './style.css';

class Transactions extends React.Component {
  constructor() {
    super();

    this.fetchTransactions = this.fetchTransactions.bind(this);

    this.state = {
      transactions: [],
      fetching: true,
    };
  }

  componentWillReceiveProps({ currentAccountId }) {
    if (currentAccountId === this.props.currentAccountId) {
      return false;
    }

    return this.fetchTransactions(currentAccountId);
  }

  fetchTransactions(accountId, repeat = 0) {
    if (repeat === 2) {
      return this.setState({
        fetching: false,
      });
    }

    this.setState({
      fetching: true,
    });

    return fetch(`https://api.getmondo.co.uk/transactions?expand[]=merchant&account_id=${accountId}`, {
      headers: {
        authorization: `Bearer ${localStorage.monzo_access_token}`,
      },
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(response => this.setState({
        transactions: response.transactions.reverse(),
        fetching: false,
      }))
      .catch(error => ajaxFail(error, () => this.fetchTransactions(accountId, repeat + 1)));
  }

  render() {
    const { transactions, fetching } = this.state;
    const { setSelectedTransaction } = this.props;

    return (
      <div className={`mzw-transactions ${fetching && 'mzw-transactions--loading'}`}>
        {fetching ? <Loader /> : (
          <ul className="mzw-transactions__list">
            {transactions.map(transaction => (
              <Transaction
                key={transaction.id}
                setSelectedTransaction={setSelectedTransaction}
                transaction={transaction}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

Transactions.propTypes = {
  currentAccountId: PropTypes.string.isRequired,
  setSelectedTransaction: PropTypes.func.isRequired,
};

export default Transactions;
