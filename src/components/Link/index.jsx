import React from 'react';
import PropTypes from 'prop-types';
import { Link as RRLink } from 'react-router-dom';
import './style.css';

class Link extends React.PureComponent {
  render() {
    const {
      external,
      href,
      children,
      onColor,
      padded,
      ...rest
    } = this.props;
    const externalProps = {
      rel: 'noopener noreferrer',
      target: '_blank',
    };
    let className = 'mzw-link ';

    if (onColor) className += 'mzw-link--onColor ';
    if (padded) className += 'mzw-link--padded';

    return external
      ? <a {...externalProps} {...rest} href={href} className={className}>{children}</a>
      : <RRLink {...rest} className={className} to={href}>{children}</RRLink>;
  }
}

Link.defaultProps = {
  external: false,
  onColor: false,
  padded: false,
  onClick: undefined,
};

Link.propTypes = {
  external: PropTypes.bool,
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onColor: PropTypes.bool,
  padded: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Link;
