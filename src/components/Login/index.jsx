import React from 'react';
import './style.css';

class Login extends React.PureComponent {
  render() {
    return (
      <div className="mzw-login">
        <div>
          <div className="mzw-login__label">
            Click Login below to authorize<br />
            Monzo Web to use your Monzo account.
          </div>
          <a href={`https://auth.getmondo.co.uk/?client_id=${process.env.MONZO_CLIENT_ID}&redirect_uri=${process.env.MONZO_REDIRECT_URI}&response_type=code`}>Login</a>
        </div>
      </div>
    );
  }
}

export default Login;
