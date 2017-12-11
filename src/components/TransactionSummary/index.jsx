import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TransactionImage from '../../components/TransactionImage';
import { getDeclineTranslation, isEmpty } from '../../lib/utils';
import './style.scss';

const TransactionSummary = ({
  transaction,
  transaction: {
    title,
    category,
    notes,
    merchant,
    created,
    decline_reason: declineReason,
    amount,
    localAmount,
  },
}) => {
  if (isEmpty(transaction)) {
    return <h4 className="center grey-text text-lighten-2">No transaction selected</h4>;
  }

  const address = merchant && merchant.address;
  const latitude = address && address.latitude;
  const longitude = address && address.longitude;
  let tags = [];

  if (merchant) {
    tags = merchant.metadata.suggested_tags ? merchant.metadata.suggested_tags.split(' ').filter(tag => tag !== '') : [];
  }

  const DEFAULT_ZOOM = '16';
  const zoom = (merchant && merchant.address.zoom_level) || DEFAULT_ZOOM;

  const Map = (!merchant || merchant.online || !latitude || !longitude) ? (
    <div className="transaction--overview--map" />
  ) : (
    <div className="transaction--overview--map" style={{ backgroundImage: `url('https://maps.googleapis.com/maps/api/staticmap?size=640x320&zoom=${zoom}&markers=${latitude},${longitude}&scale=1&key=${GOOGLE_MAPS_API_KEY}')` }} />
  );

  return (
    <div className="card fadein" style={{ margin: 0 }}>
      <div className="transaction--overview">
        {Map}
        <div className="transaction--overview--logo">
          <TransactionImage transaction={transaction} large />
        </div>
        <span className={`transaction--amount ${(amount && amount.includes('+')) ? 'green-text' : 'black-text'}`}>
          {amount}{localAmount ? <span className="grey-text text-lighten-1"> / {localAmount}</span> : ''}
        </span>
      </div>
      <div className="card-content">
        <h5>{title}{localAmount ? ' 🌎' : ''}</h5>
        <div className="grey-text text-lighten-1">{moment(created).format('dddd MMMM Do YYYY [at] h:mma')}</div>
        {notes && <div className="black-text" style={{ margin: '0.25em 0', fontSize: '1.15em' }}>{notes}</div>}
        {declineReason && <div className="red-text" style={{ margin: '0.25em 0', fontSize: '1.15em' }}>{getDeclineTranslation(declineReason)}</div>}
        {address && <div><a href={`http://maps.google.com/?ll=${latitude},${longitude}`} target="_blank">{address.short_formatted}</a></div>}
        {category && <div className={`category category--${category}`}>{category.replace(/_/g, ' ')}</div>}
        {tags && (
        <div style={{ marginTop: '10px' }}>
          {tags.map(tag => (
            <div key={tag} className="chip" style={{ marginRight: '2px' }}>{tag}</div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

TransactionSummary.propTypes = {
  transaction: PropTypes.shape({
    title: PropTypes.string,
    category: PropTypes.string,
    notes: PropTypes.string,
    merchant: PropTypes.object,
    created: PropTypes.string,
    decline_reason: PropTypes.string,
    amount: PropTypes.string,
    localAmount: PropTypes.bool,
  }).isRequired,
};

export default TransactionSummary;
