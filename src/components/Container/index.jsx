import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../../components/Nav';

const Container = ({ children }) => (
  <div className={localStorage.monzo_access_token ? 'loggedIn' : 'loggedOut'}>
    <Nav />
    <div className="wrapper">
      {children}
    </div>
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
