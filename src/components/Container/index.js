import React from 'react';
import Nav from 'components/Nav';

export default class Container extends React.Component {
  render() {
    return (
      <div className={localStorage.monzo_access_token ? 'loggedIn' : 'loggedOut'}>
        <Nav />
        <div className="wrapper">
          {this.props.children}
        </div>
      </div>
    );
  }
}
