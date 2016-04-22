import React from 'react';
import { intToAmount } from 'lib/utils';
import './style.scss';

export default class Overview extends React.Component {
  render() {
    const { props: { balance, spentToday, currency, name } } = this;

    return (
      <div className="accounts--overview">
        <div className="row">
          <div className="col s12 m4 center hide-on-small-only">
            <div className="grey-text text-darken-2">Account Name</div>
            <div style={{fontSize: '2rem'}}>{name || '-'}</div>
          </div>
          <div className="col s6 m4 center">
            <div className="grey-text text-darken-2">Your Card</div>
            <div style={{fontSize: '2rem'}}>{(intToAmount(balance, currency) || '-').replace('+', '')}</div>
          </div>
          <div className="col s6 m4 center">
            <div className="grey-text text-darken-2">Spent Today</div>
            <div style={{fontSize: '2rem'}}>{(intToAmount(spentToday, currency) || '-').replace('+', '')}</div>
          </div>
        </div>
      </div>
    );
  }
}
