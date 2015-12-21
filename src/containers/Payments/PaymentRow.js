import React from 'react';
import BeneficiariesList from './BeneficiariesList';

export default class PaymentsRow extends React.Component {
  static propTypes = {
    payment: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      amount: React.PropTypes.number.isRequired,
      beneficiaries: React.PropTypes.array
    })
  }

  render() {
    const styles = require('./styles.scss');
    return (
      <tr className={styles.row}>
        <td>
          <p className={styles.amount}>
            {this.props.payment.amount}$ on 25.12.1222
          </p>
        </td>
        <td>
          <BeneficiariesList
            users={this.props.payment.beneficiaries}
            size={50}
          />
        </td>
      </tr>
    );
  }
}
