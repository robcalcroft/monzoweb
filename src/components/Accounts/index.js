import React from 'react';
import Container from 'components/Container';
import Overview from 'components/Accounts/Overview';
import Transactions from 'components/Accounts/Transactions';
import TransactionOverview from 'components/Accounts/Transactions/Transaction/Overview';
import { intToAmount, once, ajaxFail, checkStatus } from 'lib/utils';
import 'whatwg-fetch';

export default class Accounts extends React.Component {

  constructor() {
    super();

    // Lazy init sidebar & date
    this.initSideMenu = once(this.initSideMenu);

    // Bind property functions
    this.transactionSearch = this.transactionSearch.bind(this);
    this.transactionSelect = this.transactionSelect.bind(this);
    this.initialLoad = this.initialLoad.bind(this);

    // TODO Add Redux
    this.state = {
      error: '',
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
    this.initialLoad();
  }

  initialLoad() {

    // Retrieve inital data
    this.retrieveAccount().then(() => {
      this.retrieveBalance();
      this.retrieveTransactions();
    });
  }

  // Updates the state with the latest balance
  retrieveBalance() {
    fetch(`https://api.getmondo.co.uk/balance?account_id=${this.state.account.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.monzo_access_token}`
      }
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(account => {
      const { currency, balance, spend_today: spentToday} = account;
      this.setState({
        account: Object.assign({}, this.state.account, {
          balance, spentToday, currency
        })
      });
    })
    .catch(error => ajaxFail(error, (error, credentials) => {
      if (error) {
        return this.setState({ error });
      }

      this.initialLoad(credentials);
    }));
  }

  // Updates the state with the account name (only first account supported atm)
  retrieveAccount() {
    return new Promise(resolve => {
      fetch('https://api.getmondo.co.uk/accounts', {
        headers: {
          'Authorization': `Bearer ${localStorage.monzo_access_token}`
        }
      })
      .then(checkStatus)
      .then(response => response.json())
      .then(response => {
        this.setState({
          account: Object.assign({}, this.state.account, {
            name: response.accounts[0].description,
            id: response.accounts[0].id
          })
        });
        resolve();
      })
      .catch(error => ajaxFail(error, (error, credentials) => {
        if (error) {
          return this.setState({ error });
        }

        this.initialLoad(credentials);
      }));
    });
  }

  // Params is a query string starting with '&'
  retrieveTransactions(params = '') {
    fetch(`https://api.getmondo.co.uk/transactions?expand[]=merchant&account_id=${this.state.account.id}${params}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.monzo_access_token}`
      }
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(account => {
      this.setState({
        account: Object.assign({}, this.state.account, {
          transactions: account.transactions
        })
      });
    })
    .catch(error => ajaxFail(error, (error, credentials) => {
      if (error) {
        return this.setState({ error });
      }

      this.initialLoad(credentials);
    }));
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

    fetch(`https://api.getmondo.co.uk/transactions/${transactionId}?expand[]=merchant`, {
      headers: {
        'Authorization': `Bearer ${localStorage.monzo_access_token}`
      }
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(result => {
      const transaction = result.transaction;
      this.setState({
        ui: {
          selectedTransaction: btoa(transaction.id)
        },
        transactionOverview: {
          empty: false,
          loading: false,
          data: {
            lat: transaction.merchant ? transaction.merchant.address.latitude : '',
            long: transaction.merchant ? transaction.merchant.address.longitude : '',
            zoom: transaction.merchant ? transaction.merchant.address.zoom_level : '4.6',
            logo: transaction.merchant ? transaction.merchant.logo : false,
            merchant: transaction.merchant ? transaction.merchant.name : transaction.is_load ? 'Monzo' : '',
            address: transaction.merchant ? transaction.merchant.address.short_formatted : 'In the clouds',
            tags: transaction.merchant ? transaction.merchant.metadata.suggested_tags ? transaction.merchant.metadata.suggested_tags.split(' ') :[] : [],
            amount: intToAmount(transaction.amount, transaction.currency),
            online: transaction.merchant ? transaction.merchant.online : false,
            notes: transaction.notes,
            created: transaction.created,
            declined: transaction.decline_reason || false,
            localAmount: transaction.local_currency !== this.state.account.currency ? (
              intToAmount(transaction.local_amount, transaction.local_currency)
            ) : false,
            counterParty: transaction.counterparty ? transaction.counterparty.name : false,
            category: transaction.category
          }
        }
      });
    })
    .catch(error => ajaxFail(error, (error, credentials) => {
      if (error) {
        return this.setState({ error });
      }

      this.initialLoad(credentials);
    }));
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
    const { error, account, transactionOverview, ui } = this.state;

    if (!localStorage.monzo_access_token) {
      window.location.href = '/';
      return false;
    }

    return (
      <Container>
        {error && <Alert message={error} />}
        <div className="row">
          <div className="col s12 m12 l2">
            <Overview
              name={account.name}
              balance={account.balance}
              spentToday={account.spentToday}
            />
          </div>
          <div className="col s12 m6 l6">
            <div className="border-box">
              <input onKeyUp={this.transactionSearch} placeholder="Search" autoFocus type="text" />
              <div className="grey-text text-lighten-1">You can search by location, merchant, category or notes</div>
            </div>
            <Transactions
              transactionSelect={this.transactionSelect}
              transactions={account.filterActive ? account.filteredTransactions : account.transactions}
              active={ui.selectedTransaction}
              accountCurrency={this.state.account.currency}
            />
          </div>
          <div className="col s12 m6 l4">
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
