import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { transactionsRequest } from '../../actions';
import Transaction from '../Transaction';
import Loader from '../Loader';
import './style.css';

class Transactions extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.activeId !== this.props.activeId) {
      this.props.fetchTransactions(this.props.activeId);
    }
  }

  render() {
    const { fetching, transactions } = this.props;

    const transactionsClassnames = classNames({
      'mzw-transactions': true,
      'mzw-transactions--loading': fetching,
    });

    return (
      <div className={transactionsClassnames}>
        {fetching ? (
          <Loader />
        ) : (
          <ul className="mzw-transactions__list">
            {transactions.map(transaction => (
              <Transaction key={transaction.id} transaction={transaction} />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

Transactions.propTypes = {
  activeId: PropTypes.string.isRequired,
  fetchTransactions: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const filterTransactions = (transactions, filter) => {
  if (filter === '') {
    return transactions;
  }

  return transactions.filter(transaction => (
    (transaction.merchant
      ? transaction.merchant.name.toLowerCase().includes(filter.toLowerCase())
      : false
    ) ||
    (transaction.merchant
      ? transaction.merchant.address.formatted.toLowerCase().includes(filter.toLowerCase())
      : false
    ) ||
    (transaction.merchant
      ? transaction.merchant.category.toLowerCase().includes(filter.toLowerCase())
      : false
    ) ||
    (transaction.notes
      ? transaction.notes.toLowerCase().includes(filter.toLowerCase())
      : false
    )
  ));
};

const mapStateToProps = state => ({
  activeId: state.accounts.activeId,
  transactions: filterTransactions(
    state.transactions.list,
    state.search.filter,
  ),
  fetching: state.transactions.fetching,
});

const mapDispatchToProps = dispatch => ({
  fetchTransactions: accountId => dispatch(transactionsRequest(accountId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
