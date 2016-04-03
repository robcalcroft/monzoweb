import React from 'react';
import moment from 'moment';

export default class Transaction extends React.Component {
  render() {
    const { props: { amount, logo, merchant, id, transactionSelect, active, created } } = this;

    return (
      <a href='#' className={`collection-item avatar row ${active?'active':''}`} data-tid={id} onClick={transactionSelect}>
        <div className='col s10'>
          <img src={logo || require('assets/shopping-bag.svg')} alt={merchant} className='rounded circle' />
          <span className='title primary-text'>{merchant}</span>
          <p className='grey-text text-lighten-1'>{moment(created).fromNow()}</p>
        </div>
        <div className='col s2'>
          <p className={`secondary-content secondary-color-text ${amount.includes('+')?'green-text':''}`}>
            {amount}
          </p>
        </div>
      </a>
    );
  }
}
