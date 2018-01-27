import React from 'react';
import monzoLogo from '../../assets/logo.svg';
import './style.css';

class Logo extends React.PureComponent {
  render() {
    return (
      <div className="mw-logo">
        <img src={monzoLogo} alt="The Monzo logo" className="mw-logo__image" />
        <span className="mw-logo__text">Web</span>
      </div>
    );
  }
}

export default Logo;
