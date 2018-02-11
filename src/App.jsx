import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import saga from './sagas';
import Root from './components/Root';
import './style.css';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line no-underscore-dangle, max-len
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(saga);

class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Root />
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('mzw'));
