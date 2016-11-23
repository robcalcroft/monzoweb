import React from 'react';
import Nav from 'components/Nav';
import Container from 'components/Container';

export default class Analytics extends React.Component {
  render() {
    if (!localStorage.monzo_access_token) {
      window.location.href = '/';
      return false;
    }

    return (
      <div id="monzoweb">
        <Nav />
	
      </div>
    );
  }

}
