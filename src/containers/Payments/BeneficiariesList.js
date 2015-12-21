import React from 'react';
import { RoundProfilePicture } from '../../components';

export default class extends React.Component {
  static propTypes = {
    users: React.PropTypes.array,
    size: React.PropTypes.number.isRequired
  }
  render() {
    if (this.props.users) {
      return (
        <div>
          {this.props.users.map( user =>
            <RoundProfilePicture
              user={user}
              key={user.id}
              size={this.props.size}
            />
          )}
        </div>
      );
    }
    return <div style={{lineHeight: this.props.size + 'px'}}>No users</div>;
  }
}
