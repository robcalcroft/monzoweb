import React from 'react';
import Nav from 'components/Nav';
import Container from 'components/Container';
import moment from 'moment';
import { intToAmount, ajaxFail, checkStatus } from 'lib/utils';
import './style.scss';

export default class SpendingMap extends React.Component {

  componentDidMount() {
    this.getAccount();
  }

  createMap() {
    return new google.maps.Map(document.getElementById('spending-map'), {
      center: new google.maps.LatLng(51.360878899999996, -0.6569385999999999),
      zoom: 5
    });
  }

  getAccount() {
    fetch('https://api.getmondo.co.uk/accounts', {
      headers: {
        'Authorization': `Bearer ${localStorage.monzo_access_token}`
      }
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(response => this.getTransactions(response.accounts[0].id))
    .catch(error => ajaxFail(error, this.getAccount.bind(this)));
  }

  getTransactions(accountId) {
    const map = this.createMap();
    const infoWindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    fetch(`https://api.getmondo.co.uk/transactions?expand[]=merchant&account_id=${accountId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.monzo_access_token}`
      }
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(account => account.transactions
      .filter(transaction => !!transaction.merchant && !transaction.merchant.online)
      .map(transaction => {
        const merchant = transaction.merchant;
        const position = new google.maps.LatLng(merchant.address.latitude, merchant.address.longitude);

        // Create the marker for the transaction
        const marker = new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          position, map
        });

        // Extend map bounds around transaction markers
        bounds.extend(marker.position);
        map.fitBounds(bounds);

        // Open set content and open info window
        marker.addListener('click', () => {
          infoWindow.setContent(`
            <p className='info-window'><b>${intToAmount(transaction.local_amount).replace('+', 'Refund of ')} at ${merchant.name.substr(0, 40)}</b></p>
            <p className='info-window'>${moment(transaction.created).format('dddd MMMM Do YYYY [at] h:mma')}</p>
          `);
          infoWindow.open(map, marker);
        });
      }))
    .catch(error => ajaxFail(error, this.getAccount.bind(this)));
  }

  render() {
    if (!localStorage.monzo_access_token) {
      window.location.href = '/';
      return false;
    }

    return (
      <div id="monzoweb">
        <Nav />
        <div id="side-note">Some locations may be from online purchases which have escaped the checks</div>
        <div id="spending-map"></div>
      </div>
    );
  }

}
