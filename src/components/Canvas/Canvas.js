// eslint-disable-next-line no-unused-vars
import React, { Component, Fragment } from 'react';
import hlPixel from './highlightingPixels';

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = { scale: 20 };
    this.canvas = undefined;
    this.context = undefined;
    this.mouse = { x: 0, y: 0 };
    this.draw = false;
    this.lastHlPixel = undefined;

    this.startDrawing = this.startDrawing.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.endDrawing = this.endDrawing.bind(this);
    this.a = this.a.bind(this);
    this.bindTool = this.bindTool.bind(this);
    this.pickUpColour = this.pickUpColour.bind(this);
  }

  componentDidMount() {
    this.canvas = document.getElementById('main-canvas');
    this.context = this.canvas.getContext('2d');
    this.context.lineWidth = 3;
  }

  startDrawing(e) {
    e.persist();
    this.context = this.canvas.getContext('2d');
    this.mouse.x = (e.pageX - this.canvas.offsetLeft) / this.state.scale;
    this.mouse.y = (e.pageY - this.canvas.offsetTop) / this.state.scale;
    this.draw = true;
    this.lastHlPixel = undefined;

    this.context.beginPath();
    this.a();
  }

  mouseMove(e) {
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

  endDrawing(e) {
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
    imgData.data[0] = 115;
    imgData.data[1] = 81;
    imgData.data[2] = 163;
    imgData.data[3] = 255;
    this.context.putImageData(imgData, this.mouse.x, this.mouse.y, 0, 0, 1, 1);
  }

  setCanvasScale(n) {
    this.setState({ scale: n });
  }

  // it's doesn't work
  bindTool() {
    this.canvas.addEventListener('onclick', function () { console.log('click') });
    this.canvas.addEventListener(onmousemove, () => this.mouseMove);
    this.canvas.addEventListener(onmouseup, () => this.endDrawing);
  }

  pickUpColour() {
    console.log(this.canvas.getContext('2d').getImageData(this.mouse.x, this.mouse.y, 1, 1).data);
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
