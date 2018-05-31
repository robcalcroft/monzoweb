import React from 'react';
import { Router } from '@reach/router';
import Login from '../Login';
import Callback from '../Callback';
import AccountsList from '../AccountsList';
import TransactionsList from '../TransactionsList';

class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <AccountsList path="/">
          <TransactionsList path="/account/:accountId" />
        </AccountsList>
        <Login path="/login" />
        <Callback path="/callback" />
      </Router>
    );
  }
}

export default App;
