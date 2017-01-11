import React from 'react';
import { Link } from 'react-router';
import { once } from 'lib/utils';
import './style.scss';

const logout = () => {
  localStorage.clear();
  window.location.href = '/';
};

const Links = () => localStorage.monzo_access_token ? (
  <div>
    <li className={window.location.pathname === '/' ? 'active' : ''}>
      <Link to="/">Home</Link>
    </li>
    <li className={window.location.pathname === '/map' ? 'active' : ''}>
      <Link to="/map">Map</Link>
    </li>
    <li><a onClick={logout} href="#">Logout</a></li>
    <li>
      <a href="https://github.com/robcalcroft/monzoweb/" target="_blank">
        <svg aria-hidden="true" style={{ transform: 'translateY(0.5em)', fill: 'white' }} height="28"  width="28" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
      </a>
    </li>
  </div>
) : null;

export default class Nav extends React.Component {

  constructor() {
    super();

    this.initSideMenu = once(this.initSideMenu);
  }

  componentDidMount() {
    this.initSideMenu();
  }

  initSideMenu() {
    $('.button-collapse').sideNav({
      edge: 'right',
      closeOnClick: true
    });
  }

  render() {
    return (
      <nav className="nav">
        <div className="wrapper">
          <Link to="/" className="nav--logo">
            <img className="nav--logo-image" src={require('assets/logo.svg')} alt="Monzo logo" />
            <span className="nav--logo-text">Web</span>
          </Link>
          <ul className="right hide-on-med-and-down"><Links /></ul>
          {localStorage.monzo_access_token ? (
            <div>
              <ul id="slide-out" className="side-nav">
                <img src={require('assets/logo.svg')} className="nav--logo--menu center" alt="Monzo logo" />
                <Links />
              </ul>
              <a href="#" data-activates="slide-out" className="button-collapse right">
                <span className="nav--mobile-menu">Menu</span>
              </a>
            </div>
          ) : null}
        </div>
      </nav>
    );
  }
}
