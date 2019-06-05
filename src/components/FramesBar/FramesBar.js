import React, { Component } from 'react';
import FramePreview from './FramePreview';

export default class FramesBar extends Component {
  constructor(props) {
    super(props);
    this.state = { frames: [], totalFramesCount: 0 };

    this.addNewFrame = this.addNewFrame.bind(this);
  }

  addNewFrame() {
    this.setState((state, props) => ({
      frames: [...state.frames, { number: state.totalFramesCount, id: state.totalFramesCount }],
      totalFramesCount: state.totalFramesCount + 1,
    }));
  }

  render() {
    return (
      <div className="frames-bar">
        {this.state.frames.map(frame => <FramePreview key={frame.id}
                        number={frame.number}/>)}
        <button onClick={this.addNewFrame}>
          Add New Frame
        </button>
      </div>
    );
  }
}
