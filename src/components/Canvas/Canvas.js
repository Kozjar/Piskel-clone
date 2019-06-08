// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';

export default class Canvas extends Component {
  constructor(props) {
    super(props);
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
  }

  startDrawing(e) {
    e.persist();
    this.context = this.canvas.getContext('2d');
    this.mouse.x = e.pageX - this.canvas.offsetLeft - 5;
    this.mouse.y = e.pageY - this.canvas.offsetTop - 5;
    this.draw = true;

    this.context.beginPath();
    // this.context.moveTo(this.mouse.x, this.mouse.y);
    this.a();
  }

  mouseMove(e) {
    e.persist();
    this.context = this.canvas.getContext('2d');
    if (this.draw === true) {
      this.mouse.x = e.pageX - this.canvas.offsetLeft - 5;
      this.mouse.y = e.pageY - this.canvas.offsetTop - 5;
      this.a();
    }
  }

  endDrawing(e) {
    e.persist();
    this.context = this.canvas.getContext('2d');
    this.mouse.x = e.pageX - this.canvas.offsetLeft - 5;
    this.mouse.y = e.pageY - this.canvas.offsetTop - 5;
    this.draw = false;
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

  render() {
    return (
      <canvas id="main-canvas" width="500" height="500" onMouseDown={this.startDrawing} onMouseMove={this.mouseMove} onMouseUp={this.endDrawing}>
      </canvas>
    );
  }
}
