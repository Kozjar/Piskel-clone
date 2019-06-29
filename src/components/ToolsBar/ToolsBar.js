// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';


export default class ToolsBar extends Component {
  constructor(props) {
    super(props);
    this.state = { currentTool: 0 };
    this.penTool = 0;
    this.colourPickerTool = 1;
    this.bucketTool = 2;
    this.eraserTool = 3;
    this.moveTool = 4;
    this.rectangleTool = 5;
    this.cicrleTool = 6;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div className="tools-bar">
        <div className={`tool${(this.props.activeToolId === 0) ? ' activeTool' : ''}`} onClick={() => this.props.setActiveTool(0)}></div>
        <div className={`tool${(this.props.activeToolId === 1) ? ' activeTool' : ''}`} onClick={() => this.props.setActiveTool(1)}>Colour picker</div>
        <div className={`tool${(this.props.activeToolId === 2) ? ' activeTool' : ''}`} onClick={() => this.props.setActiveTool(2)}>Line</div>
        <div className={`tool${(this.props.activeToolId === 3) ? ' activeTool' : ''}`} onClick={() => this.props.setActiveTool(3)}>Square</div>
        <div className={`tool${(this.props.activeToolId === 4) ? ' activeTool' : ''}`} onClick={() => this.props.setActiveTool(4)}>Erazer</div>
        <div className={`tool${(this.props.activeToolId === 5) ? ' activeTool' : ''}`} onClick={() => this.props.setActiveTool(5)}>Bucket</div>
        <div className={`tool${(this.props.activeToolId === 6) ? ' activeTool' : ''}`} onClick={() => this.props.setActiveTool(6)}>Rectangle</div>
        <div className={`tool${(this.props.activeToolId === 7) ? ' activeTool' : ''}`} onClick={() => this.props.setActiveTool(7)}>Circle</div>
        <div className="current-colour"></div>
      </div>
    );
  }
}
