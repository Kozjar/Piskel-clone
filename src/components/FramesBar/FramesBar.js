import React, { Component } from 'react';
import FramePreview from './FramePreview';

export default class FramesBar extends Component {
  constructor(props) {
    super(props);
    this.state = { frames: [] };

    this.addNewFrame = this.addNewFrame.bind(this);
    this.deleteFrame = this.deleteFrame.bind(this);
  }

  addNewFrame() {
    this.setState((state, props) => ({
      frames: [...state.frames, { number: state.frames.length, id: state.frames.length }],
    }));
  }

  deleteFrame(num) {
    let framesTmp = this.state.frames;
    framesTmp.splice(num, 1); // remove element from page
    framesTmp = framesTmp.map((frame) => { // reduce frame number by 1 from all frames under target
      if (frame.number > num) {
        return {
          number: frame.number - 1,
          id: frame.id - 1,
        };
      }
      return frame;
    });
    console.log(` frame ${num} was deleted`);
    this.setState({
      frames: framesTmp,
    });
  }

  render() {
    return (
      <div className="frames-bar">
        {this.state.frames.map(frame => <FramePreview key={frame.id}
                        number={frame.number}
                        onDeleteFrame={this.deleteFrame}/>)}
        <button className="frames-bar__add-new-frame-btn" onClick={this.addNewFrame}>
          Add New Frame
        </button>
      </div>
    );
  }
}
