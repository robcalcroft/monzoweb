import React from 'react';
import Logo from '../Logo';
import Link from '../Link';
import './style.css';

class Nav extends React.Component {
  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }

  render() {
    return (
      <nav className="mzw-nav-container">
        <div className="mzw-nav">
          <Logo />
          <div>
            <Link href="/accounts" onColor padded>Home</Link>
            <Link href="/accounts/map" onColor padded>Map</Link>
            <button className="mzw-link mzw-link--padded mzw-link--onColor" onClick={this.logout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
