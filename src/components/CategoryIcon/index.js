import React from 'react';
import './style.scss';

export default ({ category }) => (
  <img className={`category--${category}-bg`} src={require(`./icons/${category}.svg`)} alt={category} width="100%" />
);
