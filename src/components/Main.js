import React, { Component } from 'react';

import ToolsBar from './ToolsBar/ToolsBar';
import FramesBar from './FramesBar/FramesBar';
import Workspace from './Workspace/Workspace';
import RightSideTools from './RightSideTools/RightSideTools';
import Canvas from './Canvas/Canvas';

import * as frameManager from '../managers/FramesManager';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frames: [], activeFrame: undefined, proxyFrame: undefined, currentTool: 0,
    };

    this.setCurrentTool = this.setCurrentTool.bind(this);
    
    this.setActiveFrame = frameManager.setActiveFrame.bind(this);
    this.addNewFrame = frameManager.addNewFrame.bind(this);
    this.deleteFrame = frameManager.deleteFrame.bind(this);
    this.updateFramePreview = frameManager.updateFramePreview.bind(this);
    this.setProxyFrame = frameManager.setProxyFrame.bind(this);
    this.changeFramePos = frameManager.changeFramePos.bind(this);
  }

  componentDidMount() {
    this.addNewFrame(); //  add new frame after component was rendered
  }

  setCurrentTool(pickedTool) {
    this.setState({ currentTool: pickedTool }, () => console.log(this.state.currentTool));
  }

  render() {
    return (
      <main>
        <ToolsBar setCurrentTool={this.setCurrentTool} />
        <FramesBar onSetActiveFrame={this.setActiveFrame}
          activeFrame={this.state.activeFrame}
          proxyFrame={this.state.proxyFrame}
          frames={this.state.frames}
          onAddNewFrame={this.addNewFrame}
          onDeleteFrame={this.deleteFrame}
          setProxyFrame={this.setProxyFrame}
          changeFramePos={this.changeFramePos}/>
        <Workspace/>
        <RightSideTools />
        <Canvas onUpdateFramePreview={this.updateFramePreview} currentTool={this.state.currentTool} />
      </main>
    );
  }
}
