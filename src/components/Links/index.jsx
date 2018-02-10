import React from 'react';
import './style.css';

class Links extends React.PureComponent {
  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }

  render() {
    return (
      <div>
        {/* <a className="mzw-link" href="https://google.com">Map</a> */}
        <a className="mzw-link" href="https://github.com/robcalcroft/monzoweb">Source Code</a>
        {/* eslint-disable jsx-a11y/anchor-is-valid */}
        <a className="mzw-button" href="#" onClick={this.logout}>Logout</a>
        {/* eslint-enable jsx-a11y/anchor-is-valid */}
      </div>
    );
  }
}

export default Links;
