import React from 'react';
import './style.css';

class Links extends React.PureComponent {
  render() {
    return (
      <div>
        <a className="mzw-link" href="https://google.com">Map</a>
        <a className="mzw-link" href="https://google.com">Logout</a>
      </div>
    );
  }
}

export default Links;
