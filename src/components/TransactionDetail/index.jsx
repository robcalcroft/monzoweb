import React from 'react';
import PropTypes from 'prop-types';
import CategoryIcon from '../CategoryIcon';
import {
  getDeclineTranslation,
  processTransactionTitle,
  processTransactionAmount,
} from '../../helpers';
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
      counterparty,
    } = this.props.transaction;
    const { transaction } = this.props;

    if (Object.keys(this.props.transaction).length === 0) {
      return <h2 style={{ textAlign: 'center', color: 'lightgrey' }}>Select a transaction</h2>;
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

    return (
      <div className="mzw-transaction-detail">
        {map}
        {/* eslint-disable no-nested-ternary */}
        {(merchant && merchant.logo) ? (
          <img className="mzw-transaction-detail__logo" src={merchant.logo} alt="Logo" />
        ) : (counterparty && counterparty.name) ? (
          <CategoryIcon
            character={transaction.counterparty.name.charAt(0)}
            className="mzw-transaction-detail__logo"
          />
        ) : (
          <CategoryIcon
            category={category}
            className="mzw-transaction-detail__logo"
          />
        )}
        {/* eslint-enable no-nested-ternary */}
        <div className="mzw-transaction-detail__summary">
          <div className="mzw-transaction-detail__item mzw-transaction-detail__header">
            <div>{processTransactionTitle(transaction)}</div>
            <div>{processTransactionAmount(transaction)}</div>
          </div>
          <div className="mzw-transaction-detail__item mzw-transaction-detail__created">
            {new Date(created).toDateString()}
            &nbsp;at&nbsp;
            {new Date(created).toLocaleTimeString().substr(0, 5)}
          </div>
          {address && <div className="mzw-transaction-detail__item"><a href={`http://maps.google.com/?ll=${latitude},${longitude}`} target="_blank" rel="noopener noreferrer">{address.short_formatted}</a></div>}
          {category && (
            <div className={`mzw-transaction-detail__item mzw-transaction-detail__category mzw-transaction-detail__category--${category}`}>
              {category.replace(/_/g, ' ')}
            </div>
          )}
          {notes && <div className="mzw-transaction-detail__item">{notes}</div>}
          {declineReason && (
            <div className="mzw-transaction-detail__item">
              {getDeclineTranslation(declineReason)}
            </div>
          )}
          <div className="mzw-transaction-detail__item mzw-transaction-detail__description">{description}</div>
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
