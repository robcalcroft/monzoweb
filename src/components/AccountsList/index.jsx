import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { getFormattedAmount } from '../../transactionFns';
import './style.css';

class AccountsList extends React.PureComponent {
  constructor() {
    super();

    this.setStateForAccountId = this.setStateForAccountId.bind(this);
    this.getBalance = this.getBalance.bind(this);
    this.getAccounts = this.getAccounts.bind(this);

    this.state = {
      accounts: {},
      error: undefined,
      fetchingAccounts: false,
    };
  }

  componentDidMount() {
    this.getAccounts();
  }

  setStateForAccountId(accountId, newState) {
    const { accounts } = this.state;

    this.setState({
      accounts: {
        ...accounts,
        [accountId]: {
          ...accounts[accountId],
          ...newState,
        },
      },
    });
  }

  async getAccounts() {
    this.setState({ fetchingAccounts: true });

    try {
      const response = await fetch('https://api.monzo.com/accounts', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('monzoAccessToken')}`,
        },
      });
      const { accounts } = await response.json();
      const openAccounts = accounts;// .filter(account => !account.closed);
      const accountsById = {};
      openAccounts.forEach((account) => {
        accountsById[account.id] = {
          ...account,
          fetchingBalance: false,
        };
      });
      this.setState({ accounts: accountsById });
      Object.keys(accountsById).forEach(accountId => this.getBalance(accountId));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ fetchingAccounts: false });
    }
  }

  async getBalance(accountId) {
    this.setStateForAccountId(accountId, { fetchingBalance: true });

    try {
      const response = await fetch(`https://api.monzo.com/balance?account_id=${accountId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('monzoAccessToken')}`,
        },
      });
      const balanceInformation = await response.json();
      this.setStateForAccountId(accountId, balanceInformation);
    } catch (error) {
      this.setState({ error: 'Error getting balance' });
    } finally {
      this.setStateForAccountId(accountId, { fetchingBalance: false });
    }
  }

  render() {
    const {
      accounts,
      error,
      fetchingAccounts,
    } = this.state;

    if (error) return error;
    if (fetchingAccounts) return 'Loading...';

    return (
      <React.Fragment>
        <div className="mzw__accounts-list">
          {Object.values(accounts).map(({
            description,
            id,
            spend_today: spendToday,
            balance,
            fetchingBalance,
          }) => (
            <div key={id}>
              <h3>{description}</h3>
              <h4>Balance: {fetchingBalance ? 'Loading...' : getFormattedAmount(balance, true)}</h4>
              <h4>Spend today: {fetchingBalance ? 'Loading...' : getFormattedAmount(spendToday, true)}</h4>
              <Link to={`account/${id}`}>Go to account</Link>
            </div>
          ))}
        </div>
        {this.props.children}
      </React.Fragment>
    );
  }
}

AccountsList.defaultProps = {
  children: undefined,
};

AccountsList.propTypes = {
  children: PropTypes.node,
};

export default AccountsList;

