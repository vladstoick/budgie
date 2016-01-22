import React from 'react';
import { reduxForm } from 'redux-form';
import { Button, TextInput } from '../../components';

class PaymentForm extends React.Component {
  static propTypes = {
    fields: React.PropTypes.shape({
      amount: React.PropTypes.object,
    }),
    handleSubmit: React.PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <form>
            <TextInput
              label="Amount"
              type="number"
              obj={this.props.fields.amount}/>
            <Button
              align="right"
              block
              onClick={this.props.handleSubmit}
              type="primary"
              text="Create payment"/>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'payment',
  fields: ['amount'],
})(PaymentForm);
