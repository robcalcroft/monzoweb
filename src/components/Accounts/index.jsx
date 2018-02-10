import React from 'react';
import AccountSelector from '../AccountSelector';
import Balance from '../Balance';
import TransactionDetail from '../TransactionDetail';
import Transactions from '../Transactions';
import TransactionSearch from '../TransactionSearch';
import { checkStatus, ajaxFail } from '../../helpers';
import './style.css';

class Accounts extends React.Component {
  constructor() {
    super();

    this.setCurrentAccountId = this.setCurrentAccountId.bind(this);
    this.setSelectedTransaction = this.setSelectedTransaction.bind(this);

    this.state = {
      accounts: [],
      currentAccountId: '',
      selectedTransaction: {},
    };
  }

  componentDidMount() {
    this.fetchAccounts();
  }

  setCurrentAccountId(currentAccountId) {
    this.setState({ currentAccountId });
  }

  setSelectedTransaction(transaction) {
    this.setState({
      selectedTransaction: transaction,
    });
  }

  fetchAccounts(repeat = 0) {
    if (repeat === 2) {
      return false;
    }

    return fetch('https://api.getmondo.co.uk/accounts', {
      headers: {
        authorization: `Bearer ${localStorage.monzo_access_token}`,
      },
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(response => this.setState({
        accounts: response.accounts,
        currentAccountId: response.accounts[response.accounts.length - 1].id,
      }))
      .catch(error => ajaxFail(error, () => this.fetchAccounts(repeat + 1)));
  }

  render() {
    const { accounts, currentAccountId, selectedTransaction } = this.state;

    return (
      <div className="mzw-accounts">
        <div className="mzw-accounts__heading">
          <div>
            <AccountSelector
              currentAccountId={currentAccountId}
              accounts={accounts}
              setCurrentAccountId={this.setCurrentAccountId}
            />
            <Balance currentAccountId={currentAccountId} />
          </div>
        </div>
        <div className="mzw-accounts__transactions">
          <div style={{ flex: 1, marginRight: '0.5rem' }}>
            <Transactions
              setSelectedTransaction={this.setSelectedTransaction}
              currentAccountId={currentAccountId}
            />
          </div>
          <div style={{ flex: 1, marginLeft: '0.5rem' }}>
            <TransactionDetail transaction={selectedTransaction} />
          </div>
        </div>
      </div>
    );
  }
}

export default Accounts;
