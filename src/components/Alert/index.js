import React from 'react';

export default class Alert extends React.Component {
  render() {
    const styles = {
      background: '#9a3341',
      color: 'white',
      padding: '1em 0.75rem',
      marginTop: '-1em'
    };

    return (
      <p class="col s12" style={styles}>{this.props.message}</p>
    );
  }
}
