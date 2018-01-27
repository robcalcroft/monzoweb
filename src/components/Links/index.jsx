import React from 'react';
import './style.css';

class Links extends React.PureComponent {
  render() {
    return (
      <div>
        <a className="mp-link" href="https://google.com">Map</a>
        <a className="mp-link" href="https://google.com">Logout</a>
      </div>
    );
  }
}

export default Links;
