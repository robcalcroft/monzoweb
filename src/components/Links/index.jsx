import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Links extends React.PureComponent {
  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }

  render() {
    return (
      <div>
        <Link className="mzw-link" to="/accounts">Accounts</Link>
        <Link className="mzw-link" to="/accounts/map">Map</Link>
        <a className="mzw-link" href="https://github.com/robcalcroft/monzoweb" rel="noopener noreferrer" target="_blank">Source Code</a>
        <a className="mzw-button" href="#" onClick={this.logout}>Logout</a>
      </div>
    );
  }
}

export default Links;
