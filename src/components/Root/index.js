import React from 'react';
import Container from 'components/Container';
import './style.scss';

export default class Root extends React.Component {
  render() {
    return (
      <Container>
        <div className='root--container center'>
          <p>Login below to authorise <b>mondoweb</b> to use your Mondo account.</p>
          <p>The site uses SSL to ensure your security, so please do check you have the padlock icon shown in the URL bar.</p>
          <a href={`https://auth.getmondo.co.uk/?client_id=${MONDO_CLIENT_ID}&redirect_uri=http://localhost:8000/callback&response_type=code`} className="waves-effect waves-light btn">Login</a>
        </div>
      </Container>
    );
  }
}
