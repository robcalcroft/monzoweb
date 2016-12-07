import React from 'react';
import Nav from 'components/Nav';
import { once } from 'lib/utils';
import './style.scss';

const logout = () => {
  localStorage.clear();
  window.location.href = '/';
};

const links = (
  <div>
    {localStorage.monzo_access_token ? (
      <li className={window.location.pathname === '/accounts' ? 'active' : ''}>
        <a href="/accounts">Accounts</a>
      </li>
    ) : ''}
    {localStorage.monzo_access_token ? (
      <li className={window.location.pathname === '/map' ? 'active' : ''}>
        <a href="/map">Map</a>
      </li>
    ) : ''}
    <li><a href="http://github.com/robcalcroft/monzoweb">About</a></li>
    <li><a href="http://monzo.com">Help</a></li>
    {localStorage.monzo_access_token ? (
      <li><a onClick={logout} href="#">Logout</a></li>
    ) : ''}
  </div>
);

export default class Container extends React.Component {

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
      <nav>
        <div className="wrapper">
          <img src={require('assets/logo.svg')} className="nav--logo" alt="Monzo logo" />
          <ul className="right hide-on-med-and-down">{links}</ul>
          <ul id="slide-out" className="side-nav">
            <img src={require('assets/logo.svg')} className="nav--logo--menu center" alt="Monzo logo" />
            {links}
          </ul>
          <a href="#" data-activates="slide-out" className="button-collapse right">
            <span className="nav--mobile-menu">Menu</span>
          </a>
        </div>
      </nav>
    );
  }
}
