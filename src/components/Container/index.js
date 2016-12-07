import React from 'react';
import Nav from 'components/Nav';
import './style.scss';

export default class Container extends React.Component {
  render() {
    const { props: { nav, children } } = this;
    return (
      <div>
        {nav === false ? '' : <Nav />}
        <div className="wrapper wrapper--main">
          {children}
        </div>
      </div>
    );
  }
}
