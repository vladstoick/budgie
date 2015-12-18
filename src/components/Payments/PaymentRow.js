import React from 'react';
const styles = require('./Payments.scss');

export default class PaymentsRow extends React.Component {
  static propTypes = {
    payment: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      amount: React.PropTypes.number.isRequired
    })
  }

  render() {
    return (
      <div className={styles.paymentRow + ' row'}>
        <div className="col-md-4">
          <p>{this.props.payment.amount}</p>
        </div>
        <div className="col-md-8">
          Beneficiars:
        </div>
      </div>
    );
  }
}
