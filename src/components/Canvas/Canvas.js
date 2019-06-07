// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas: document.querySelector('.main-canvas'),
    };
    this.drawCanvas = this.drawCanvas.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  drawCanvas() {
    // const canvas = document.querySelector('.main-canvas');
    const context = this.state.canvas.getContext('2d');

    const mouse = { x: 0, y: 0 };
    let draw = false;
    this.state.canvas.addEventListener('mousedown', function (e) {
      mouse.x = e.pageX - this.state.canvas.offsetLeft;
      mouse.y = e.pageY - this.state.canvas.offsetTop;
      draw = true;
      context.beginPath();
      context.moveTo(mouse.x, mouse.y);
    });
    this.state.canvas.addEventListener('mousemove', function (e) {
      if (draw === true) {
        mouse.x = e.pageX - this.state.canvas.offsetLeft;
        mouse.y = e.pageY - this.state.canvas.offsetTop;
        context.lineTo(mouse.x, mouse.y);
        context.stroke();
      }
    });
    this.state.canvas.addEventListener('mouseup', function (e) {
      mouse.x = e.pageX - this.state.canvas.offsetLeft;
      mouse.y = e.pageY - this.state.canvas.offsetTop;
      context.lineTo(mouse.x, mouse.y);
      context.stroke();
      context.closePath();
      draw = false;
    });
  }
  render() {
    return (
      <canvas className="main-canvas" onMouseEnter={this.drawCanvas}>
      </canvas>
    );
  }
}
