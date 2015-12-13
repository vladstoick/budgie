import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  render() {
    return (
      <div className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Bought.today</Link>
          </div>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav nav">
              <li className="pure-menu-item"><Link to="/payments">Payments</Link></li>
              <li className="pure-menu-item"><Link to="/users">Users</Link></li>
              <li className="pure-menu-item"><Link to="/login">Login</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
