import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { balanceRequest } from '../../actions';
import { getHumanCostFromInteger } from '../../helpers';
import './style.css';

class Balance extends React.PureComponent {
  componentDidUpdate(prevProps) {
    if (prevProps.activeId !== this.props.activeId) {
      this.props.fetchBalance(this.props.activeId);
    }
  }

  render() {
    const {
      balance,
      spentToday,
      currency,
      fetching,
    } = this.props;

    const balanceClassnames = classNames({
      'mzw-balance': true,
      'mzw-balance--loading': fetching,
    });

    return (
      <div className={balanceClassnames}>
        <div className="mzw-balance__label-container">
          <div className="mzw-balance__label">Balance</div>
          <div className="mzw-balance__value">
            {fetching ? 'Loading...' : getHumanCostFromInteger(balance, currency).replace('+', '')}
          </div>
        </div>
        <div className="mzw-balance__label-container">
          <div className="mzw-balance__label">Spent Today</div>
          <div className="mzw-balance__value">
            {fetching ? 'Loading...' : getHumanCostFromInteger(spentToday, currency).replace('+', '')}
          </div>
        </div>
      </div>
    );
  }
}

Balance.propTypes = {
  activeId: PropTypes.string.isRequired,
  balance: PropTypes.string.isRequired,
  spentToday: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  fetchBalance: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  activeId: state.accounts.activeId,
  balance: state.balance.total,
  spentToday: state.balance.spentToday,
  currency: state.balance.currency,
  fetching: state.balance.fetching,
});

const mapDispatchToProps = dispatch => ({
  fetchBalance: accountId => dispatch(balanceRequest(accountId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Balance);
