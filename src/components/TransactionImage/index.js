import React from 'react';
import CategoryIcon from 'components/CategoryIcon';
import { mapRange } from 'lib/utils';

export default class TransactionImage extends React.Component {
  nameToHue(name) {
    const MIN_CHAR_CODE = 65;
    const MAX_CHAR_CODE = 90;

    const MIN_HUE = 0;
    const MAX_HUE = 360;

    return mapRange(name.charCodeAt(0), MIN_CHAR_CODE, MAX_CHAR_CODE, MIN_HUE, MAX_HUE);
  }

  render() {
    const {
      transaction,
      transaction: {
        title,
        category,
        counterparty,
        merchant
      },
      large
    } = this.props;

    if (transaction.is_load) {
      const styles = {
        height: '100%',
        color: 'white',
        textAlign: 'center',
        paddingTop: '0.05em',
        fontSize: large ? '5.5em' : '2.5em',
        lineHeight: '100%'
      };

      let background = 'hsl(145, 37%, 50%)';
      let symbol = '+';

      if (counterparty) {
        if (counterparty.number) {
          background = '#878787';
          symbol = '#';
        }

        if (counterparty.name) {
          const name = counterparty.name.toUpperCase();

          background = `hsl(${this.nameToHue(name)}, 37%, 50%)`;

          symbol = name.charAt(0);
        }
      }

      styles.background = background

      return <div style={styles}>{symbol}</div>;
    }

    if (merchant && merchant.logo) {
      return <img src={merchant.logo} alt={title} width="100%" />;
    }

    return <CategoryIcon category={category} />;
  }
}
