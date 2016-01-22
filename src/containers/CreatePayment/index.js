import React from 'react';
import PaymentForm from './PaymentForm';
import { connect } from 'react-redux';
import * as paymentActions from '../../redux/modules/payments';

@connect(
  state => ({newPayment: state.newPayment}),
  paymentActions)
export default class CreatePayment extends React.Component {
  static propTypes = {
    createPayment: React.PropTypes.func.isRequired
  }
  render() {
    return <PaymentForm onSubmit={this.props.createPayment}/>;
  }
}
