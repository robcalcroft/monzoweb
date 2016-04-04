import React from 'react';
import Nav from 'components/Nav';
import './style.scss';

const logout = () => {
  localStorage.clear();
  window.location.href = '/';
};

const links = (
  <div>
    <li><a href='http://github.com/robcalcroft/mondoweb'>About</a></li>
    <li><a href='http://getmondo.co.uk'>Help</a></li>
    <li><a onClick={logout} href='#'>Logout</a></li>
  </div>
);

export default class Container extends React.Component {
  render() {
    return (
      <nav>
        <div className='nav-wrapper container--fluid'>
          <img src={require('assets/logo_horz_darkbg.png')} className='nav--logo' alt='Mondo logo' />
          <ul className='right hide-on-med-and-down'>{links}</ul>
          <ul id='slide-out' className='side-nav'>
            <img src={require('assets/logo_horz_darkbg.png')} className='nav--logo--menu center' alt='Mondo logo' />
            {links}
          </ul>
          <a href='#' data-activates='slide-out' className='button-collapse right'>
            <span className='nav--mobile-menu'>Menu</span>
          </a>
        </div>
      </nav>
    );
  }
}
