import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
};

const mapStateToProps = state => ({
  activeId: state.accounts.activeId,
  transactions: state.transactions.list,
  fetching: state.transactions.fetching,
});

const mapDispatchToProps = dispatch => ({
  fetchTransactions: accountId => dispatch(transactionsRequest(accountId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
