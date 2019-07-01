// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import pen from '../../Assets/icons/pencil.png';
import eyedropper from '../../Assets/icons/eyedropper.png';
import rectangle from '../../Assets/icons/rectangle.png';
import eraser from '../../Assets/icons/eraser.png';
import bucket from '../../Assets/icons/paint-bucket.png';
import circle from '../../Assets/icons/circle.png';
import line from '../../Assets/icons/diagonal-line.png';


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
        <div className={`tool${(this.props.activeToolId === 0) ? ' activeTool' : ''}`} onClick={() => this.props.setActiveTool(0)}>
          <img src={pen} alt="" />
        </div>
        <div className={`tool${(this.props.activeToolId === 1) ? ' activeTool' : ''}`} onClick={() => this.props.setActiveTool(1)}>
          <img src={eyedropper} alt="" />
        </div>
        <div className={`tool${(this.props.activeToolId === 2) ? ' activeTool' : ''}`} onClick={() => this.props.setActiveTool(2)}>
          <img src={line} alt="" />
        </div>
        <div className={`tool${(this.props.activeToolId === 3) ? ' activeTool' : ''}`} onClick={() => this.props.setActiveTool(3)}>
          <img src={rectangle} alt="" />
        </div>
        <div className={`tool${(this.props.activeToolId === 4) ? ' activeTool' : ''}`} onClick={() => this.props.setActiveTool(4)}>
          <img src={eraser} alt="" />
        </div>
        <div className={`tool${(this.props.activeToolId === 5) ? ' activeTool' : ''}`} onClick={() => this.props.setActiveTool(5)}>
          <img src={bucket} alt="" />
        </div>
        <div className={`tool${(this.props.activeToolId === 6) ? ' activeTool' : ''}`} onClick={() => this.props.setActiveTool(6)}>
          <img src={circle} alt="" />
        </div>
        <div className="current-colour">
        </div>
      </div>
    );
  }
}
