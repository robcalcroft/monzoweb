module.exports = {
  extends: 'airbnb',
  rules: {
    'react/prefer-stateless-function': 0,
    'class-methods-use-this': 0,
    'jsx-a11y/anchor-is-valid': [2, {
      'components': ['Link'],
      'specialLink': ['to', 'hrefLeft', 'hrefRight'],
      'aspects': ['noHref', 'invalidHref', 'preferButton'],
    }],
  },
  env: {
    browser: true,
  },
  globals: {
    google: true,
  },
};
