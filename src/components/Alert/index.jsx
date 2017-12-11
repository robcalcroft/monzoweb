import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Alert = ({ message }) => (
  <p className="col s12 alert">{message}</p>
);

Alert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Alert;
