// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvas = document.querySelector('main-canvas');
  }

  // eslint-disable-next-line class-methods-use-this
  drawCanvas() {
    const canvas = document.querySelector('.main-canvas');
    const context = canvas.getContext('2d');

    const mouse = { x: 0, y: 0 };
    let draw = false;
    canvas.addEventListener('mousedown', (e) => {
      mouse.x = e.pageX - canvas.offsetLeft;
      mouse.y = e.pageY - canvas.offsetTop;
      draw = true;
      context.beginPath();
      context.moveTo(mouse.x, mouse.y);
    });
    canvas.addEventListener('mousemove', (e) => {
      if (draw === true) {
        mouse.x = e.pageX - canvas.offsetLeft;
        mouse.y = e.pageY - canvas.offsetTop;
        context.lineTo(mouse.x, mouse.y);
        context.stroke();
      }
    });
    canvas.addEventListener('mouseup', (e) => {
      mouse.x = e.pageX - canvas.offsetLeft;
      mouse.y = e.pageY - canvas.offsetTop;
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
