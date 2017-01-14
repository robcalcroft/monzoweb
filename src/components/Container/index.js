import React from 'react';
import Nav from 'components/Nav';

export default ({ children }) => (
  <div className={localStorage.monzo_access_token ? 'loggedIn' : 'loggedOut'}>
    <Nav />
    <div className="wrapper">
      {children}
    </div>
  </div>
);
