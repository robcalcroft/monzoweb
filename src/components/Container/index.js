import React from 'react';
import Nav from 'components/Nav';
import './style.scss';

export default class Container extends React.Component {
  render() {
    const { props: { nav, children } } = this;
    return (
      <div className='container--outer'>
        {nav === false ? '' : <Nav />}
        <div className='container--fluid'>
          {children}
        </div>
      </div>
    );
  }
}
