import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

/* eslint-disable import/no-dynamic-require, global-require */
const CategoryIcon = ({ category }) => (
  <img className={`category--${category}-bg`} src={require(`./icons/${category}.svg`)} alt={category} width="100%" />
);

CategoryIcon.propTypes = {
  category: PropTypes.string.isRequired,
};

export default CategoryIcon;
