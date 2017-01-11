import React from 'react';
import './style.scss';

export default class CategoryIcon extends React.Component {
  render() {
    const { category = 'general' } = this.props;
    return <img className={`category--${category}-bg`} src={require(`./icons/${category}.svg`)} alt={category} width="100%" />;
  }
}
