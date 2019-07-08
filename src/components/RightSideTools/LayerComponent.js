import React, { Component } from 'react';

export default class Layers extends Component {
  constructor(props) {
    super(props);
    this.state = { nameValue: this.props.name };
    this.inputId = `layer-name-input-${props.layerId}`;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({ nameValue: this.props.name });
    }
  }

  handleNameChange(e) {
    this.setState({ nameValue: e.target.value });
  }

  handleSetNewName(e) {
    e.preventDefault();
    this.props.setEditMode(-1);
    this.props.setNewName(this.props.layerId, this.state.nameValue);
  }

  handleChooseLayer() {
    this.props.setEditMode(this.props.layerId);
  }

  handleOnBlur() {
    this.props.setEditMode(-1);
    this.setState({ nameValue: this.props.name });
  }

  render() {
    return (
      <div className={`concrete-layer ${this.props.isActive ? 'active-layer' : ''}`} 
        onClick={this.props.setActiveLayer.bind(this, this.props.layerId)}>
        {this.props.editMode ? (
          <form onSubmit={this.handleSetNewName.bind(this)}>
            <input id={this.inputId} type="text"
            onChange={this.handleNameChange.bind(this)}
            value={this.state.nameValue}
            onBlur={this.handleOnBlur.bind(this)}/>
          </form>
        ) : (
          <div className="layer-name" onDoubleClick={this.handleChooseLayer.bind(this)}>{this.props.name}</div>
        )}
        <button className='layer-delete-btn' onClick={this.props.deleteLayer.bind(this, this.props.layerId)}>X</button>
      </div>
    );
  }
}
