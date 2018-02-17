import React from 'react';
import Loader from '../Loader';
import { checkStatus } from '../../helpers';
import './style.css';

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
        error: 'No login code present in URL, try logging into Monzo Web again',
      });
    }

    return fetch(`/api/token?code=${code.code}`)
      .then(checkStatus)
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
      <div className="mzw-callback">
        <h1 style={{ textAlign: 'center' }}>{this.state.error || 'Logging you in to Monzo...'}</h1>
        <Loader />
      </div>
    );
  }
}

export default About;
