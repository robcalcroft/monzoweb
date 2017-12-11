import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './style/index.scss';

/* eslint-disable */
// Keep this until this is fixed: https://github.com/reactjs/react-router/issues/2182
console.error = (() => {
  const error = console.error;
  return function (exception) {
    (exception && typeof exception === 'string' && exception.match(/change <Router /))
      ? undefined
      : error.apply(console, arguments);
  };
})();
/* eslint-enable */

const rootEl = document.getElementById('monzoweb');

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootEl,
);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./components/App').default; // eslint-disable-line global-require
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      rootEl,
    );
  });
}
