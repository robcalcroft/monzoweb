import React from 'react';
import PropTypes from 'prop-types';
import { nameToHue } from '../../helpers';
import './style.css';

class CategoryIcon extends React.PureComponent {
  render() {
    const { category, className, character } = this.props;

    if (character) {
      return (
        <div
          className={`mzw-category-icon--character ${className}`}
          style={{ backgroundColor: `hsl(${nameToHue(character)}, 37%, 50%)` }}
        >
          {character}
        </div>
      );
    }

    const iconSvg = require(`../../assets/category-icons/${category}.svg`); // eslint-disable-line import/no-dynamic-require, global-require
    return <img src={iconSvg} alt={category} className={`mzw-category-icon--${category}-bg ${className}`} />;
  }
}

CategoryIcon.defaultProps = {
  category: 'general',
  className: '',
  character: '',
};

CategoryIcon.propTypes = {
  category: PropTypes.string,
  className: PropTypes.string,
  character: PropTypes.string,
};

export default CategoryIcon;
