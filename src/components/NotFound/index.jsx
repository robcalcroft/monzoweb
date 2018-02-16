import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Button from '../Button';
import './style.css';

class NotFound extends React.PureComponent {
  render() {
    return (
      <div className="mzw-not-found">
        <h2>This link doesn&apos;t exist, check it and try again</h2>
        <span><Button onClick={this.props.history.goBack}>Go back</Button></span>
      </div>
    );
  }
}

NotFound.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(NotFound);
