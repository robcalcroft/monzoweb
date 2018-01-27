import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

class AccountSelector extends React.PureComponent {
  render() {
    const { currentAccountId, accounts, setCurrentAccountId } = this.props;

    return (
      <div>
        <div className="mp-account-selector__label">Select Account</div>
        <select
          name="accounts"
          id="accounts"
          value={currentAccountId}
          onChange={setCurrentAccountId}
        >
          {accounts.length === 0 ? (
            <option hidden>Loading...</option>
          ) : (
            accounts.map(account => (
              <option key={account.id} value={account.id}>
                {account.description} ({account.type})
              </option>
            ))
          )}
        </select>
      </div>
    );
  }
}

AccountSelector.propTypes = {
  currentAccountId: PropTypes.string.isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  setCurrentAccountId: PropTypes.func.isRequired,
};

export default AccountSelector;
