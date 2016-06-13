import React from 'react';
import moment from 'moment';
import './style.scss';

export default class Overview extends React.Component {
  render() {
    const { props: { loading, empty, data: {
      lat, long, zoom, logo, merchant, address, amount, tags, online, notes, created, declined, localAmount
    } } } = this;

    let tagKey = 0;

    return empty ? (
      <h4 className="center grey-text text-lighten-2">No transaction selected</h4>
    ) : loading ? (
      <div style={{marginTop: '1.5vh'}}>
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
        <h5 className="center">Loading...</h5>
      </div>
    ) : (
      <ul className="collection fadein">
        <li className="collection-item">
          <div style={{position: 'relative'}}>
            {online ? (
              <div style={{height: '35px'}}></div>
            ) : (
              <img className="transaction--overview--map" src={`https://maps.googleapis.com/maps/api/staticmap?size=640x200&zoom=16&markers=${lat},${long}&scale=1`} />
            )}
            <img src={logo || require('assets/shopping-bag.svg')} className="transaction--overview--logo rounded" />
          </div>
          <h5 className="center">{merchant}</h5>
          <div className="center"><a href={`http://maps.google.com/?ll=${lat},${long}`} target="_blank">{address}</a></div>
          <h3 className="center">{declined ? 'Declined' : amount}</h3>
          {localAmount ? <p className="grey-text text-lighten-1 center">Local cost was {localAmount}</p> : ''}
          {notes ? <p className="grey-text text-lighten-1 center">{notes}</p> : ''}
          <div className="center">
            {tags.filter(tag => tag !== '').map(tag => (
              <div key={tagKey++} className="chip" style={{marginRight: '2px'}}>{tag}</div>
            ))}
          </div>
          <p className="grey-text text-lighten-1 center">{moment(created).format('dddd MMMM Do YYYY [at] h:mma')}</p>
        </li>
      </ul>
    );
  }
}
