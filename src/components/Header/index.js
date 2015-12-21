import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  static propTypes = {
    user: React.PropTypes.object
  }

  renderHeaderButtons() {
    if (!this.props.user.token) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li className="pure-menu-item"><Link to="/login">Login</Link></li>
        </ul>
      );
    }
    return (
      <ul className="nav navbar-nav">
        <li className="pure-menu-item"><Link to="/payments">Payments</Link></li>
      </ul>
    );
  }

  render() {
    return (
      <div className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Bought.today</Link>
          </div>

          <div className="collapse navbar-collapse">
            {this.renderHeaderButtons()}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
