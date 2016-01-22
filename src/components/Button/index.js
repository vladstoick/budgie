import React from 'react';

export default class Button extends React.Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
    align: React.PropTypes.oneOf(['left', 'center', 'right']),
    size: React.PropTypes.oneOf([]),
    type: React.PropTypes.oneOf([ 'default', 'primary', 'success',
                                  'info', 'warning', 'danger', 'link' ]),
    block: React.PropTypes.bool
  };

  getButtonType() {
    return this.props.type ? 'btn-' + this.props.type : 'btn-default';
  }

  getButtonBlockClass() {
    return this.props.block ? 'btn-block' : null;
  }

  getAlignType() {
    return this.props.align ? 'text-${this.props.align}' : null;
  }

  getButtonClass() {
    return [this.getButtonType(), this.getButtonBlockClass(), 'btn'].join(' ');
  }

  render() {
    return (
      <div className={this.getAlignType()}>
        <button
          className={this.getButtonClass()}
          onClick={this.props.onClick}>
          {this.props.text}
        </button>
      </div>
    );
  }
}
