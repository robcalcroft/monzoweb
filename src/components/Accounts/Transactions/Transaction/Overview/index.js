import React from 'react';
import moment from 'moment';
import './style.scss';

export default class Overview extends React.Component {
  render() {
    const {
      props: {
        loading,
        empty,
        data: {
          lat,
          long,
          zoom,
          logo,
          merchant,
          address,
          amount,
          tags,
          online,
          notes,
          created,
          declined,
          localAmount,
          counterParty
        }
      }
    } = this;

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
      <div className="card fadein">
        <div className="transaction--overview">
          {online ? (
            <div className="transaction--overview--map" />
          ) : (
            <div className="transaction--overview--map" style={{backgroundImage: `url('https://maps.googleapis.com/maps/api/staticmap?size=640x320&zoom=16&markers=${lat},${long}&scale=1&key=${GOOGLE_MAPS_API_KEY}')`}} />
          )}
          <img src={logo || require('assets/shopping-bag.svg')} className="transaction--overview--logo rounded" />
          <span className={`transaction--amount ${amount.includes('+') ? 'green-text' : 'black-text'}`}>{amount}</span>
        </div>
        <div className="card-content">
          <h5>{counterParty || merchant}</h5>
          <div><a href={`http://maps.google.com/?ll=${lat},${long}`} target="_blank">{address}</a></div>
          <div className="grey-text text-lighten-1">{moment(created).format('dddd MMMM Do YYYY [at] h:mma')}</div>
          {declined && <div className="red-text">Declined as you don't have sufficient funds on your card</div>}
          {localAmount && <div className="grey-text text-lighten-1">Local cost was {localAmount}</div>}
          {notes && <div className="grey-text text-lighten-1">{notes}</div>}
          <div style={{marginTop:'20px'}}>
            {tags.filter(tag => tag !== '').map(tag => (
              <div key={tagKey++} className="chip" style={{marginRight: '2px'}}>{tag}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
