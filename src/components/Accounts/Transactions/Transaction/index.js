import React from 'react';
import moment from 'moment';
import CategoryIcon from 'components/CategoryIcon';

export default class Transaction extends React.Component {


  static getTextualDecline(declinedReason){
	if(!declinedReason) return false;

	switch(declinedReason){
		case 'INSUFFICIENT_FUNDS':
			return 'Declined, you had insufficient funds.';
		case 'CARD_INACTIVE':
			return 'Declined, card inactive.';
		case 'CARD_BLOCKED':
			return 'Declined, card blocked.';
		case 'PIN_RETRY_COUNT_EXCEEDED':
			return 'Declined, PIN retry count exceeded.';
		case 'INVALID_CVC':
			return 'Declined, invalid CVC code used';
		default:
			return 'Declined, unknown \''+ declinedReason + '\'';
	}

  }

  render() {
    const {
      props: {
        amount,
        logo,
        merchant,
        id,
        transactionSelect,
        active,
        created,
        declinedReason,
        localAmount,
        counterParty,
        category
      }
    } = this;

    const formattedDeclinedReason = Transaction.getTextualDecline(declinedReason);

    return (
      <a
        href="#"
        className={`collection-item avatar row ${active ? 'active' : ''}`}
        data-tid={id}
        onClick={transactionSelect}
      >
        <div className="col s10">
          <div className="rounded circle">
            {logo ? <img src={logo} alt={counterParty || merchant} width="100%" /> : <CategoryIcon category={category} />}
          </div>
          <span className="title primary-text">{counterParty || merchant}{`${localAmount ? ' 🌎' : ''}`}</span>
          {
            formattedDeclinedReason ? (
              <p>{formattedDeclinedReason}</p>
            ) : (
              <p className="grey-text text-lighten-1">{moment(created).fromNow()}</p>
            )
          }
        </div>
        <div className="col s2">
          <p className={`secondary-content ${amount.includes('+') ? 'green-text' : 'black-text'}`} style={{fontSize: '1.5em'}}>
            {!formattedDeclinedReason ? amount : ''}
          </p>
        </div>
      </a>
    );
  }
}
