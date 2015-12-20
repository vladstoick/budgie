import React from 'react';

class TextInput extends React.Component {
  static propTypes = {
    type: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
    obj: React.PropTypes.shape({
      error: React.PropTypes.string,
      touched: React.PropTypes.boolean
    })
  }

  getInputType() {
    return this.props.type ? this.props.type : 'text';
  }


  getWrapperClass() {
    let baseWrapperClass = 'form-group';
    if (this.hasError()) {
      baseWrapperClass += ' has-error';
    }
    return baseWrapperClass;
  }

  getError() {
    if (this.hasError()) {
      return <span className="help-block">{this.props.obj.error}</span>;
    }
    return null;
  }

  hasError() {
    return this.props.obj.touched && this.props.obj.error;
  }

  render() {
    return (
      <div className={this.getWrapperClass()}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input
          type={this.getInputType()}
          className="form-control"
          placeholder={this.props.label}
          {...this.props.obj}/>
        {this.getError()}
      </div>
    );
  }
}

export default TextInput;
