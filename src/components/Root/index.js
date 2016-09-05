import React from 'react';
import Container from 'components/Container';
import './style.scss';

export default class Root extends React.Component {
  render() {
    return (
      <Container>
        <div className="root--container center">
          <p>Login below to authorise <b>monzoweb</b> to use your Monzo account.</p>
          <p>The site uses SSL to ensure your security, so please do check you have the padlock icon shown in the URL bar.</p>
          <a href={`https://auth.getmondo.co.uk/?client_id=${MONZO_CLIENT_ID}&redirect_uri=${MONZO_REDIRECT_URI}&response_type=code`} className="waves-effect waves-light btn">Login</a>
        </div>
      </Container>
    );
  }
}
