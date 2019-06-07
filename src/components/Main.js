import React, { Component } from 'react';

import ToolsBar from './ToolsBar/ToolsBar';
import FramesBar from './FramesBar/FramesBar';
import Workspace from './Workspace/Workspace';
import RightSideTools from './RightSideTools/RightSideTools';
import Canvas from './Canvas/Canvas';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { frames: [] };

    this.addNewFrame = this.addNewFrame.bind(this);
    this.deleteFrame = this.deleteFrame.bind(this);
  }

  addNewFrame() {
    this.setState((state, props) => ({
      frames: [...state.frames, {
        number: state.frames.length,
        id: state.frames.length,
        context: document.getElementById('main-canvas').getContext('2d'),
      }],
    }));
  }

  deleteFrame(num) {
    let framesTmp = this.state.frames;
    console.log(framesTmp);
    framesTmp.splice(num, 1); // remove element from page
    console.log(framesTmp);
    framesTmp = framesTmp.map((frame) => { // reduce frame number by 1 from all frames under target
      if (frame.number > num) {
        return {
          number: frame.number - 1,
          id: frame.id - 1,
          context: frame.context,
        };
      }
      return frame;
    });
    console.log(` frame ${num} was deleted`);
    console.log(framesTmp);
    this.setState({
      frames: framesTmp,
    });
  }

  render() {
    return (
      <main>
        <ToolsBar />
        <FramesBar frames={this.state.frames} onAddNewFrame={this.addNewFrame} onDeleteFrame={this.deleteFrame}/>
        <Workspace />
        <RightSideTools />
        <Canvas />
      </main>
    );
  }
}