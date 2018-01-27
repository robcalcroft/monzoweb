import React from 'react';
import Transactions from '../Transactions';
import AccountSelector from '../AccountSelector';
import Balance from '../Balance';
import './style.css';

class Accounts extends React.Component {
  constructor() {
    super();

    this.setCurrentAccountId = this.setCurrentAccountId.bind(this);

    this.state = {
      accounts: [],
      currentAccountId: '',
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
    const { accounts, currentAccountId } = this.state;

    return (
      <div className="mp-accounts">
        <div className="mp-accounts__heading">
          <AccountSelector
            currentAccountId={currentAccountId}
            accounts={accounts}
            setCurrentAccountId={this.setCurrentAccountId}
          />
          <Balance currentAccountId={currentAccountId} />
        </div>
        <div className="mp-accounts__transactions">
          <Transactions currentAccountId={currentAccountId} />
        </div>
      </div>
    );
  }
}

export default Accounts;
