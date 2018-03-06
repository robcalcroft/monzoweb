import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import monzoLogo from '../../assets/logo.svg';
import './style.css';

class Logo extends React.PureComponent {
  render() {
    const { large } = this.props;

    const logoClassnames = classNames({
      'mzw-logo': true,
      'mzw-logo--large': large,
    });

    return (
      <div className={logoClassnames}>
        <img src={monzoLogo} alt="Monzo Web" className="mzw-logo__image" />
        <span className="mzw-logo__text" aria-hidden>Web</span>
      </div>
    );
  }
}

Logo.defaultProps = {
  large: false,
};

Logo.propTypes = {
  large: PropTypes.bool,
};

export default Logo;
