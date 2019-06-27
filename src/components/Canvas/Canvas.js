// eslint-disable-next-line no-unused-vars
import React, { Component, Fragment } from 'react';

import hlPixel from '../../managers/highlightingManager';

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 20,
      startDrawingContainer: undefined,
      mouseMoveContainer: undefined,
      endDrawingContainer: undefined,
      mouse: { x: 0, y: 0 },
      mousePrev: { x: 0, y: 0 },
    };
    this.canvas = undefined;
    this.context = undefined;
    this.mouse = { x: 0, y: 0 };
    this.draw = false;
    this.lastHlPixel = undefined;
    this.startDrawing = null;

    this.R = 115;
    this.G = 81;
    this.B = 163;
  }

  componentDidMount() {
    this.canvas = document.getElementById('main-canvas');
    this.context = this.canvas.getContext('2d');
    console.log(this.context);
    // this.context.lineWidth = 3;
  }

  setCanvasScale(n) {
    this.setState({ scale: n });
  }

  onMouseDown(e) {
    this.lastHlPixel = undefined;
    this.props.onMouseDown.bind(this, e)();
  }

  onMouseMove(e) {
    e.persist();
    const newCoord = {
      x: Math.floor((e.pageX - this.canvas.offsetLeft) / this.state.scale),
      y: Math.floor((e.pageY - this.canvas.offsetTop) / this.state.scale),
    };

    if (newCoord.x !== this.state.mouse.x || newCoord.y !== this.state.mouse.y) {
      this.setState((state, props) => ({
        mousePrev: {
          x: state.mouse.x,
          y: state.mouse.y,
        },
        mouse: {
          x: newCoord.x,
          y: newCoord.y,
        },
      }), () => {
        this.context = this.canvas.getContext('2d');
        if (this.draw) {
          this.props.onMouseMove.bind(this, e)();
        } else {
          this.lastHlPixel = hlPixel(this.state.mouse.x, this.state.mouse.y, this.context, this.lastHlPixel);
        }
      });
    }
  }

  onMouseUp(e) {
    this.context = this.canvas.getContext('2d');
    this.props.onMouseUp.bind(this, e)();
    this.props.onUpdateFramePreview(); // update active frame preview
  }

  render() {
    const style = {
      transform: `scale(${this.state.scale})`,
      transformOrigin: '0 0',
    };
    return (
      <Fragment>
        <div id="main-canvas-container">
          <canvas style={style} id="main-canvas" width="32" height="32"
                  onMouseDown={this.onMouseDown.bind(this)}
                  onMouseMove={this.onMouseMove.bind(this)}
                  onMouseUp={this.onMouseUp.bind(this)}>
          </canvas>
          {/* <canvas style={style} id="drawing-canvas" width="32" height="32"></canvas> */}
        </div>
        <div className="mouse-stats">PrevX: {this.state.mousePrev.x}; PrevY: {this.state.mousePrev.y}<br/>x: {this.state.mouse.x}; y: {this.state.mouse.y}</div>
      </Fragment>
    );
  }
}
