import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Root from 'components/Root';
import Callback from 'components/Callback';
import Accounts from 'components/Accounts';

export default class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Root}/>
        <Route path='/callback' component={Callback} />
        <Route path='/accounts' component={Accounts} />
      </Router>
    );
  }
}
