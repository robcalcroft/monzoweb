import React from 'react';
import moment from 'moment';
import { intToAmount, ajaxFail, checkStatus } from '../../lib/utils';
import './style.scss';

export default class Map extends React.Component {
  componentDidMount() {
    if (typeof google === 'undefined') {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
      script.onload = this.getAccount.bind(this);

      document.head.appendChild(script);
    } else {
      this.getAccount();
    }
  }

  getAccount() {
    fetch('https://api.getmondo.co.uk/accounts', {
      headers: {
        Authorization: `Bearer ${localStorage.monzo_access_token}`,
      },
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(response => this.getTransactions(response.accounts[0].id))
      .catch(error => ajaxFail(error, this.getAccount.bind(this)));
  }

  getTransactions(accountId) {
    const map = this.createMap();
    const infoWindow = new google.maps.InfoWindow();
    const bounds = new google.maps.LatLngBounds();

    fetch(`https://api.getmondo.co.uk/transactions?expand[]=merchant&account_id=${accountId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.monzo_access_token}`,
      },
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(account => account.transactions
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
            <p className='info-window'><b>${intToAmount(transaction.local_amount).replace('+', 'Refund of ')} at ${merchant.name.substr(0, 40)}</b></p>
            <p className='info-window'>${moment(transaction.created).format('dddd MMMM Do YYYY [at] h:mma')}</p>
          `);
            infoWindow.open(map, marker);
          });
        }))
      .catch(error => ajaxFail(error, this.getAccount.bind(this)));
  }

  createMap() { // eslint-disable-line class-methods-use-this
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
