import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import AccountSelector from '../AccountSelector';
import Balance from '../Balance';
import TransactionDetail from '../TransactionDetail';
import Transactions from '../Transactions';
import Map from '../Map';
import { accountsRequest as fetchAccounts, searchFilter as searchFilterAction } from '../../actions';
import './style.css';

class Accounts extends React.Component {
  componentDidMount() {
    this.props.fetchAccounts();
  }

  render() {
    const { searchVisible, updateSearchFilter, searchFilter } = this.props;
    const accountsHeadingClassname = ['mzw-accounts__heading']
      .concat(searchVisible ? 'mzw-accounts__heading--search-visible' : '')
      .join(' ');

    return (
      <div className="mzw-accounts">
        <div className="mzw-accounts__heading-container">
          <div className={accountsHeadingClassname}>
            <div>
              <AccountSelector />
              <Balance />
            </div>
            <div>
              <label htmlFor="search">
                <div className="mzw-accounts__search__label">Search</div>
                <input
                  onChange={event => updateSearchFilter(event.target.value)}
                  id="search"
                  className="mzw-accounts__search__input"
                  type="text"
                  value={searchFilter}
                />
              </label>
            </div>
          </div>
        </div>
        <Route
          exact
          path="/accounts"
          render={() => (
            <div className="mzw-accounts__transactions">
              <div className="mzw-accounts__transactions__list">
                <Transactions />
              </div>
              <div className="mzw-accounts__transactions__detail">
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
  searchVisible: PropTypes.bool.isRequired,
  searchFilter: PropTypes.string.isRequired,
  updateSearchFilter: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  searchVisible: state.search.visible,
  searchFilter: state.search.filter,
});

const mapDispatchToProps = dispatch => ({
  fetchAccounts: () => dispatch(fetchAccounts()),
  updateSearchFilter: value => dispatch(searchFilterAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
