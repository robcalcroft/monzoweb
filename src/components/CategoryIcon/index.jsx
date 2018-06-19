import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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

    const imgSrc = require(`../../assets/category-icons/${category}.svg`)
    
    const iconClassnames = classNames({
      [className]: className,
      [`mzw-category-icon--${category}-bg`]: true,
    });

    return (
      <img
        src={imgSrc}
        alt={category}
        className={iconClassnames}
      />
    );
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
