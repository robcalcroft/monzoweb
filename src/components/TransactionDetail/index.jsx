import React from 'react';
import { Link as RRLink } from 'react-router-dom';
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


/* eslint-disable react/prop-types */

const TransactionDetailMap = (props) => {
  const {
    hideMap, category, zoom, longitude, latitude,
  } = props;

  if (hideMap) {
    return (
      <div className={`mzw-transaction-detail__map mzw-transaction-detail__map--category-${category}`} />
    );
  }

  return (
    <RRLink to="/accounts/map">
      <div
        className={`mzw-transaction-detail__map mzw-transaction-detail__map--category-${category}`}
        style={{ backgroundImage: `url('https://maps.googleapis.com/maps/api/staticmap?size=640x320&zoom=${zoom}&markers=${latitude},${longitude}&scale=1&key=${process.env.GOOGLE_MAPS_API_KEY}')` }}
      />
    </RRLink>
  );
};

const TransactionDetailIcon = (props) => {
  const {
    merchant, counterparty, transaction, category,
  } = props;

  if (merchant && merchant.logo) {
    return (
      <img
        className="mzw-transaction-detail__logo"
        src={merchant.logo}
        alt={`${merchant.name}'s logo`}
      />
    );
  }

  if (counterparty && counterparty.name) {
    return (
      <CategoryIcon
        character={transaction.counterparty.name.charAt(0)}
        className="mzw-transaction-detail__logo"
      />
    );
  }

  return (
    <CategoryIcon
      category={category}
      className="mzw-transaction-detail__logo"
    />
  );
};

const TransactionDetailAddress = (props) => {
  const {
    address, latitude, longitude,
  } = props;

  return (
    <div className="mzw-transaction-detail__item">
      <Link
        href={`http://maps.google.com/?ll=${latitude},${longitude}`}
        external
      >
        {address.short_formatted}
      </Link>
    </div>
  );
};

const TransactionDetailHeader = (props) => {
  const {
    transaction, emoji, isGBP,
  } = props;

  return (
    <div className="mzw-transaction-detail__item mzw-transaction-detail__header">
      <div className="mzw-transaction-detail__header__name">
        {processTransactionTitle(transaction)} {emoji}
      </div>
      <div className="mzw-transaction-detail__header__price">
        {processTransactionAmount(transaction)}
        {(!isGBP && transaction.notes !== 'Active card check') && (
          <span className="mzw-transaction-detail__international-currency">
            ({getHumanCostFromInteger(
              transaction.local_amount,
              transaction.local_currency,
            )})
          </span>
        )}
      </div>
    </div>
  );
};

const TransactionDetailDate = (props) => {
  const {
    created,
  } = props;

  return (
    <div className="mzw-transaction-detail__item mzw-transaction-detail__created">
      {new Date(created).toDateString()}
      &nbsp;at&nbsp;
      {new Date(created).toLocaleTimeString().substr(0, 5)}
    </div>
  );
};

/* eslint-enable react/prop-types  */

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
    const emoji = merchant && merchant.emoji;
    const isGBP = transaction.local_currency === 'GBP';
    let tags = [];

    if (merchant) {
      tags = merchant.metadata.suggested_tags ? merchant.metadata.suggested_tags.split(' ').filter(tag => tag !== '') : [];
    }

    const DEFAULT_ZOOM = '16';
    const zoom = (merchant && merchant.address.zoom_level) || DEFAULT_ZOOM;
    const hideMap = !merchant || merchant.online || !latitude || !longitude;

    return (
      <div className="mzw-transaction-detail">
        <TransactionDetailMap
          hideMap={hideMap}
          category={category}
          zoom={zoom}
          longitude={longitude}
          latitude={latitude}
        />
        <TransactionDetailIcon
          merchant={merchant}
          counterparty={counterparty}
          transaction={transaction}
          category={category}
        />
        <div className="mzw-transaction-detail__summary">
          <div className="mzw-transaction-detail__summary__main">
            <TransactionDetailHeader
              transaction={transaction}
              emoji={emoji}
              isGBP={isGBP}
            />
            {address && (
              <TransactionDetailAddress
                address={address}
                latitude={latitude}
                longitude={longitude}
              />
            )}
            <TransactionDetailDate
              created={created}
            />
          </div>
          <div className="mzw-transaction-detail__summary__other">
            {category && (
              <div className="mzw-transaction-detail__category">
                <CategoryIcon category={category} />
              </div>
            )}
            {notes && (
              <div className="mzw-transaction-detail__item">{notes}</div>
            )}

            {declineReason && (
              <div className="mzw-transaction-detail__item">
                {getDeclineTranslation(declineReason)}
              </div>
            )}

            {tags.map(tag => (
              <Chip key={tag}>{tag}</Chip>
            ))}

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
            <div className="mzw-transaction-detail__item mzw-transaction-detail__description">
              {description}
            </div>
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
