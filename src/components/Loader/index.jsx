import React from 'react';
import logo from '../../assets/puff.svg';
import './style.css';

class Loader extends React.PureComponent {
  render() {
    return (
      <img className="mzw-loader" src={logo} alt="Loading" />
    );
  }
}

export default Loader;
