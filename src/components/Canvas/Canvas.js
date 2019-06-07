// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   canvas: undefined,
    //   context: undefined,
    //   mouse: { x: 0, y: 0 },
    //   draw: false,
    // };
    this.canvas = undefined;
    this.context = undefined;
    this.mouse = { x: 0, y: 0 };
    this.draw = false;

    this.startDrawing = this.startDrawing.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.endDrawing = this.endDrawing.bind(this);
  }

  componentDidMount() {
    // this.setState({
    //   canvas: document.getElementById('main-canvas'),
    //   context: document.getElementById('main-canvas').getContext('2d'),
    // });
    this.canvas = document.getElementById('main-canvas');
    this.context = this.canvas.getContext('2d');
    console.log(this.canvas);
    console.log(this.context);
  }

  startDrawing(e) {
    e.persist();
    // this.setState((state, props) => ({
    //   mouse: {
    //     x: state.canvas.offsetLeft,
    //     y: state.canvas.offsetTop,
    //   },
    //   draw: true,
    // }));
    this.mouse.x = e.pageX - this.canvas.offsetLeft;
    this.mouse.y = e.pageY - this.canvas.offsetTop;
    this.draw = true;

    this.context.beginPath();
    this.context.moveTo(this.mouse.x, this.mouse.y);
  }

  mouseMove(e) {
    e.persist();
    if (this.draw === true) {
      // this.setState((state, props) => ({
      //   mouse: {
      //     x: e.pageX - state.canvas.offsetLeft,
      //     y: e.pageY - state.canvas.offsetTop,
      //   },
      // }));
      this.mouse.x = e.pageX - this.canvas.offsetLeft;
      this.mouse.y = e.pageY - this.canvas.offsetTop;

      this.context.lineTo(this.mouse.x, this.mouse.y);
      this.context.stroke();
    }
  }

  endDrawing(e) {
    e.persist();
    // this.setState((state, props) => ({
    //   mouse: {
    //     x: e.pageX - state.canvas.offsetLeft,
    //     y: e.pageY - state.canvas.offsetTop,
    //   },
    //   draw: false,
    // }));
    this.mouse.x = e.pageX - this.canvas.offsetLeft;
    this.mouse.y = e.pageY - this.canvas.offsetTop;
    this.draw = false;

    this.context.lineTo(this.mouse.x, this.mouse.y);
    this.context.stroke();
    this.context.closePath();
  }

  // eslint-disable-next-line class-methods-use-this
  // drawCanvas() {
  //   // const canvas = document.querySelector('.main-canvas');
  //   const context = this.state.canvas.getContext('2d');

  //   const mouse = { x: 0, y: 0 };
  //   let draw = false;
  //   this.state.canvas.addEventListener('mousedown', (e) => {

  //   });
  //   this.state.canvas.addEventListener('mousemove', function (e) {

  //     }
  //   });
  //   this.state.canvas.addEventListener('mouseup', function (e) {
  //     mouse.x = e.pageX - this.state.canvas.offsetLeft;
  //     mouse.y = e.pageY - this.state.canvas.offsetTop;
  //     context.lineTo(mouse.x, mouse.y);
  //     context.stroke();
  //     context.closePath();
  //     draw = false;
  //   });
  // }

  render() {
    return (
      <canvas id="main-canvas" width="500" height="500" onMouseDown={this.startDrawing} onMouseMove={this.mouseMove} onMouseUp={this.endDrawing}>
      </canvas>
    );
  }
}
