import React from 'react';

export default class Button extends React.Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
    align: React.PropTypes.oneOf(['left', 'center', 'right']),
    size: React.PropTypes.oneOf([]),
    type: React.PropTypes.oneOf([ 'default', 'primary', 'success', 'info', 'warning', 'danger', 'link' ])
  };

  getButtonType() {
    return this.props.type ? 'btn-' + this.props.type : 'btn-default';
  }

  getAlignType() {
    return this.props.align ? 'pull-' + this.props.align : null;
  }

  getButtonClass() {
    return [this.getAlignType(), this.getButtonType(), 'btn'].join(' ');
  }

  render() {
    return (
      <button
        className={this.getButtonClass()}
        onClick={this.props.onClick}>
        {this.props.text}
      </button>
    );
  }
}
