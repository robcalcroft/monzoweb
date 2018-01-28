import React from 'react';
import Transactions from '../Transactions';
import AccountSelector from '../AccountSelector';
import Balance from '../Balance';
import TransactionDetail from '../TransactionDetail';
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
    this.loadAccounts();
  }

  setCurrentAccountId(event) {
    this.setState({
      currentAccountId: event.target.value,
    });
  }

  setSelectedTransaction(transaction) {
    this.setState({
      selectedTransaction: transaction,
    });
  }

  loadAccounts() {
    fetch('https://api.getmondo.co.uk/accounts', {
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
        accounts: response.accounts,
        currentAccountId: response.accounts[1].id,
      }))
      .catch(error => console.log(error));
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
