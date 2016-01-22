import React from 'react';
import { Button, TextInput } from '../../components';
import { reduxForm } from 'redux-form';

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }

  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

class LoginForm extends React.Component {
  static propTypes = {
    loginError: React.PropTypes.string,
    fields: React.PropTypes.shape({
      username: React.PropTypes.object,
      password: React.PropTypes.object,
    }),
    handleSubmit: React.PropTypes.func.isRequired
  };

  render() {
    let error;
    if (this.props.loginError) {
      error = (
        <div className="alert alert-danger" role="alert">
          <strong>{this.props.loginError}</strong>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h2 className="text-center">Login</h2>
            </div>
            <div className="panel-body">
              {error}
              <form onSubmit={this.props.handleSubmit} action="loginjs" method="post" className="form">
                <TextInput
                  label="Username"
                  type="text"
                  obj={this.props.fields.username}/>
                <TextInput
                  label="Password"
                  type="password"
                  error={this.props.fields.password.error}
                  obj={this.props.fields.password}/>
                <Button
                  align="right"
                  block
                  onClick={this.props.handleSubmit}
                  type="primary"
                  text="Login"/>
              </form>
              or Sign-up
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'user',
  fields: ['username', 'password'],
  validate
})(LoginForm);
