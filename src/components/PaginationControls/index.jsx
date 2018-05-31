import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

class PaginationControls extends React.PureComponent {
  render() {
    const {
      totalPageCount,
      page,
      handleNextPage,
      handlePreviousPage,
      handleFirstPage,
      handleLastPage,
    } = this.props;
    const isFirstPage = page < 2;
    const isLastPage = page >= totalPageCount;

    return (
      <div className="mzw__pagination-controls">
        <button disabled={isFirstPage} onClick={handleFirstPage}>First page</button>
        <button disabled={isFirstPage} onClick={handlePreviousPage}>Previous</button>
        <div className="mzw__pagination-controls__description">
          Page {page} of {totalPageCount}
        </div>
        <div><button disabled={isLastPage} onClick={handleNextPage}>Next</button></div>
        <div><button disabled={isLastPage} onClick={handleLastPage}>Last page</button></div>
      </div>
    );
  }
}

PaginationControls.propTypes = {
  totalPageCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handleNextPage: PropTypes.func.isRequired,
  handlePreviousPage: PropTypes.func.isRequired,
  handleFirstPage: PropTypes.func.isRequired,
  handleLastPage: PropTypes.func.isRequired,
};

export default PaginationControls;
