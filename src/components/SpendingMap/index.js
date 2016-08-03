import React from 'react';
import Nav from 'components/Nav';
import Container from 'components/Container';
import { intToAmount } from 'lib/utils';

export default class SpendingMap extends React.Component {

  createMap() {
    return new google.maps.Map(document.getElementById('spending-map'), {
      center: new google.maps.LatLng(51.360878899999996, -0.6569385999999999),
      zoom: 5
    });
  }

  getAccount() {
    $.ajax({
      url: 'https://api.getmondo.co.uk/accounts',
      headers: {
        'Authorization': `Bearer ${localStorage.mondo_access_token}`
      }
    })
    .done(response => this.getTransactions(response.accounts[0].id))
    .fail(console.log);
  }

  getTransactions(accountId) {
    const map = this.createMap();
    $.ajax({
      url: `https://api.getmondo.co.uk/transactions?expand[]=merchant&account_id=${accountId}`,
      headers: {
        'Authorization': `Bearer ${localStorage.mondo_access_token}`
      }
    })
    .done(account => account.transactions
      .filter(transaction => !!transaction.merchant && !transaction.merchant.online)
      .map(transaction => {
        const merchant = transaction.merchant;
        const position = new google.maps.LatLng(merchant.address.latitude, merchant.address.longitude);

        new google.maps.Marker({
          //icon: merchant.logo,
          title: `${merchant.name} (${intToAmount(transaction.local_amount)})`,
          position, map
        });
      }))
    .fail(console.log);
  }

  render() {
    return (
      <div id="mondoweb">
        <Nav />
        <script src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`}></script>
        <script>{this.getAccount()}</script>
        <div id="spending-map" style={{width: '100vw', height: '100vh'}}></div>
      </div>
    );
  }

}
