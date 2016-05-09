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
    {localStorage.mondo_access_token ? (
      <li className={window.location.pathname === '/accounts' ? 'active' : ''}>
        <a href="/accounts">Accounts</a>
      </li>
    ) : ''}
    <li><a href="http://github.com/robcalcroft/mondoweb">About</a></li>
    <li><a href="http://getmondo.co.uk">Help</a></li>
    {localStorage.mondo_access_token ? (
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
        <div className="nav-wrapper container--fluid">
          <img src={require('assets/logo_horz_darkbg.png')} className="nav--logo" alt="Mondo logo" />
          <ul className="right hide-on-med-and-down">{links}</ul>
          <ul id="slide-out" className="side-nav">
            <img src={require('assets/logo_horz_darkbg.png')} className="nav--logo--menu center" alt="Mondo logo" />
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
