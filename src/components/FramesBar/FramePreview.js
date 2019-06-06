import React, { Component } from 'react';

export default class FramePreview extends Component {
  render() {
    return (
      <div className="frames-bar__frame-preview">
        <div className="frames-bar__frame-preview-num">{this.props.number}</div>
      </div>
    );
  }
}
