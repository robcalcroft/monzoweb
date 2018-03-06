import React from 'react';
import { Link as RRLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { transactionsRequest, setActiveTransaction as setActiveTransactionAction } from '../../actions';
import { getHumanCostFromInteger } from '../../helpers';
import Loader from '../Loader';
import './style.css';

const GOOGLE_MAPS_DROP_MARKER_ANIMATION = 2;

const MAP_DEFAULT_ZOOM = 5;
const MAP_DEFAULT_CENTER_LATITUDE = 51.360878899999996;
const MAP_DEFAULT_CENTER_LONGITUDE = -0.6569385999999999;

const MapWithAMarker = withScriptjs(withGoogleMap((props) => {
  const {
    transactions, selectedTransaction, setActiveTransaction,
  } = props;

  return (
    <GoogleMap
      defaultZoom={MAP_DEFAULT_ZOOM}
      defaultCenter={{ lat: MAP_DEFAULT_CENTER_LATITUDE, lng: MAP_DEFAULT_CENTER_LONGITUDE }}
    >
      {transactions.map((transaction) => {
        const {
          merchant,
        } = transaction;

        if (!merchant || merchant.online) {
          return null;
        }

        const transactionActive = selectedTransaction ? (
          transaction.id === selectedTransaction.id
        ) : (
          false
        );

        const localAmount = getHumanCostFromInteger(transaction.local_amount, transaction.local_currency).replace('+', 'Refund of ');
        const gbpAmount = getHumanCostFromInteger(transaction.amount, transaction.currency).replace('+', '');
        const isInternational = transaction.local_currency !== transaction.currency;
        const transactionDate = new Date(transaction.created);

        const infoWindowContent = (
          <RRLink className="mzw-map-marker" to="/accounts">
            <div className="mzw-map-marker__header">
              <img
                className="mzw-map-marker__image"
                src={merchant.logo}
                alt={`${merchant.name}'s logo`}
              />
              <div className="mzw-map-marker__info">
                <div className="mzw-map-marker__info__name">
                  {merchant.name.substr(0, 40)}
                </div>
                <div className="mzw-map-marker__info__price">
                  {localAmount}{isInternational ? ` (${gbpAmount})` : ''}
                </div>
              </div>
            </div>
            <p className="mzw-map-marker__date">
              {transactionDate.toLocaleDateString()} at {transactionDate.toLocaleTimeString()}
            </p>
          </RRLink>
        );

        return (
          <Marker
            animation={GOOGLE_MAPS_DROP_MARKER_ANIMATION}
            key={transaction.id}
            position={{ lat: merchant.address.latitude, lng: merchant.address.longitude }}
            onClick={() => setActiveTransaction(transaction)}
          >
            {transactionActive && (
              <InfoWindow onCloseClick={() => setActiveTransaction({})}>
                <div>{infoWindowContent}</div>
              </InfoWindow>
            )}
          </Marker>
        );
      })}
    </GoogleMap>
  );
}));


class Map extends React.Component {
  componentDidMount() {
    const {
      fetching, activeId, fetchTransactions, transactions,
    } = this.props;

    if (transactions.length === 0 && !fetching) {
      fetchTransactions(activeId);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeId !== this.props.activeId) {
      this.props.fetchTransactions(this.props.activeId);
    }
  }

  render() {
    const {
      selectedTransaction, transactions, setActiveTransaction,
    } = this.props;

    return (
      <MapWithAMarker
        transactions={transactions}
        selectedTransaction={selectedTransaction}
        setActiveTransaction={setActiveTransaction}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<Loader />}
        containerElement={<div className="mzw-map-container" />}
        mapElement={<div className="mzw-map" />}
      />
    );
  }
}

Map.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedTransaction: PropTypes.shape({
    merchant: PropTypes.object,
    notes: PropTypes.string,
    created: PropTypes.string,
    decline_reason: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    counterparty: PropTypes.object,
  }).isRequired,
  activeId: PropTypes.string.isRequired,
  fetchTransactions: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  setActiveTransaction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  transactions: state.transactions.list,
  selectedTransaction: state.transactions.selected,
  activeId: state.accounts.activeId,
  fetching: state.transactions.fetching,
});

const mapDispatchToProps = dispatch => ({
  setActiveTransaction: transaction => dispatch(setActiveTransactionAction(transaction)),
  fetchTransactions: accountId => dispatch(transactionsRequest(accountId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
