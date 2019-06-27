import React, { Component } from 'react';

import ToolsBar from './ToolsBar/ToolsBar';
import FramesBar from './FramesBar/FramesBar';
import Workspace from './Workspace/Workspace';
import RightSideTools from './RightSideTools/RightSideTools';
import Canvas from './Canvas/Canvas';

// Tools import
import * as penTool from '../Tools/penTool';
import * as colotPickerTool from '../Tools/colotPickerTool';
import * as lineTool from '../Tools/lineTool';
import * as squareTool from '../Tools/squareTool';

// Managers import
import * as frameManager from '../managers/FramesManager';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frames: [],
      activeFrame: undefined,
      proxyFrame: undefined,

      mouseUpContainer: () => { },
      mouseMoveContainer: () => { },
      mouseDownContainer: () => { },
      activeToolId: 0,
    };

    this.setActiveFrame = frameManager.setActiveFrame.bind(this);
    this.addNewFrame = frameManager.addNewFrame.bind(this);
    this.deleteFrame = frameManager.deleteFrame.bind(this);
    this.updateFramePreview = frameManager.updateFramePreview.bind(this);
    this.setProxyFrame = frameManager.setProxyFrame.bind(this);
    this.changeFramePos = frameManager.changeFramePos.bind(this);
    this.setActiveTool = this.setActiveTool.bind(this);
  }

  componentDidMount() {
    this.addNewFrame(); //  add new frame after component was rendered
    this.setActiveTool(0);
  }

  setTool(tool) {
    this.setState({
      mouseDownContainer: tool.mouseDown,
      mouseMoveContainer: tool.mouseMove,
      mouseUpContainer: tool.mouseUp,
    });
  }

  setActiveTool(toolId) {
    switch (toolId) {
      case 0:
        this.setTool(penTool);
        break;
      case 1:
        this.setTool(colotPickerTool);
        break;
      case 2:
        this.setTool(lineTool);
        break;
      case 3:
        this.setTool(squareTool);
        break;
      default:
        break;
    }
    this.setState({ activeToolId: toolId });
  }

  render() {
    return (
      <main>
        <ToolsBar setActiveTool={this.setActiveTool}
          activeToolId={this.state.activeToolId} />
        <FramesBar onSetActiveFrame={this.setActiveFrame}
          activeFrame={this.state.activeFrame}
          proxyFrame={this.state.proxyFrame}
          frames={this.state.frames}
          onAddNewFrame={this.addNewFrame}
          onDeleteFrame={this.deleteFrame}
          setProxyFrame={this.setProxyFrame}
          changeFramePos={this.changeFramePos} />
        <Workspace />
        <RightSideTools />
        <Canvas onUpdateFramePreview={this.updateFramePreview}
          onMouseDown={this.state.mouseDownContainer}
          onMouseMove={this.state.mouseMoveContainer}
          onMouseUp={this.state.mouseUpContainer} />
        <img id="gachiBass" src="https://media1.tenor.com/images/4583240c2924d46ee4a865fd2ae3f348/tenor.gif?itemid=14354854" alt="" />
      </main>
    );
  }
}
