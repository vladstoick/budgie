import React from 'react';

export default class RoundProfilePicture extends React.Component {
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
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
          width: this.props.width,
          height: this.props.height
        }}
        className={styles.roundProfilePicture}
      >
        <p style={{
          lineHeight: (this.props.height) + 'px',
          textAlign: 'center'
        }}>
          {this.props.user.name ? this.props.user.name : 'AS'}
        </p>
      </div>
    );
  }
}
