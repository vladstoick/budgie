import React from 'react';
import PaymentRow from './PaymentRow';

export default class PaymentsList extends React.Component {
  static propTypes = {
    payments: React.PropTypes.array
  }

  render() {
    return (
      <div>
        {this.props.payments.map(function renderPaymentRow(payment) {
          return <PaymentRow payment={payment} key={payment.id}/>;
        })}
      </div>
    );
  }
}
