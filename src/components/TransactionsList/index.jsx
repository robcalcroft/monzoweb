import React from 'react';
import PropTypes from 'prop-types';
import PaginationControls from '../PaginationControls';

const paginate = (array, pageSize, pageNumber) => {
  const arrayPageNumber = pageNumber - 1;
  return array.slice(arrayPageNumber * pageSize, (arrayPageNumber + 1) * pageSize);
};

const getTotalPageCount = (transactions, pageSize) => Math.ceil(transactions.length / pageSize);

class TransactionsList extends React.Component {
  constructor() {
    super();

    this.getTransactions = this.getTransactions.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePreviousPage = this.handlePreviousPage.bind(this);
    this.handleFirstPage = this.handleFirstPage.bind(this);
    this.handleLastPage = this.handleLastPage.bind(this);

    this.state = {
      fetchingTransactions: false,
      error: undefined,
      transactions: [],
      page: 1,
      pageSize: 25,
    };
  }

  componentDidMount() {
    this.getTransactions(this.props.accountId);
  }

  componentWillUnmount() {
    this.getTransactionsController.abort();
  }

  // async getTransactions(accountId) {
  //   this.getTransactionsController = new AbortController();
  //   this.setState({ fetchingTransactions: true });

  //   try {
  //     const response = await fetch(`https://api.monzo.com/transactions?account_id=${accountId}&expand[]=merchant`, {
  //       headers: {
  //         authorization: `Bearer ${localStorage.getItem('monzoAccessToken')}`,
  //       },
  //       signal: this.getTransactionsController.signal,
  //     });
  //     const { transactions } = await response.json();
  //     this.setState({ transactions });
  //   } catch (error) {
  //     this.setState({ error: 'Error getting transactions' });
  //   } finally {
  //     this.setState({ fetchingTransactions: false });
  //   }
  // }

  getTransactions(accountId) {
    this.getTransactionsController = new AbortController();
    this.setState({ fetchingTransactions: true });
    fetch(`https://api.monzo.com/transactions?account_id=${accountId}&expand[]=merchant`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('monzoAccessToken')}`,
      },
      signal: this.getTransactionsController.signal,
    }).then(response => response.json()).then(({ transactions }) => {
      this.setState({ transactions, fetchingTransactions: false });
    }).catch(error => console.log(error));
  }

  handleFirstPage() {
    this.setState({ page: 1 });
  }

  handleLastPage() {
    const { transactions, pageSize } = this.state;
    this.setState({ page: getTotalPageCount(transactions, pageSize) });
  }

  handlePreviousPage() {
    const { page } = this.state;
    if (page - 1 !== 0) this.setState({ page: page - 1 });
  }

  handleNextPage() {
    const { transactions, pageSize, page } = this.state;
    const nextPage = paginate(transactions, pageSize, page + 1);
    if (nextPage.length !== 0) this.setState({ page: this.state.page + 1 });
  }

  render() {
    const {
      fetchingTransactions,
      error,
      transactions,
      page,
      pageSize,
    } = this.state;
    const sortedTransactions = transactions.reverse();

    return (
      <div>
        {error && (
          <div>Error: {error}</div>
        )}
        {fetchingTransactions ? 'Loading...' : paginate(sortedTransactions, pageSize, page).map(transaction => (
          <div key={transaction.id}>{transaction.description}</div>
        ))}
        <PaginationControls
          page={page}
          totalPageCount={getTotalPageCount(transactions, pageSize)}
          handleNextPage={this.handleNextPage}
          handlePreviousPage={this.handlePreviousPage}
          handleFirstPage={this.handleFirstPage}
          handleLastPage={this.handleLastPage}
        />
      </div>
    );
  }
}

TransactionsList.defaultProps = {
  accountId: undefined,
};

TransactionsList.propTypes = {
  accountId: PropTypes.string,
};

export default TransactionsList;
