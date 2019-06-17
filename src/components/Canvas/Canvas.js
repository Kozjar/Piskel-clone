// eslint-disable-next-line no-unused-vars
import React, { Component, Fragment } from 'react';
import hlPixel from './highlightingPixels';

function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

function rgbToHex(r, g, b) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = { scale: 20 };
    this.canvas = undefined;
    this.context = undefined;
    this.mouse = { x: 0, y: 0 };
    this.draw = false;
    this.lastHlPixel = undefined;
    this.startDrawing = null;
    this.startDrawingContainer = this.startDrawingContainer.bind(this);
    this.mouseMoveContainer = this.mouseMoveContainer.bind(this);
    this.endDrawingContainer = this.endDrawingContainer.bind(this);
    this.wrapFunctions = this.wrapFunctions.bind(this);
    this.a = this.a.bind(this);
    this.bindTool = this.bindTool.bind(this);
    this.pickUpColour = this.pickUpColour.bind(this);
    this.R = 115;
    this.G = 81;
    this.B = 163;
  }

  componentDidMount() {
    this.canvas = document.getElementById('main-canvas');
    this.context = this.canvas.getContext('2d');

    this.wrapFunctions();

    this.context.lineWidth = 3;

    const penTool = document.querySelector('.tool');
    penTool.addEventListener('click', this.wrapFunctions);
  }

  wrapFunctions() {
    this.startDrawing = this.startDrawingContainer;
    this.mouseMove = this.mouseMoveContainer;
    this.endDrawing = this.endDrawingContainer;
  }

  startDrawingContainer(e) {
    e.persist();
    this.context = this.canvas.getContext('2d');
    this.mouse.x = (e.pageX - this.canvas.offsetLeft) / this.state.scale;
    this.mouse.y = (e.pageY - this.canvas.offsetTop) / this.state.scale;
    this.draw = true;
    this.lastHlPixel = undefined;

    this.context.beginPath();
    this.a();
  }

  mouseMoveContainer(e) {
    e.persist();
    this.context = this.canvas.getContext('2d');
    this.mouse.x = (e.pageX - this.canvas.offsetLeft) / this.state.scale;
    this.mouse.y = (e.pageY - this.canvas.offsetTop) / this.state.scale;
    if (this.draw === true) {
      this.a();
    } else {
      this.lastHlPixel = hlPixel(this.mouse.x, this.mouse.y, this.context, this.lastHlPixel);
    }
  }

  endDrawingContainer(e) {
    e.persist();
    this.context = this.canvas.getContext('2d');
    this.mouse.x = (e.pageX - this.canvas.offsetLeft) / this.state.scale;
    this.mouse.y = (e.pageY - this.canvas.offsetTop) / this.state.scale;
    this.draw = false;
    this.context.closePath();
    this.props.onUpdateFramePreview(); // update active frame preview
    this.a();
  }

  a() {
    const imgData = this.context.createImageData(1, 1);
    imgData.data[0] = this.R;
    imgData.data[1] = this.G;
    imgData.data[2] = this.B;
    imgData.data[3] = 255;
    this.context.putImageData(imgData, this.mouse.x, this.mouse.y, 0, 0, 1, 1);
  }

  setCanvasScale(n) {
    this.setState({ scale: n });
  }

  pickUpColour(e) {
    console.log(this.props.currentTool);
    if (this.props.currentTool === 1) {
      const currentColour = document.querySelector('.current-colour');

      this.startDrawing = null;
      this.mouseMove = null;
      this.endDrawing = null;
      this.mouse.x = (e.pageX - this.canvas.offsetLeft) / this.state.scale;
      this.mouse.y = (e.pageY - this.canvas.offsetTop) / this.state.scale;
      console.log(this.mouse.x, this.mouse.y);
      console.log(this.canvas.getContext('2d').getImageData(this.mouse.x, this.mouse.y, 1, 1).data);
      const pixelData = this.canvas.getContext('2d').getImageData(this.mouse.x, this.mouse.y, 1, 1).data;
      console.log(rgbToHex(pixelData[0], pixelData[1], pixelData[2]));
      currentColour.style.backgroundColor = `${rgbToHex(pixelData[0], pixelData[1], pixelData[2])}`;
      [this.R, this.G, this.B] = [pixelData[0], pixelData[1], pixelData[2]];
    }
  }


  render() {
    const style = {
      transform: `scale(${this.state.scale})`,
      transformOrigin: '0 0',
      // marginRight: `${32 * (this.state.scale - 1)}px`,
      // marginBottom: `${32 * (this.state.scale - 1)}px`,
    };
    return (
      <div>
        <canvas style={style} id="main-canvas" width="32" height="32" onClick={this.pickUpColour} onMouseDown={this.startDrawing} onMouseMove={this.mouseMove} onMouseUp={this.endDrawing}>
        </canvas>
      </div>
    );
  }
}
