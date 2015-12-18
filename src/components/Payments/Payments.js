import React from 'react';
import * as paymentActions from '../../redux/modules/payments.js';
import { connect } from 'react-redux';
import connectData from '../../helpers/connectData';

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

  componentWillMount() {
    this.props.loadPayments();
  }

  render() {
    if (this.props.payments.data) {
      return <div>{this.props.payments.data[0].id}</div>;
    } else if (this.props.payments.error) {
      return <div>{this.props.payments.error}</div>;
    }
    return <div>YOLO</div>;
  }
}