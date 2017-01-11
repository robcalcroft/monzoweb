import React from 'react';
import Alert from 'components/Alert';
import { checkStatus, showErrorMessage } from 'lib/utils';
import 'whatwg-fetch';

// Component states

const COMP_LOADING = (
  <div>
    <div className="progress" style={{marginTop: '5vh'}}>
        <div className="indeterminate"></div>
    </div>
    <h5 className="center">Please wait while we authenticate your details</h5>
  </div>
);

const COMP_NO_CODE = (
  <Alert message="No authorization code found. Make sure the URL has something like 'code=12345678910' in it." />
);

const COMP_AJAX_ERROR = (
  <Alert message="Internal error - looks like that authorisation code isn't working. If this keeps happening file an issue at https://github.com/robcalcroft/monzoweb/issues" />
);

export default class Callback extends React.Component {
  constructor() {
    super();

    this.state = {
      component: COMP_LOADING
    };
  }

  componentDidMount() {
    const queryString = window.location.search.replace('?', '').split('&').map(string => {
      let query = {};
      query[string.split('=')[0]] = string.split('=')[1];
      return query;
    });

    const code = queryString.find(query => !!query.code);

    if (!code || !code.code) {
      return this.setState({
        component: COMP_NO_CODE
      });
    }

    fetch(`/token?code=${code.code}`)
      .then(checkStatus)
      .then(response => response.json())
      .then(body => {
        localStorage.setItem('monzo_access_token', body.access_token);
        localStorage.setItem('monzo_refresh_token', body.refresh_token);

        window.location.href = '/';
      })
      .catch(error => {
        showErrorMessage(error);

        return this.setState({
          component: COMP_AJAX_ERROR
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.component}
      </div>
    );
  }
}
