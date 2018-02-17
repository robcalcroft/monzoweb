import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchVisible as searchVisibleAction } from '../../actions';
import Link from '../Link';
import Button from '../Button';

class Links extends React.PureComponent {
  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }

  render() {
    const { searchVisible, toggleSearchVisible } = this.props;

    return (
      <div>
        <Link href="/accounts" onColor padded>Accounts</Link>
        <Link href="/accounts/map" onColor padded>Map</Link>
        <Link href="https://github.com/robcalcroft/monzoweb" external onColor padded>Source Code</Link>
        <span className="mzw-button-group--right-align">
          <Route
            exact
            path="/accounts"
            render={() => (
              <Button onClick={toggleSearchVisible}>{searchVisible ? 'Hide ' : ''}Search</Button>
            )}
          />
          <Button onClick={this.logout}>Logout</Button>
        </span>
      </div>
    );
  }
}

Links.propTypes = {
  searchVisible: PropTypes.bool.isRequired,
  toggleSearchVisible: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  searchVisible: state.search.visible,
});

const mapDispatchToProps = dispatch => ({
  toggleSearchVisible: () => dispatch(searchVisibleAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Links);
