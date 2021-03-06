// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import FramePreview from './FramePreview';

export default class FramesBar extends Component {
  render() {
    return (
      <div id="frames-bar" className="frames-bar">
        {this.props.frames.map(frame => <FramePreview key={frame.id}
          number={frame.number}
          onDeleteFrame={this.props.onDeleteFrame.bind(this)}
          img={frame.img[this.props.activeLayer]}
          proxyFrame={this.props.proxyFrame}
          isActive={frame.number === this.props.activeFrame}
          onSetActiveFrame={this.props.onSetActiveFrame.bind(this)}
          setProxyFrame={this.props.setProxyFrame.bind(this)}
          changeFramePos={this.props.changeFramePos.bind(this)}
          dublicateFrame={this.props.onDublicateFrame.bind(this, frame.img, frame.number)}
          canvasSize={this.props.canvasSize}/>)}
        <button className="frames-bar__add-new-frame-btn" onClick={this.props.onAddNewFrame.bind(this)}>
          Add New Frame
        </button>
      </div>
    );
  }
}
