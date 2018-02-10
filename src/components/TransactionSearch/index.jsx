import React from 'react';
import './style.css';

class TransactionSearch extends React.PureComponent {
  render() {
    return (
      <div className="mzw-transaction-search__container">
        <div className="mzw-transaction-search__label">Search</div>
        <input type="text" className="mzw-transaction-search__input" />
      </div>
    );
  }
}

export default TransactionSearch;
