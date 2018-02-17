import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from '../Link';
import CategoryIcon from '../CategoryIcon';
import Chip from '../Chip';
import {
  getDeclineTranslation,
  processTransactionTitle,
  processTransactionAmount,
  getHumanCostFromInteger,
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
      return <h2 className="mzw-transaction-detail__empty">Select a transaction</h2>;
    }

    const address = merchant && merchant.address;
    const latitude = address && address.latitude;
    const longitude = address && address.longitude;
    const isGBP = transaction.local_currency === 'GBP';
    let tags = [];

    if (merchant) {
      tags = merchant.metadata.suggested_tags ? merchant.metadata.suggested_tags.split(' ').filter(tag => tag !== '') : [];
    }

    const DEFAULT_ZOOM = '16';
    const zoom = (merchant && merchant.address.zoom_level) || DEFAULT_ZOOM;
    const hideMap = !merchant || merchant.online || !latitude || !longitude;
    const logoClassName = `mzw-transaction-detail__logo ${hideMap ? 'mzw-transaction-detail__logo--map-unavailable' : ''}`;

    const map = hideMap ? (
      <div className="mzw-transaction-detail__map mzw-transaction-detail__map--unavailable" />
    ) : (
      <div className="mzw-transaction-detail__map" style={{ backgroundImage: `url('https://maps.googleapis.com/maps/api/staticmap?size=640x320&zoom=${zoom}&markers=${latitude},${longitude}&scale=1&key=${process.env.GOOGLE_MAPS_API_KEY}')` }} />
    );

    return (
      <div className="mzw-transaction-detail">
        {map}
        {/* eslint-disable no-nested-ternary */}
        {(merchant && merchant.logo) ? (
          <img className={logoClassName} src={merchant.logo} alt="Logo" />
        ) : (counterparty && counterparty.name) ? (
          <CategoryIcon
            character={transaction.counterparty.name.charAt(0)}
            className={logoClassName}
          />
        ) : (
          <CategoryIcon
            category={category}
            className={logoClassName}
          />
        )}
        {/* eslint-enable no-nested-ternary */}
        <div className="mzw-transaction-detail__summary">
          <div className="mzw-transaction-detail__item mzw-transaction-detail__header">
            <div>{processTransactionTitle(transaction)}</div>
            <div>
              {processTransactionAmount(transaction)}
              {(!isGBP && transaction.notes !== 'Active card check') && (
                <span className="mzw-transaction-detail__international-currency">
                  &nbsp;/&nbsp;
                  {getHumanCostFromInteger(transaction.local_amount, transaction.local_currency)}
                </span>
              )}
            </div>
          </div>
          <div className="mzw-transaction-detail__item mzw-transaction-detail__created">
            {new Date(created).toDateString()}
            &nbsp;at&nbsp;
            {new Date(created).toLocaleTimeString().substr(0, 5)}
          </div>
          {address && <div className="mzw-transaction-detail__item"><Link href={`http://maps.google.com/?ll=${latitude},${longitude}`} external>{address.short_formatted}</Link></div>}
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
          {tags.map(tag => <Chip key={tag}>{tag}</Chip>)}
          {(!isGBP && transaction.notes !== 'Active card check') && (
            <div>
              Approximate exchange rate&nbsp;
              <span className="mzw-transaction-detail__approx-rate">
                {(transaction.local_amount / transaction.amount).toFixed(2)}
                {transaction.local_currency}
                &nbsp;to 1GBP
              </span>
            </div>
          )}
          <br />
          <div className="mzw-transaction-detail__item mzw-transaction-detail__description">
            {description}
          </div>
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
    counterparty: PropTypes.object,
  }).isRequired,
};

const mapStateToProps = state => ({
  transaction: state.transactions.selected,
});

export default connect(mapStateToProps)(TransactionDetail);
