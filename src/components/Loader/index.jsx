import React from 'react';
import logo from '../../assets/logo-horizontal.svg';
import './style.css';

class Loader extends React.PureComponent {
  render() {
    return <img className="mp-loader" src={logo} alt="Loading" />;
  }
}

export default Loader;
