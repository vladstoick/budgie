import React from 'react';
import Header from '../Header/Header';
import './App.scss';

class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        <Header/>
        <div className="container">
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default App;
