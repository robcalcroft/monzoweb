import React from 'react';
import PropTypes from 'prop-types';
import { getDeclineTranslation, processTransactionTitle } from '../../helpers';
import './style.css';

class TransactionDetail extends React.PureComponent {
  render() {
    const {
      merchant,
      created,
      notes,
      category,
      decline_reason: declineReason,
      description,
    } = this.props.transaction;
    const { transaction } = this.props;

    if (Object.keys(this.props.transaction).length === 0) {
      return <h1>Nothing selected</h1>;
    }

    const address = merchant && merchant.address;
    const latitude = address && address.latitude;
    const longitude = address && address.longitude;
    // let tags = [];

    // if (merchant) {
    //   tags = merchant.metadata.suggested_tags ? merchant.metadata.suggested_tags.split(' ').filter(tag => tag !== '') : [];
    // }

    const DEFAULT_ZOOM = '16';
    const zoom = (merchant && merchant.address.zoom_level) || DEFAULT_ZOOM;

    const map = (!merchant || merchant.online || !latitude || !longitude) ? (
      <div className="mzw-transaction-detail__map" />
    ) : (
      <div className="mzw-transaction-detail__map" style={{ backgroundImage: `url('https://maps.googleapis.com/maps/api/staticmap?size=640x320&zoom=${zoom}&markers=${latitude},${longitude}&scale=1&key=${process.env.GOOGLE_MAPS_API_KEY}')` }} />
    );
    console.log(this.props.transaction);
    return (
      <div className="mzw-transaction-detail">
        {map}
        <div className="mzw-transaction-detail__summary">
          <div className="mzw-transaction-detail__item"><b>{processTransactionTitle(transaction)}</b></div>
          <div className="mzw-transaction-detail__item">{new Date(created).toDateString()} {new Date(created).toLocaleTimeString()}</div>
          {address && <div className="mzw-transaction-detail__item"><a href={`http://maps.google.com/?ll=${latitude},${longitude}`} target="_blank" rel="noopener noreferrer">{address.short_formatted}</a></div>}
          {category && <div className="mzw-transaction-detail__item">{category.replace(/_/g, ' ')}</div>}
          {notes && <div className="mzw-transaction-detail__item">{notes}</div>}
          {declineReason && <div className="mzw-transaction-detail__item">{getDeclineTranslation(declineReason)}</div>}
          <div className="mzw-transaction-detail__item">{description}</div>
          {/*
          {tags && (
            <div style={{ marginTop: '10px' }}>
              {tags.map(tag => (
                <div key={tag} className="chip" style={{ marginRight: '2px' }}>{tag}</div>
              ))}
            </div>
          )} */}
        </div>
      </div>
    );
  }
}

TransactionDetail.propTypes = {
  transaction: PropTypes.shape({
    merchant: PropTypes.object,
    notes: PropTypes.string,
    created: PropTypes.string,
    decline_reason: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default TransactionDetail;
