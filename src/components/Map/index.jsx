import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getHumanCostFromInteger } from '../../helpers';


class Map extends React.Component {
  componentDidMount() {
    if (typeof google === 'undefined') {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}`;
      script.onload = this.buildMap.bind(this);

      document.head.appendChild(script);
    } else {
      this.buildMap();
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

        // Create the marker for the transaction
        const marker = new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          position,
          map,
        });

        // Extend map bounds around transaction markers
        bounds.extend(marker.position);
        map.fitBounds(bounds);

        // Open set content and open info window
        return marker.addListener('click', () => {
          infoWindow.setContent(`
          <p className='info-window'><b>${getHumanCostFromInteger(transaction.local_amount).replace('+', 'Refund of ')} at ${merchant.name.substr(0, 40)}</b></p>
          <p className='info-window'>${new Date(transaction.created)}</p>
        `);
          infoWindow.open(map, marker);
        });
      });
  }

  createMap() {
    return new google.maps.Map(document.getElementById('spending-map'), {
      center: new google.maps.LatLng(51.360878899999996, -0.6569385999999999),
      zoom: 5,
    });
  }

  render() {
    return (
      <div>
        <div id="side-note">
          Some locations may be from online purchases which have escaped the checks
        </div>
        <div id="spending-map" />
      </div>
    );
  }
}

Map.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  transactions: state.transactions.list,
});

export default connect(mapStateToProps)(Map);
