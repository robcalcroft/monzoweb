import React from 'react';
import Link from '../Link';
import Button from '../Button';

class Links extends React.PureComponent {
  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }

  render() {
    return (
      <div>
        <Link href="/accounts" onColor padded>Accounts</Link>
        <Link href="/accounts/map" onColor padded>Map</Link>
        <Link href="https://github.com/robcalcroft/monzoweb" external onColor padded>Source Code</Link>
        <Button onClick={this.logout}>Logout</Button>
      </div>
    );
  }
}

export default Links;
