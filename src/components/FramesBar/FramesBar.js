// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import FramePreview from './FramePreview';

export default class FramesBar extends Component {
  render() {
    console.log(`Passed active frame – ${this.props.activeFrame}`);
    return (
      <div id="frames-bar" className="frames-bar">
        {this.props.frames.map(frame => <FramePreview key={frame.id}
          number={frame.number}
          onDeleteFrame={this.props.onDeleteFrame.bind(this)}
          img={frame.img}
          isActive={frame.number === this.props.activeFrame}
          onSetActiveFrame={this.props.onSetActiveFrame.bind(this)}/>)}
        <button className="frames-bar__add-new-frame-btn" onClick={this.props.onAddNewFrame.bind(this)}>
          Add New Frame
        </button>
      </div>
    );
  }
}
