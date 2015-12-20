import React from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import * as userActions from '../../redux/modules/user';

@connect(
  state => ({user: state.user}),
  userActions)
export default class Login extends React.Component {
  static propTypes = {
    loginUser: React.PropTypes.func.isRequired,
    user: React.PropTypes.shape({
      isLoggingUser: React.PropTypes.boolean,
      token: React.PropTypes.string,
      error: React.PropTypes.string
    })
  }

  render() {
    if (this.props.user.token) {
      return <div>Logged in</div>;
    }
    if (!this.props.user.isLoggingUser) {
      return (
        <div>
          <LoginForm
            loginError={this.props.user.error}
            onSubmit={this.props.loginUser}/>
        </div>
      );
    }
    return (
      <div>Logging in...</div>
    );
  }
}
