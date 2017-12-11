import React from 'react';
import PropTypes from 'prop-types';
import Transaction from '../../components/Transaction';
import './style.scss';

const noTransactions = (
  <li className="collection-item grey-text text-lighten-1 center">
    <h5>No transactions found</h5>
  </li>
);

const fetchingTransactions = (
  <div className="transactionsList--loading">
    <div className="preloader-wrapper small active">
      <div className="spinner-layer">
        <div className="circle-clipper left">
          <div className="circle" />
        </div>
        <div className="gap-patch">
          <div className="circle" />
        </div>
        <div className="circle-clipper right">
          <div className="circle" />
        </div>
      </div>
    </div>
  </div>
);

const TransactionList = ({
  transactions,
  transactionSelect,
  active,
  fetching,
}) => {
  let innerComponent = noTransactions;

  if (fetching) {
    innerComponent = fetchingTransactions;
  }

  if (transactions.length > 0) {
    innerComponent = transactions.map(transaction => (
      <Transaction
        key={transaction.id}
        transaction={transaction}
        active={active}
        transactionSelect={transactionSelect}
      />
    ));
  }


  return (
    <ul className="collection with-header" style={{ maxHeight: '70vh', overflowY: 'scroll' }}>
      {innerComponent}
    </ul>
  );
};

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  transactionSelect: PropTypes.func.isRequired,
  active: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default TransactionList;
