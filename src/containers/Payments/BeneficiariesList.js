import React from 'react';
import { RoundProfilePicture } from '../../components';

export default class extends React.Component {
  static propTypes = {
    users: React.PropTypes.array
  }
  render() {
    if (this.props.users) {
      return (
        <div>
          {this.props.users.map(function renderUser(user) {
            return (
              <RoundProfilePicture
                user={user}
                key={user.id}
                width={50}
                height={50}
              />
            );
          })}
        </div>
      );
    }
    return <div>No users</div>;
  }
}
