import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Container from './Container';
import Callback from './Callback';
import Main from './Main';
import Login from './Login';
import NoMatch from './NoMatch';
import Map from './Map';

const App = () => (
  <Router history={browserHistory}>
    <Route component={Container}>
      <Route path="/" component={localStorage.monzo_access_token ? Main : Login} default />
      <Route path="/callback" component={Callback} />
      <Route path="/map" component={Map} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
);

export default App;
