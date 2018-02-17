import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { transactionsRequest, searchVisible as searchVisibleAction } from '../../actions';
import Transaction from '../Transaction';
import Loader from '../Loader';
import './style.css';

class Transactions extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.activeId !== this.props.activeId) {
      this.props.fetchTransactions(this.props.activeId);
    }
  }

  componentWillUnmount() {
    if (this.props.searchVisible === true) {
      this.props.searchVisibleToggle();
    }
  }

  render() {
    const { fetching, transactions } = this.props;

    return (
      <div className={`mzw-transactions ${fetching && 'mzw-transactions--loading'}`}>
        {fetching ? <Loader /> : (
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
  searchVisible: PropTypes.bool.isRequired,
  searchVisibleToggle: PropTypes.func.isRequired,
};

const filterTransactions = (transactions, filter, visible) => {
  if (filter === '' || visible === false) {
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
    state.search.visible,
  ),
  searchVisible: state.search.visible,
  fetching: state.transactions.fetching,
});

const mapDispatchToProps = dispatch => ({
  fetchTransactions: accountId => dispatch(transactionsRequest(accountId)),
  searchVisibleToggle: () => dispatch(searchVisibleAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
