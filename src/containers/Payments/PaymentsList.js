import React from 'react';
import PaymentRow from './PaymentRow';

export default class PaymentsList extends React.Component {
  static propTypes = {
    payments: React.PropTypes.array
  }

  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Beneficiaries</th>
          </tr>
        </thead>
        <tbody>
          {this.props.payments.map(
            payment => <PaymentRow payment={payment} key={payment.id}/>
          )}
        </tbody>
      </table>
    );
  }
}
