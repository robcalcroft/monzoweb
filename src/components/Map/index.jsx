import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { transactionsRequest } from '../../actions';
import { getHumanCostFromInteger } from '../../helpers';
import './style.css';

// Move this to use https://tomchentw.github.io/react-google-maps/#introduction

class Map extends React.Component {
  componentDidMount() {
    if (typeof google === 'undefined') {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}`;
      script.onload = this.scriptInitialLoad.bind(this);
      document.head.appendChild(script);
    } else {
      this.buildMap();
    }
  }

  componentDidUpdate({ activeId: prevActiveId }) {
    const { activeId, fetchTransactions, transactions } = this.props;
    if (prevActiveId !== activeId && activeId !== '') {
      fetchTransactions(activeId);
    }

    if (transactions.length > 0) {
      this.buildMap();
    }
  }

  scriptInitialLoad() {
    const {
      fetching,
      activeId,
      fetchTransactions,
      transactions,
    } = this.props;
    if (!fetching && transactions.length !== 0) {
      fetchTransactions(activeId);
    }
  }

  buildMap() {
    const map = this.createMap();
    const infoWindow = new google.maps.InfoWindow();
    const bounds = new google.maps.LatLngBounds();

    this.props.transactions
      .filter(transaction => !!transaction.merchant && !transaction.merchant.online)
      .map((transaction) => {
        const { merchant } = transaction;
        const position = new google.maps.LatLng(
          merchant.address.latitude,
          merchant.address.longitude,
        );
        const marker = new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          position,
          map,
        });

        bounds.extend(marker.position);
        map.fitBounds(bounds);

        const localAmount = getHumanCostFromInteger(transaction.local_amount, transaction.local_currency).replace('+', 'Refund of ');
        const gbpAmount = getHumanCostFromInteger(transaction.amount, transaction.currency).replace('+', '');
        const isInternational = transaction.local_currency !== transaction.currency;
        const transactionDate = new Date(transaction.created);

        return marker.addListener('click', () => {
          infoWindow.setContent(`
            <p><b>${localAmount}${isInternational ? ` (${gbpAmount})` : ''} at ${merchant.name.substr(0, 40)}</b></p>
            <p>${transactionDate.toLocaleDateString()} at ${transactionDate.toLocaleTimeString()}</p>
          `);
          infoWindow.open(map, marker);
        });
      });
  }

  createMap() {
    return new google.maps.Map(document.querySelector('.mzw-map'), {
      center: new google.maps.LatLng(51.360878899999996, -0.6569385999999999),
      zoom: 5,
    });
  }

  render() {
    const { fetching } = this.props;
    return (
      <div className="mzw-map__container">
        {fetching && (
          <div className="mzw-map__fetching">
            <h1>Loading map...</h1>
          </div>
        )}
        <div className={`mzw-map ${fetching ? 'mzw-map--fetching' : ''}`} />
      </div>
    );
  }
}

Map.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeId: PropTypes.string.isRequired,
  fetchTransactions: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  transactions: state.transactions.list,
  activeId: state.accounts.activeId,
  fetching: state.transactions.fetching,
});

const mapDispatchToProps = dispatch => ({
  fetchTransactions: accountId => dispatch(transactionsRequest(accountId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
