import React from 'react';
import Container from 'components/Container';
import {intToAmount, checkStatus} from 'lib/utils';
import 'whatwg-fetch';

export default class Analytics extends React.Component {

  constructor() {
    super();

    this.state = {
      account: {
        id: undefined,
        name: '',
        transactions: [],
        analytics: []
      }
    };
  }

  componentWillMount() {
    this.initialLoad();
  }

  initialLoad() {
    // Retrieve inital data
    this
      .retrieveAccount()
      .then(() => {
        this.retrieveTransactions();
      });
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
        .catch(error => ajaxFail(error, this.initialLoad.bind(this)));
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
            transactions: account.transactions,
            analytics: this.calculateAnalytics(account.transactions)
          })
        });
      })
      .catch(error => ajaxFail(error, this.initialLoad.bind(this)));
  }

  calculateAnalytics(transactions) {
    //Calculate Avg Spend and Previous Visits
    
    let averageSpend = [];
    let analytics = {};
    let averages = [];
    let overallAverage = 0;
    let mostSpent = 0;
    let leastSpent = 0;
    let currency = transactions.length > 0 ? transactions[0].currency : "";

    for (let i = 0; i < transactions.length; ++i) {
      let id = transactions[i].merchant ? transactions[i].merchant.group_id: false;

     
      if (id) {
        //Lowest and Highest spend 
        let amount = transactions[i].amount;
        if (mostSpent > amount)
          mostSpent = amount

        if (leastSpent < amount)
          leastSpent = amount

        let count = ((analytics[id] && analytics[id].visitCount) || 0) + 1;        
        let totalAmount = ((analytics[id] && analytics[id].totalAmount) || 0) + amount;

        analytics[id] = { 
          visitCount: count, 
          avgSpent: totalAmount / count,
          name: transactions[i].merchant.name
        };
      }
    }

    let maxCountKey = [];
    let maxCount = 0;

    for (var k in analytics) {
      if (analytics.hasOwnProperty(k)) {
        averageSpend.push(analytics[k].avgSpent);
        overallAverage += analytics[k].avgSpent;
        if(maxCount < analytics[k].visitCount) {
          maxCount =analytics[k].visitCount; 
          maxCountKey = k;
        }
      }
    }

    let total = Math.round(overallAverage / Object.keys(analytics).length);
    let max = Math.round(Math.min.apply(0, averageSpend));
    let min = Math.round(Math.max.apply(0, averageSpend)); 

    return { 
      overallAverage: currency ? intToAmount(total, currency) : total,
      lowestAverage: currency ? intToAmount(min, currency) : min, 
      highestAverage: currency ? intToAmount(max, currency) : max, 
      analytics: analytics,
      leastSpent: currency ? intToAmount(leastSpent, currency) :mostSpent,
      mostSpent: currency ? intToAmount(mostSpent, currency) :mostSpent,
      maxCount: `${analytics[maxCountKey].name} (${maxCount} visits)`
    };
  }

  render() {
    const {overallAverage, lowestAverage, highestAverage,analytics, leastSpent, mostSpent, maxCount} = this.state.account.analytics;

    if (!localStorage.monzo_access_token) {
      window.location.href = '/';
      return false;
    }

    return (
      <Container>
        <div className="row">
          <div className="col s12 m12 l4">
            <div className="border-box">
              <h5 className="center">Overall Average Spend</h5>
              <h3 className="center">{overallAverage}</h3>
            </div>
          </div>
          <div className="col s12 m12 l4">
            <div className="border-box">
              <h5 className="center">Lowest Average Spend</h5>
              <h3 className="center">{lowestAverage}</h3></div>
          </div>
          <div className="col s12 m12 l4">
            <div className="border-box">
              <h5 className="center">Highest Average Spend</h5>
              <h3 className="center">{highestAverage}</h3></div>
          </div>
          <div className="col s12 m12 l4">
            <div className="border-box">
              <h5 className="center">Most Spent</h5>
              <h3 className="center">{mostSpent}</h3></div>
          </div>
          <div className="col s12 m12 l4">
            <div className="border-box">
              <h5 className="center">Least Spent</h5>
              <h3 className="center">{leastSpent}</h3></div>
          </div>
          <div className="col s12 m12 l4">
            <div className="border-box">
              <h5 className="center">Most Visited</h5>
              <h4 className="center">{maxCount}</h4></div>
          </div>
        </div>
      </Container>
    );
  }
}
