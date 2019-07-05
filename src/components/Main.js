import React, { Component } from 'react';

// Components import
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
import * as eraserTool from '../Tools/eraserTool';
import * as bucketTool from '../Tools/bucketTool';

// Managers import
import * as frameManager from '../managers/FramesManager';
import LayersManager from '../managers/LayersManager';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frames: [], // All frames info
      layers: [],
      activeFrame: undefined, // current actve frame
      proxyFrame: undefined, // Element under which we want to draw frame skeleton
      canvasSize: 32,

      mouseUpContainer: () => { },
      mouseMoveContainer: () => { },
      mouseDownContainer: () => { },
      activeToolId: 0, // Id of current active tool

      mainColor: { r: 230, g: 140, b: 50 },
      semiColor: { r: 175, g: 60, b: 93 },
    };

    this.layersManager = new LayersManager();

    this.setActiveFrame = frameManager.setActiveFrame.bind(this);
    this.addNewFrame = frameManager.addNewFrame.bind(this, undefined);
    this.deleteFrame = frameManager.deleteFrame.bind(this);
    this.updateFramePreview = frameManager.updateFramePreview.bind(this);
    this.setProxyFrame = frameManager.setProxyFrame.bind(this);
    this.changeFramePos = frameManager.changeFramePos.bind(this);
    this.dublicateFrame = frameManager.dublicateFrame.bind(this);
    this.setActiveTool = this.setActiveTool.bind(this);
  }

  componentDidMount() {
    this.addNewFrame(); // Add new frame after component was rendered
    this.setActiveTool(0); // Set active tool to pen tool
    this.layersManager.addNewLayer.bind(this)();
  }

  setTool(tool) {
    // Assign a tools drawing functions to containers functions, which later will be past to canvas,
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
      case 4:
        this.setTool(eraserTool);
        break;
      case 5:
        this.setTool(bucketTool);
        break;
      default:
        break;
    }
    this.setState({ activeToolId: toolId });
  }

  setMainColor(r, g, b) {
    this.setState({ mainColor: { r, g, b } });
  }

  setSemiColor(r, g, b) {
    this.setState({ semiColor: { r, g, b } });
  }

  swapColors() {
    this.setState((state, props) => ({ mainColor: state.semiColor, semiColor: state.mainColor }));
  }

  render() {
    return (
      <main>
        <ToolsBar setActiveTool={this.setActiveTool}
          activeToolId={this.state.activeToolId}
          mainColor={this.state.mainColor}
          semiColor={this.state.semiColor}
          swapColors={this.swapColors.bind(this)}/>
        <FramesBar onSetActiveFrame={this.setActiveFrame}
          activeFrame={this.state.activeFrame}
          proxyFrame={this.state.proxyFrame}
          frames={this.state.frames}
          onAddNewFrame={this.addNewFrame}
          onDeleteFrame={this.deleteFrame}
          onDublicateFrame={this.dublicateFrame}
          setProxyFrame={this.setProxyFrame}
          changeFramePos={this.changeFramePos}
          canvasSize={this.state.canvasSize}/>
        <Workspace />
        <Canvas onUpdateFramePreview={this.updateFramePreview}
          onMouseDown={this.state.mouseDownContainer}
          onMouseMove={this.state.mouseMoveContainer}
          onMouseUp={this.state.mouseUpContainer}
          mainColor={this.state.mainColor}
          semiColor={this.state.semiColor}
          setMainColor={this.setMainColor.bind(this)}
          setSemiColor={this.setSemiColor.bind(this)}
          canvasSize={this.state.canvasSize}/>
        <RightSideTools layers={this.state.layers}/>
      </main>
    );
  }
}
