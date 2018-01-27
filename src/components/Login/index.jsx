import React from 'react';

class Login extends React.PureComponent {
  render() {
    return <a href={`https://auth.getmondo.co.uk/?client_id=${process.env.MONZO_CLIENT_ID}&redirect_uri=${process.env.MONZO_REDIRECT_URI}&response_type=code`}>Login</a>;
  }
}

export default Login;
