import React from 'react';

class Button extends React.Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
    type: React.PropTypes.oneOf([ 'default', 'primary', 'success', 'info', 'warning', 'danger', 'link' ])
  };

  getButtonType() {
    return this.props.type ? 'btn-' + this.props.type : 'btn-default';
  }


  render() {
    return (
      <button
        className={this.getButtonType() + ' btn'}
        onClick={this.props.onClick}>
        {this.props.text}
      </button>
    );
  }
}

export default Button;
