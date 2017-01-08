import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Container from 'components/Container';
import Callback from 'components/Callback';
import Main from 'components/Main';
import Login from 'components/Login';
import NoMatch from 'components/NoMatch';
import Map from 'components/Map';
import 'sweetalert/dist/sweetalert.css';
import 'sweetalert/dist/sweetalert.min.js';

export default class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route component={Container}>
          <Route path="/" component={localStorage.monzo_access_token ? Main : Login} default />
          <Route path="/callback" component={Callback} />
          <Route path="/map" component={Map} />
          <Route path="*" component={NoMatch} />
        </Route>
      </Router>
    );
  }
}
