// eslint-disable-next-line no-unused-vars
import React, { Component, Fragment } from 'react';

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = { scale: 20 };
    this.canvas = undefined;
    this.context = undefined;
    this.mouse = { x: 0, y: 0 };
    this.draw = false;

    this.startDrawing = this.startDrawing.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.endDrawing = this.endDrawing.bind(this);
    this.a = this.a.bind(this);
  }

  componentDidMount() {
    this.canvas = document.getElementById('main-canvas');
    this.context = this.canvas.getContext('2d');
    this.context.lineWidth = 3;
  }

  logMousePos() {
    console.log(`mouse.x = ${this.mouse.x}; mouse.y = ${this.mouse.y}`);
  }

  startDrawing(e) {
    e.persist();
    this.context = this.canvas.getContext('2d');
    this.mouse.x = (e.pageX - this.canvas.offsetLeft) / this.state.scale;
    this.mouse.y = (e.pageY - this.canvas.offsetTop) / this.state.scale;
    this.draw = true;
    this.logMousePos();

    this.context.beginPath();
    // this.context.moveTo(this.mouse.x, this.mouse.y);
    this.a();
  }

  mouseMove(e) {
    e.persist();
    this.context = this.canvas.getContext('2d');
    this.mouse.x = (e.pageX - this.canvas.offsetLeft) / this.state.scale;
    this.mouse.y = (e.pageY - this.canvas.offsetTop) / this.state.scale;
    if (this.draw === true) {
      this.logMousePos();
      this.a();
      // this.context.lineTo(this.mouse.x, this.mouse.y);
      // this.context.stroke();
    }
  }

  endDrawing(e) {
    e.persist();
    this.context = this.canvas.getContext('2d');
    this.mouse.x = (e.pageX - this.canvas.offsetLeft) / this.state.scale;
    this.mouse.y = (e.pageY - this.canvas.offsetTop) / this.state.scale;
    this.draw = false;
    this.logMousePos();
    // this.context.lineTo(this.mouse.x, this.mouse.y);
    // this.context.stroke();
    this.context.closePath();
    this.props.onUpdateFramePreview(); // update active frame preview
    this.a();
  }

  a() {
    const imgData = this.context.createImageData(5, 5);
    // const index = 4 * (this.mouse.x + this.mouse.y * 500);
    for (let i = 0; i < imgData.data.length; i += 4) {
      imgData.data[i + 0] = 255;
      imgData.data[i + 1] = 0;
      imgData.data[i + 2] = 0;
      imgData.data[i + 3] = 255;
    }
    this.context.putImageData(imgData, this.mouse.x + 5, this.mouse.y + 5, 0, 0, 5, 5);
  }

  setCanvasScale(n) {
    this.setState({ scale: n });
  }

  a() {
    const imgData = this.context.createImageData(1, 1);
    // const index = 4 * (this.mouse.x + this.mouse.y * 500);
    for (let i = 0; i < imgData.data.length; i += 4) {
      imgData.data[i + 0] = 0;
      imgData.data[i + 1] = 0;
      imgData.data[i + 2] = 0;
      imgData.data[i + 3] = 255;
    }
    this.context.putImageData(imgData, this.mouse.x, this.mouse.y, 0, 0, 1, 1);
  }

  render() {
    const style = {
      transform: `scale(${this.state.scale})`,
      transformOrigin: '0 0',
      marginRight: `${32 * (this.state.scale - 1)}px`,
      marginBottom: `${32 * (this.state.scale - 1)}px`,
    };
    return (
      <div>
        <canvas style={style} id="main-canvas" width="32" height="32" onMouseDown={this.startDrawing} onMouseMove={this.mouseMove} onMouseUp={this.endDrawing}>
        </canvas>
        <button onClick={() => this.setCanvasScale(1)}>scale 1</button>
        <button onClick={() => this.setCanvasScale(0.5)}>scale 0.5</button>
        <button onClick={() => this.setCanvasScale(2)}>scale 2</button>
        <button onClick={() => this.setCanvasScale(this.state.scale + 1)}>scale +</button>
        <button onClick={() => this.setCanvasScale(this.state.scale - 1)}>scale -</button>
      </div>
    );
  }
}
