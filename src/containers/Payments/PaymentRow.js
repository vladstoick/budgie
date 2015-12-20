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
      <div className={styles.paymentRow + ' row'}>
        <div className="col-md-4">
          <p>{this.props.payment.amount}</p>
        </div>
        <div className="col-md-8">
          <BeneficiariesList users={this.props.payment.beneficiaries}/>
        </div>
      </div>
    );
  }
}
