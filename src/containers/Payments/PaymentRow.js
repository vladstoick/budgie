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
    return (
      <tr>
        <td>
          <p>{this.props.payment.amount}</p>
        </td>
        <td>
          <BeneficiariesList users={this.props.payment.beneficiaries}/>
        </td>
      </tr>
    );
  }
}
