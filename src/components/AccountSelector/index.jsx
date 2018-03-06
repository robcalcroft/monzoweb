import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { setActiveAccountId as setActiveAccountIdAction } from '../../actions';
import './style.css';

class AccountSelector extends React.PureComponent {
  getAccountType(account) {
    return account.type.includes('prepaid') ? 'Pre-paid' : 'Current Account';
  }

  render() {
    const { activeId, accounts, setActiveAccountId } = this.props;
    const loading = accounts.length === 0;

    const accountSelectorClassname = classNames({
      'mzw-account-selector': true,
      'mzw-account-selector--loading': loading,
    });

    return (
      <div className={accountSelectorClassname}>
        <div className="mzw-account-selector-container">
          <div className="mzw-account-selector__label">Account</div>
          <span>
            {loading ? (
              <div className="mzw-selector">Loading...</div>
            ) : (
              accounts.map(account => (
                <button
                  className={`mzw-selector ${(account.id === activeId) ? 'mzw-selector--selected' : ''}`}
                  key={account.id}
                  onClick={() => setActiveAccountId(account.id)}
                >
                  {this.getAccountType(account)}
                </button>
              ))
            )}
          </span>
        </div>
      </div>
    );
  }
}

AccountSelector.propTypes = {
  activeId: PropTypes.string.isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  setActiveAccountId: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  activeId: state.accounts.activeId,
  accounts: state.accounts.list,
});

const mapDispatchToProps = dispatch => ({
  setActiveAccountId: id => dispatch(setActiveAccountIdAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountSelector);
