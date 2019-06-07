import React, { Component, Fragment } from 'react';

export default class FramePreview extends Component {
  constructor(props) {
    super(props);
    this.frameId = `frame-preview-${this.props.number}`;
    this.setActiveFrame = this.setActiveFrame.bind(this);
    this.deleteFrame = this.deleteFrame.bind(this);
  }

  deleteFrame() {
    this.props.onDeleteFrame(this.props.number);
  }

  setActiveFrame(e) {
    if (e.target.classList.contains('frames-bar__frame-preview')) {
      this.props.onSetActiveFrame(this.props.number);
    }
  }

  render() {
    const prevStyle = {
      backgroundColor: 'white',
      backgroundImage: (this.props.img !== undefined) ? `url(${this.props.img})` : '',
      backgroundSize: 'contain',
    };
    return (
      <div id={this.frameId}
      style={prevStyle}
      className={`frames-bar__frame-preview ${(this.props.isActive) ? 'active-frame' : ''}`}
      onClick={this.setActiveFrame}>
          <div className="frames-bar__frame-preview-num">{this.props.number}</div>
          <button className="frames-bar__frame-preview-delete-btn" onClick={this.deleteFrame}></button>
      </div>
    );
  }
}
