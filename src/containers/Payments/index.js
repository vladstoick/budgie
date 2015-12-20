import React from 'react';
import * as paymentActions from '../../redux/modules/payments.js';
import { connect } from 'react-redux';
import connectData from '../../helpers/connectData';
import PaymentsList from './PaymentsList';

function fetchDataDeferred(getState, dispatch) {
  return dispatch(paymentActions.loadPayments());
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({payments: state.payments}),
  paymentActions
)
export default class Payments extends React.Component {
  static propTypes = {
    loadPayments: React.PropTypes.func.isRequired,
    payments: React.PropTypes.shape({
      error: React.PropTypes.string,
      data: React.PropTypes.array
    })
  }

  render() {
    if (this.props.payments.data) {
      return <PaymentsList payments={this.props.payments.data}/>;
    } else if (this.props.payments.error) {
      return <div>{this.props.payments.error}</div>;
    }
    return <div>Loading data...</div>;
  }
}
