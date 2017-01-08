import React from 'react';
import moment from 'moment';
import CategoryIcon from 'components/CategoryIcon';
import { getDeclineTranslation, isEmpty } from 'lib/utils';
import './style.scss';

export default class TransactionSummary extends React.Component {
  render() {
    if (isEmpty(this.props.transaction)) {
      return <h4 className="center grey-text text-lighten-2">No transaction selected</h4>;
    }

    const {
      transaction,
      transaction: {
        title,
        category,
        notes,
        merchant,
        created,
        decline_reason,
        amount,
        localAmount
      }
    } = this.props;

    const address = merchant && merchant.address;
    const latitude = address && address.latitude;
    const longitude = address && address.longitude;

    const tags = merchant ? merchant.metadata.suggested_tags ? merchant.metadata.suggested_tags.split(' ').filter(tag => tag !== '') : [] : [];

    const DEFAULT_ZOOM = '16';
    const zoom = merchant && merchant.address.zoom_level || DEFAULT_ZOOM;

    const Map = (!merchant || merchant.online || !latitude || !longitude) ? (
      <div className="transaction--overview--map" />
    ) : (
      <div className="transaction--overview--map" style={{backgroundImage: `url('https://maps.googleapis.com/maps/api/staticmap?size=640x320&zoom=${zoom}&markers=${latitude},${longitude}&scale=1&key=${GOOGLE_MAPS_API_KEY}')`}} />
    );

    return (
      <div className="card fadein" style={{margin: 0}}>
        <div className="transaction--overview">
          {Map}
          <div className="transaction--overview--logo">
            {merchant && merchant.logo ? <img src={merchant.logo} alt={title} width="100%" /> : <CategoryIcon category={category} />}
          </div>
          <span className={`transaction--amount ${(amount && amount.includes('+')) ? 'green-text' : 'black-text'}`}>{amount}</span>
        </div>
        <div className="card-content">
          <h5>{title}{localAmount ? ' 🌎' : ''}</h5>
          <div className="grey-text text-lighten-1">{moment(created).format('dddd MMMM Do YYYY [at] h:mma')}</div>
          {address && <div><a href={`http://maps.google.com/?ll=${latitude},${longitude}`} target="_blank">{address.short_formatted}</a></div>}
          {notes && <div className="black-text" style={{margin: '0.25em 0', fontSize: '1.15em'}}>{notes}</div>}
          {decline_reason && <div className="red-text" style={{margin: '0.25em 0', fontSize: '1.15em'}}>{getDeclineTranslation(decline_reason)}</div>}
          {category && <div className={`category category--${category}`}>{category}</div>}
          {tags && (
          <div style={{marginTop:'10px'}}>
            {tags.map((tag, i) => (
              <div key={i} className="chip" style={{marginRight: '2px'}}>{tag}</div>
            ))}
          </div>
          )}
        </div>
      </div>
    );
  }
}
