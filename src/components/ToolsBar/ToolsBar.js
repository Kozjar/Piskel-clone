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
        <div className="tool" onClick={() => this.props.setCurrentTool(this.penTool)}>Pen</div>
        <div className="tool" onClick={() => this.props.setCurrentTool(this.colourPickerTool)} >Colour picker</div>
        <div className="tool" onClick={() => this.props.setCurrentTool(this.bucketTool)} >Bucket</div>
        <div className="tool" onClick={() => this.props.setCurrentTool(this.eraserTool)} >Eraser</div>
        <div className="tool" onClick={() => this.props.setCurrentTool(this.moveTool)} >Move</div>
        <div className="tool" onClick={() => this.props.setCurrentTool(this.rectangleTool)}>Rectangle</div>
        <div className="tool" onClick={() => this.props.setCurrentTool(this.cicrleTool)} >Circle</div>
        <div className="current-colour"></div>
      </div>
    );
  }
}
