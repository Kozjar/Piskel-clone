import React, { Component } from 'react';

import ToolsBar from './ToolsBar/ToolsBar';
import FramesBar from './FramesBar/FramesBar';
import Workspace from './Workspace/Workspace';
import RightSideTools from './RightSideTools/RightSideTools';
import Canvas from './Canvas/Canvas';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { frames: [], activeFrame: undefined, proxyFrame: undefined };

    this.setActiveFrame = this.setActiveFrame.bind(this);
    this.addNewFrame = this.addNewFrame.bind(this);
    this.deleteFrame = this.deleteFrame.bind(this);
    this.updateFramePreview = this.updateFramePreview.bind(this);
    this.swapFrames = this.swapFrames.bind(this);
    this.incrementFramesNum = this.incrementFramesNum.bind(this);
    this.setProxyFrame = this.setProxyFrame.bind(this);
  }

  componentDidMount() {
    this.addNewFrame(); //  add new frame after component was rendered
  }

  addNewFrame() {
    this.setState((state, props) => ({
      frames: [...state.frames, { // add new element to frames array
        number: state.frames.length,
        id: state.frames.length,
        img: undefined,
      }], //  makes active the last frame
    }), () => { this.setActiveFrame(this.state.frames.length - 1); });
  }

  setActiveFrame(num) {
    this.setState({
      activeFrame: num,
    }, () => {
      const canvas = document.getElementById('main-canvas');
      const context = canvas.getContext('2d');

      context.clearRect(0, 0, canvas.width, canvas.height); //  clear cnavas
      //  if active frame has image, draw this image on main canvas
      if (this.state.frames[this.state.activeFrame].img) {
        const img = new Image();
        img.src = this.state.frames[this.state.activeFrame].img;
        context.drawImage(img, 0, 0);
      }
    });
  }

  deleteFrame(num) {
    if (this.state.frames.length > 1) {
      // if current active frame is under deleted frame, set active frame to right value
      if (this.state.activeFrame > num) {
        this.setState((state, props) => ({ activeFrame: state.activeFrame - 1 }));
      }
      //  if we want to delete active frame, update main camvas
      if (this.state.activeFrame === num) {
        this.setActiveFrame(this.state.activeFrame - (this.state.activeFrame) ? 1 : 0);
      }

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
      this.setState({
        frames: framesTmp,
      });
    } else {
      const { frames } = this.state;
      frames[0].img = undefined;
      this.setState({ frames });
      this.setActiveFrame(0);
    }
  }

  updateFramePreview() {
    const img = document.getElementById('main-canvas').toDataURL();
    const framesTmp = this.state.frames;
    //  set active frame image to main canvas image
    framesTmp[this.state.activeFrame].img = img;
    this.setState({
      frames: framesTmp,
    });
  }

  swapFrames(src, dist) {
    const { frames } = this.state;
    const tmpFrame = frames[src];
    frames[src] = frames[dist];
    frames[dist] = tmpFrame;
    this.setState({ frames });
  }

  incrementFramesNum(start, end, sign) {
    let { frames } = this.state;
    frames = frames.map((frame) => {
      const newNum = (frame.number > start && frame.number < end)
        ? frame.number + sign : frame.number;
      return {
        number: newNum,
        id: newNum,
        img: frame.img,
      };
    });
    this.setState({ frames });
  }

  setProxyFrame(num) {
    console.log(`new proxy frame – ${num}`);
    this.setState({ proxyFrame: num });
  }

  render() {
    return (
      <main>
        <ToolsBar />
        <FramesBar onSetActiveFrame={this.setActiveFrame}
                    activeFrame={this.state.activeFrame}
                    proxyFrame={this.state.proxyFrame}
                    frames={this.state.frames}
                    onAddNewFrame={this.addNewFrame}
                    onDeleteFrame={this.deleteFrame}
                    setProxyFrame={this.setProxyFrame}
                    swapFrames={this.swapFrames}
                    incrementFramesNum={this.incrementFramesNum}/>
        <Workspace/>
        <RightSideTools />
        <Canvas onUpdateFramePreview={this.updateFramePreview}/>
      </main>
    );
  }
}
