import React from 'react';
import PropTypes from 'prop-types';
import { getHumanCostFromInteger } from '../../helpers';
import './style.css';

class Balance extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      balance: '0',
      spentToday: '0',
      currency: 'GBP',
      fetching: true,
    };
  }

  componentWillReceiveProps({ currentAccountId }) {
    if (currentAccountId === '') {
      return false;
    }

    return this.fetchBalance(currentAccountId);
  }

  fetchBalance(accountId) {
    this.setState({
      fetching: true,
    });

    fetch(`https://api.getmondo.co.uk/balance?account_id=${accountId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.monzo_access_token}`,
      },
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }
        throw new Error('Broken server');
      })
      .then(response => response.json())
      .then(({ currency, balance, spend_today: spentToday }) => {
        this.setState({
          balance,
          spentToday,
          currency,
          fetching: false,
        });
      })
      .catch(error => console.log(error.message));
  }

  render() {
    const {
      balance,
      spentToday,
      currency,
      fetching,
    } = this.state;

    return (
      <div className="mzw-balance">
        <div className="mzw-balance__label-container">
          <div className="mzw-balance__label">Balance</div>
          <div className="mzw-balance__value">
            {fetching ? 'Loading...' : getHumanCostFromInteger(balance, currency).replace('+', '')}
          </div>
        </div>
        <div className="mzw-balance__label-container">
          <div className="mzw-balance__label">Spent Today</div>
          <div className="mzw-balance__value">
            {fetching ? 'Loading...' : getHumanCostFromInteger(spentToday, currency).replace('+', '')}
          </div>
        </div>
      </div>
    );
  }
}

Balance.propTypes = {
  currentAccountId: PropTypes.string.isRequired,
};

export default Balance;
