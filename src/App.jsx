import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Root from './components/Root';
import './style.css';

class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <Root />
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('mzw'));
