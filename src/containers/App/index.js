import React from 'react';
import { Header } from '../../components';
import './App.scss';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
@connect(state => ({user: state.user}), { pushState })
class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    pushState: React.PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user.token && nextProps.user.token) {
      this.props.pushState(null, '/payments');
    }
  }

  render() {
    return (
      <div>
        <Header user={this.props.user} />
        <div className="container">
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default App;
