import React from 'react';
import PropTypes from 'prop-types';
import { intToAmount } from '../../lib/utils';

const AccountInfo = ({
  balance,
  spentToday,
  currency,
  name,
}) => (
  <div className="accounts--overview">
    <div className="row">
      <div className="col s12 m4 l12 hide-on-small-only" style={{ marginBottom: 20 }}>
        <div className="grey-text text-darken-2">Account Name</div>
        <div style={{ fontSize: '2rem' }}>{name || '-'}</div>
      </div>
      <div className="col s6 m4 l12" style={{ marginBottom: 20 }}>
        <div className="grey-text text-darken-2">Your Card</div>
        <div style={{ fontSize: '2rem' }}>{(intToAmount(balance, currency) || '-').replace('+', '')}</div>
      </div>
      <div className="col s6 m4 l12" style={{ marginBottom: 20 }}>
        <div className="grey-text text-darken-2">Spent Today</div>
        <div style={{ fontSize: '2rem' }}>{(intToAmount(spentToday, currency) || '-').replace('+', '')}</div>
      </div>
    </div>
  </div>
);

AccountInfo.propTypes = {
  balance: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  spentToday: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  currency: PropTypes.string,
  name: PropTypes.string.isRequired,
};

AccountInfo.defaultProps = {
  currency: 'GBP',
};

export default AccountInfo;
