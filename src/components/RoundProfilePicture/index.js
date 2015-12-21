import React from 'react';

export default class RoundProfilePicture extends React.Component {
  static propTypes = {
    size: React.PropTypes.number.isRequired,
    user: React.PropTypes.shape({
      name: React.PropTypes.string,
      avatar: React.PropTypes.string
    })
  }
  render() {
    const styles = require('./styles.scss');
    return (
      <div
        style={{
          width: this.props.size,
          height: this.props.size
        }}
        className={styles.roundProfilePicture}
      >
        <p style={{lineHeight: (this.props.size) + 'px'}}>
          {this.props.user.name ? this.props.user.name : 'AS'}
        </p>
      </div>
    );
  }
}
