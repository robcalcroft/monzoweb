import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import Callback from '../Callback';
import Accounts from '../Accounts';
import Login from '../Login';
import Links from '../Links';
import Logo from '../Logo';

class Root extends React.Component {
  render() {
    return (
      <Fragment>
        <nav>
          <div>
            <Logo />
            <ProtectedRoute path="/accounts" component={Links} />
          </div>
        </nav>
        <main>
          <Route
            path="/"
            render={() => <Redirect to={localStorage.monzo_access_token ? '/accounts' : '/login'} />}
            exact
          />
          <Route path="/login" component={Login} />
          <Route path="/callback" component={Callback} />
          <ProtectedRoute path="/accounts" component={Accounts} />
        </main>
      </Fragment>
    );
  }
}

export default Root;
