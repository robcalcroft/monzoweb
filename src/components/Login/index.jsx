import React from 'react';
import Logo from '../Logo';
import './style.css';

class Login extends React.PureComponent {
  render() {
    return (
      <div className="mzw-login">
        <div className="mzw-login__info">
          <Logo large />
        </div>
        <div className="mzw-login__form">
          <h1>Log in</h1>
          <p>
            Authorize Monzo Web to use your Monzo account.
          </p>
          <a className="mzw-button" href={`https://auth.monzo.com/?client_id=${process.env.MONZO_CLIENT_ID}&redirect_uri=${process.env.MONZO_REDIRECT_URI}&response_type=code`}>
            Authorize with Monzo
          </a>
        </div>
      </div>
    );
  }
}

export default Login;
