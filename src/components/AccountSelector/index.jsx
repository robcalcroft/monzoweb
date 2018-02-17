import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setActiveAccountId as setActiveAccountIdAction } from '../../actions';
import Button from '../Button';
import './style.css';

class AccountSelector extends React.PureComponent {
  getAccountType(account) {
    return account.type.includes('prepaid') ? 'Pre-paid' : 'Current Account';
  }

  render() {
    const { activeId, accounts, setActiveAccountId } = this.props;

    return (
      <div>
        <div className="mzw-account-selector__label">Account</div>
        {accounts.length === 0 ? (
          <Button>Loading...</Button>
        ) : (
          accounts.map(account => (
            <Button
              key={account.id}
              onClick={() => setActiveAccountId(account.id)}
              selected={account.id === activeId}
            >
              {this.getAccountType(account)}
            </Button>
          ))
        )}
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
