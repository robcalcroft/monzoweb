import React from 'react';

class Callback extends React.PureComponent {
  constructor() {
    super();

    this.getToken = this.getToken.bind(this);

    this.state = {
      error: undefined,
      fetching: false,
    };
  }

  componentDidMount() {
    this.getToken();
  }

  async getToken() {
    const parameters = {};
    window.location.search.replace('?', '').split('&').forEach((string) => {
      const [key, value] = string.split('=');
      if (key) parameters[key] = value;
    });

    if (!parameters.code) this.setState({ error: 'There doesn\'t seem to be any authorzation to use your account from Monzo, please try clicking the link in your email again' });

    this.setState({ fetching: true });

    try {
      const response = await fetch(`/api/token?code=${parameters.code}`);
      const { access_token: accessToken, refresh_token: refreshToken } = await response.json();

      if (!accessToken || !refreshToken) throw Error('There was an issue with the response we got from Monzo, please try again');

      localStorage.setItem('monzoAccessToken', accessToken);
      localStorage.setItem('monzoRefreshToken', refreshToken);

      window.location.href = '/';
    } catch (error) {
      this.setState({
        error: error.message || 'There was an error talking to Monzo, please try logging in again',
      });
    } finally {
      this.setState({ fetching: false });
    }
  }

  render() {
    const { error, fetching } = this.state;
    return <div>Callback - Error: {error} - Fetching: {fetching}</div>;
  }
}

export default Callback;
