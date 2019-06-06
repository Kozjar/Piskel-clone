import React, { Component } from 'react';

export default class FramePreview extends Component {
  constructor(props) {
    super(props);
    this.deleteFrame = this.deleteFrame.bind(this);
  }

  deleteFrame() {
    this.props.onDeleteFrame(this.props.number);
  }

  render() {
    return (
      <div className="frames-bar__frame-preview">
        <div className="frames-bar__frame-preview-num">{this.props.number}</div>
        <button className="frames-bar__frame-preview-delete-btn" onClick={this.deleteFrame}></button>
      </div>
    );
  }
}
