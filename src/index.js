import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import './style/index.scss';

// Keep this until this is fixed: https://github.com/reactjs/react-router/issues/2182
console.error = (() => {
  const error = console.error
  return function (exception) {
    (exception && typeof exception === 'string' && exception.match(/change <Router /))
    ? undefined
    : error.apply(console, arguments)
  }
})()

const rootEl = document.getElementById('root');
ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('components/App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('components/App').default;
    ReactDOM.render(
      <AppContainer>
         <NextApp />
      </AppContainer>,
      rootEl
    );
  });
}
