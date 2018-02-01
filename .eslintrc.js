module.exports = {
  extends: 'airbnb',
  rules: {
    'react/prefer-stateless-function': 0,
    'class-methods-use-this': 0,
  },
  env: {
    browser: true,
  },
  globals: {
    google: true,
  },
};
