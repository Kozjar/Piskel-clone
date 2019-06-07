import React, { Component } from 'react';

import ToolsBar from './ToolsBar/ToolsBar';
import FramesBar from './FramesBar/FramesBar';
import Workspace from './Workspace/Workspace';
import RightSideTools from './RightSideTools/RightSideTools';
import Canvas from './Canvas/Canvas';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { frames: [], activeFrame: undefined };

    this.setActiveFrame = this.setActiveFrame.bind(this);
    this.addNewFrame = this.addNewFrame.bind(this);
    this.deleteFrame = this.deleteFrame.bind(this);
    this.updateFramePreview = this.updateFramePreview.bind(this);
  }

  componentDidMount() {
    this.addNewFrame();
  }

  addNewFrame() {
    this.setState((state, props) => ({
      frames: [...state.frames, {
        number: state.frames.length,
        id: state.frames.length,
        img: undefined,
      }],
    }), () => { this.setActiveFrame(this.state.frames.length - 1); });
  }

  setActiveFrame(num) {
    this.setState({
      activeFrame: num,
    }, () => {
      const canvas = document.getElementById('main-canvas');
      const context = canvas.getContext('2d');
      console.log('---Cnavas was cleared');
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (this.state.frames[this.state.activeFrame].img) {
        console.log('---Image was drawed');
        const img = new Image();
        img.src = this.state.frames[this.state.activeFrame].img;
        context.drawImage(img, 0, 0);
      }
    });
    console.log(`set active frame to ${num}`);
  }

  deleteFrame(num) {
    if (this.state.frames.length > 1) {
      if (this.state.activeFrame >= num) {
        this.setActiveFrame(this.state.activeFrame - 1);
      } else this.setActiveFrame(this.state.activeFrame);
      let framesTmp = this.state.frames;
      framesTmp.splice(num, 1); // remove element from page
      framesTmp = framesTmp.map((frame) => { // reduce frame number by 1 from all frames under target
        if (frame.number > num) {
          return {
            number: frame.number - 1,
            id: frame.id - 1,
            img: frame.img,
          };
        }
        return frame;
      });
      console.log(`frame ${num} was deleted`);
      this.setState({
        frames: framesTmp,
      });
    }
  }

  updateFramePreview() {
    const img = document.getElementById('main-canvas').toDataURL();
    const framesTmp = this.state.frames;
    framesTmp[this.state.activeFrame].img = img;
    this.setState({
      frames: framesTmp,
    });
  }

  render() {
    return (
      <main>
        <ToolsBar />
        <FramesBar onSetActiveFrame={this.setActiveFrame} activeFrame={this.state.activeFrame} frames={this.state.frames} onAddNewFrame={this.addNewFrame} onDeleteFrame={this.deleteFrame}/>
        <Workspace/>
        <RightSideTools />
        <Canvas onUpdateFramePreview={this.updateFramePreview}/>
      </main>
    );
  }
}
