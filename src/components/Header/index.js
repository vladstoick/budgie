import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    path: React.PropTypes.string
  }

  getElementClass(path) {
    return this.isActive(path);
  }

  isActive(path) {
    return this.props.path === path ? 'active' : '';
  }

  renderLink(path, name) {
    return (
      <li className={this.getElementClass(path)}>
        <Link to="/login">{name}</Link>
      </li>
    );
  }

  renderHeaderButtons() {
    if (!this.props.user.token) {
      return (
        <ul className="nav navbar-nav navbar-right">
          {this.renderLink('/login', 'Login')}
        </ul>
      );
    }
    return (
      <div>
        <ul className="nav navbar-nav">
          {this.renderLink('/payments', 'Payments')}
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a>{this.props.user.token.substring(0, 10)}</a>
            </li>
          </ul>
        </ul>
      </div>
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
