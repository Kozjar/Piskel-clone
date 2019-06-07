import React, { Component, Fragment } from 'react';

export default class FramePreview extends Component {
  constructor(props) {
    super(props);
    this.deleteFrame = this.deleteFrame.bind(this);
  }

  componentDidMount() {
    const canvas = document.getElementById('frames-bar').lastElementChild.previousElementSibling.firstElementChild;
    canvas.getContext('2d').drawImage(document.getElementById('main-canvas'), 0, 0, 130, 130);
    console.log(canvas);
  }

  deleteFrame() {
    this.props.onDeleteFrame(this.props.number);
  }

  render() {
    return (
      <div className="frames-bar__frame-preview">
        <canvas id='ca' width="130px" height="130px"></canvas>
        <div className="frames-bar__frame-preview-info">
          <div className="frames-bar__frame-preview-num">{this.props.number}</div>
          <button className="frames-bar__frame-preview-delete-btn" onClick={this.deleteFrame}></button>
        </div>
      </div>
    );
  }
}
