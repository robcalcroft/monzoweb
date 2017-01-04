import React from 'react';
import moment from 'moment';
import CategoryIcon from 'components/CategoryIcon';
import { getDeclineTranslation } from 'lib/utils';
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
          counterParty,
          category
        }
      }
    } = this;

    let tagKey = 0;

    if (empty) {
      return <h4 className="center grey-text text-lighten-2">No transaction selected</h4>;
    }

    if (loading) {
      return (
        <div className="card fadein" style={{margin: 0}}>
          <div className="transaction--overview">
            <div className="transaction--overview--map" />
          </div>
          <div className="card-content">
            <h5>Loading...</h5>
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
          </div>
        </div>
      );
    }

    const Map = (online || (!lat || !long)) ? (
      <div className="transaction--overview--map" />
    ) : (
      <div className="transaction--overview--map" style={{backgroundImage: `url('https://maps.googleapis.com/maps/api/staticmap?size=640x320&zoom=16&markers=${lat},${long}&scale=1&key=${GOOGLE_MAPS_API_KEY}')`}} />
    );

    return (
      <div className="card fadein" style={{margin: 0}}>
        <div className="transaction--overview">
          {Map}
          <div className="transaction--overview--logo">
            {logo ? <img src={logo} alt={counterParty || merchant} width="100%" /> : <CategoryIcon category={category} />}
          </div>
          <span className={`transaction--amount ${amount.includes('+') ? 'green-text' : 'black-text'}`}>{amount}</span>
        </div>
        <div className="card-content">
          <h5>{counterParty || merchant}</h5>
          <div><a href={`http://maps.google.com/?ll=${lat},${long}`} target="_blank">{address}</a></div>
          <div className="grey-text text-lighten-1">{moment(created).format('dddd MMMM Do YYYY [at] h:mma')}</div>
          {declined && <div className="red-text">{ getDeclineTranslation(declined) }</div>}
          {localAmount && <div className="grey-text text-lighten-1">Local cost was {localAmount}</div>}
          {notes && <div className="black-text" style={{margin: '0.25em 0', fontSize: '1.15em'}}>{notes}</div>}
          {category && <div className={`category category--${category}`}>{category}</div>}
          <div style={{marginTop:'10px'}}>
            {tags.filter(tag => tag !== '').map(tag => (
              <div key={tagKey++} className="chip" style={{marginRight: '2px'}}>{tag}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
