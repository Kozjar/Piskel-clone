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
  }

  componentDidMount() {
    this.canvas = document.getElementById('main-canvas');
  }

  startDrawing(e) {
    e.persist();
    this.context = this.canvas.getContext('2d');
    this.mouse.x = e.pageX - this.canvas.offsetLeft;
    this.mouse.y = e.pageY - this.canvas.offsetTop;
    this.draw = true;

    this.context.beginPath();
    this.context.moveTo(this.mouse.x, this.mouse.y);
  }

  mouseMove(e) {
    e.persist();
    this.context = this.canvas.getContext('2d');
    if (this.draw === true) {
      this.mouse.x = e.pageX - this.canvas.offsetLeft;
      this.mouse.y = e.pageY - this.canvas.offsetTop;

      this.context.lineTo(this.mouse.x, this.mouse.y);
      this.context.stroke();
    }
  }

  endDrawing(e) {
    e.persist();
    this.context = this.canvas.getContext('2d');
    this.mouse.x = e.pageX - this.canvas.offsetLeft;
    this.mouse.y = e.pageY - this.canvas.offsetTop;
    this.draw = false;

    this.context.lineTo(this.mouse.x, this.mouse.y);
    this.context.stroke();
    this.context.closePath();

    this.props.onUpdateFramePreview();
  }

  render() {
    return (
      <canvas id="main-canvas" width="500" height="500" onMouseDown={this.startDrawing} onMouseMove={this.mouseMove} onMouseUp={this.endDrawing}>
      </canvas>
    );
  }
}
