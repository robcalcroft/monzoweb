import React, { Fragment } from 'react';

class About extends React.Component {
  constructor() {
    super();

    this.state = {
      error: '',
    };
  }

  componentDidMount() {
    this.getToken();
  }

  getToken() {
    const queryString = window.location.search.replace('?', '').split('&').map((string) => {
      const query = {};
      [, query[string.split('=')[0]]] = string.split('=');
      return query;
    });

    const code = queryString.find(query => !!query.code);

    if (!code || !code.code) {
      return this.setState({
        error: 'No error code',
      });
    }

    return fetch(`/api/token?code=${code.code}`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }
        throw new Error('Broken server');
      })
      .then(response => response.json())
      .then((body) => {
        localStorage.setItem('monzo_access_token', body.access_token);
        localStorage.setItem('monzo_refresh_token', body.refresh_token);

        window.location.href = '/accounts';
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }

  render() {
    return (
      <Fragment>
        <h1>Loading...</h1>
        <h3>{this.state.error}</h3>
      </Fragment>
    );
  }
}

export default About;
