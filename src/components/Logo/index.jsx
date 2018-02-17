import React from 'react';
import monzoLogo from '../../assets/logo.svg';
import './style.css';

class Logo extends React.PureComponent {
  render() {
    return (
      <div className="mzw-logo">
        <img src={monzoLogo} alt="The Monzo logo" className="mzw-logo__image" />
        <span className="mzw-logo__text">Web</span>
      </div>
    );
  }
}

export default Logo;
