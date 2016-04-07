import React from 'react';
import Container from 'components/Container';
import Overview from 'components/Accounts/Overview';
import Transactions from 'components/Accounts/Transactions';
import TransactionOverview from 'components/Accounts/Transactions/Transaction/Overview';
import { intToAmount, once } from 'lib/utils';
import localForage from 'localforage';

export default class Accounts extends React.Component {

  constructor() {
    super();

    // Lazy init sidebar & date
    this.initSideMenu = once(this.initSideMenu);

    // TODO Add Redux
    this.state = {
      ui: {
        selectedTransaction: 0
      },
      transactionOverview: {
        empty: true,
        loading: false,
        data: {}
      },
      account: {
        id: undefined,
        name: '',
        transactions: [],
        filterActive: false,
        filteredTransactions: [],
        balance: '',
        currency: '',
        spentToday: ''
      }
    };
  }

  componentWillMount() {

    // Retrieve inital data
    this.retrieveAccount().then(() => {
      this.retrieveBalance();
      this.retrieveTransactions();
    });
  }

  // Updates the state with the latest balance
  retrieveBalance() {
    $.ajax({
      url: `https://api.getmondo.co.uk/balance?account_id=${this.state.account.id}`,
      headers: {
        'Authorization': `Bearer ${localStorage.mondo_access_token}`
      }
    })
    .done(account => {
      const { currency, balance, spend_today: spentToday} = account;
      this.setState({
        account: Object.assign({}, this.state.account, {
          balance, spentToday, currency
        })
      });
    })
    .fail(err => swal('Error', err.responseJSON ? `${err.responseJSON.message} try logging out and in again` : false
      || 'Internal error, check your network connection, contact me in the menu if this keeps happening', 'error'));
  }

  // Updates the state with the account name (only first account supported atm)
  retrieveAccount() {
    return new Promise(resolve => {
      $.ajax({
        url: 'https://api.getmondo.co.uk/accounts',
        headers: {
          'Authorization': `Bearer ${localStorage.mondo_access_token}`
        }
      })
      .done(response => {
        this.setState({
          account: Object.assign({}, this.state.account, {
            name: response.accounts[0].description,
            id: response.accounts[0].id
          })
        });
        resolve();
      })
      .fail(err => swal('Error', err.responseJSON ? `${err.responseJSON.message} try logging out and in again` : false
        || 'Internal error, check your network connection, contact me in the menu if this keeps happening', 'error'));
    });
  }

  // Params is a query string starting with '&'
  retrieveTransactions(params = '') {
    $.ajax({
      url: `https://api.getmondo.co.uk/transactions?expand[]=merchant&account_id=${this.state.account.id}${params}`,
      headers: {
        'Authorization': `Bearer ${localStorage.mondo_access_token}`
      }
    })
    .done(account => {
      this.setState({
        account: Object.assign({}, this.state.account, {
          transactions: account.transactions
        })
      });
    })
    .fail(err => swal('Error', err.responseJSON ? `${err.responseJSON.message} try logging out and in again` : false
      || 'Internal error, check your network connection, contact me in the menu if this keeps happening', 'error'));
  }

  transactionSelect(event) {
    event.preventDefault();
    let target = event.target;
    while (target.parentElement) {
      target = target.parentElement;
      if (target.dataset.tid) {
        break;
      }
    }

    // Happens when user clicks an odd bit of the collection item
    if (!target.dataset.tid) {
      return false;
    }

    let transactionId = atob(target.dataset.tid);

    this.setState({
      transactionOverview: {
        empty: false,
        loading: true,
        data: {}
      }
    });

    $.ajax({
      url: `https://api.getmondo.co.uk/transactions/${transactionId}?expand[]=merchant`,
      headers: {
        'Authorization': `Bearer ${localStorage.mondo_access_token}`
      }
    })
    .done(result => {
      const transaction = result.transaction;
      this.setState({
        ui: {
          selectedTransaction: btoa(transaction.id)
        },
        transactionOverview: {
          empty: false,
          loading: false,
          data: {
            lat: transaction.merchant ? transaction.merchant.address.latitude : '50.1477307',
            long: transaction.merchant ? transaction.merchant.address.longitude : '0.7332003',
            zoom: transaction.merchant ? transaction.merchant.address.zoom_level : '4.6',
            logo: transaction.merchant ? transaction.merchant.logo : false,
            merchant: transaction.merchant ? transaction.merchant.name : transaction.is_load ? 'Mondo' : '',
            address: transaction.merchant ? transaction.merchant.address.short_formatted : 'In the clouds',
            tags: transaction.merchant ? transaction.merchant.metadata.suggested_tags.split(' ') : [],
            amount: intToAmount(transaction.amount, transaction.currency),
            online: transaction.merchant ? transaction.merchant.online : false,
            notes: transaction.notes,
            created: transaction.created
          }
        }
      });
    })
    .fail(err => swal('Error', err.responseJSON ? `${err.responseJSON.message} try logging out and in again` : false
      || 'Internal error, check your network connection, contact me in the menu if this keeps happening', 'error'));
  }

  transactionSearch(event) {
    event.preventDefault();
    const search = event.target.value;

    if (search.length < 3) {
      return this.setState({
        account: Object.assign({}, this.state.account, {
          filterActive: false,
          filteredTransactions: []
        })
      });
    }

    // TODO Move to search all trans (fetch) when pagination is implemented
    let transactions = this.state.account.transactions;

    // Search merchant name, address category and notes
    transactions = transactions.filter(transaction => (
      (transaction.merchant ? transaction.merchant.name.toLowerCase().includes(search.toLowerCase()) : false) ||
      (transaction.merchant ? transaction.merchant.address.formatted.toLowerCase().includes(search.toLowerCase()) : false) ||
      (transaction.merchant ? transaction.merchant.category.toLowerCase().includes(search.toLowerCase()) : false) ||
      (transaction.notes ? transaction.notes.toLowerCase().includes(search.toLowerCase()) : false)
    ));

    this.setState({
      account: Object.assign({}, this.state.account, {
        filterActive: true,
        filteredTransactions: transactions
      })
    });
  }

  render() {
    const { account, transactionOverview, ui } = this.state;

    if (!localStorage.mondo_access_token) {
      window.location.href = '/';
      return false;
    }

    return (
      <Container>
        <Overview
          name={account.name}
          balance={account.balance}
          spentToday={account.spentToday}
        />
        <div className='row'>
          <div className='col s12 m12 l3'>
            <div className='border-box'>
              <input onKeyUp={this.transactionSearch.bind(this)} placeholder='Search' autoFocus type='text' />
              <div className='grey-text text-lighten-1'>You can search by location, merchant, category or notes</div>
            </div>
          </div>
          <div className='col s12 m6 l5'>
            <Transactions
              transactionSelect={this.transactionSelect.bind(this)}
              transactions={account.filterActive ? account.filteredTransactions : account.transactions}
              active={ui.selectedTransaction}
            />
          </div>
          <div className='col s12 m6 l4'>
            <TransactionOverview
              empty={transactionOverview.empty}
              loading={transactionOverview.loading}
              data={transactionOverview.data}
            />
          </div>
        </div>
      </Container>
    );
  }
}
