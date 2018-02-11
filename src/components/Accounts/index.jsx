import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import AccountSelector from '../AccountSelector';
import Balance from '../Balance';
import TransactionDetail from '../TransactionDetail';
import Transactions from '../Transactions';
import Map from '../Map';
import { accountsRequest as fetchAccounts } from '../../actions';
import './style.css';

class Accounts extends React.Component {
  componentDidMount() {
    this.props.fetchAccounts();
  }

  render() {
    return (
      <div className="mzw-accounts">
        <div className="mzw-accounts__heading">
          <div>
            <AccountSelector />
            <Balance />
          </div>
        </div>
        <Route
          exact
          path="/accounts"
          render={() => (
            <div className="mzw-accounts__transactions">
              <div style={{ flex: 1, marginRight: '0.5rem' }}>
                <Transactions />
              </div>
              <div style={{ flex: 1, marginLeft: '0.5rem' }}>
                <TransactionDetail />
              </div>
            </div>
          )}
        />
        <Route path="/accounts/map" component={Map} />
      </div>
    );
  }
}

Accounts.propTypes = {
  fetchAccounts: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchAccounts: () => dispatch(fetchAccounts()),
});

export default connect(null, mapDispatchToProps)(Accounts);
