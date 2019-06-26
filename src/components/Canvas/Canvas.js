// eslint-disable-next-line no-unused-vars
import React, { Component, Fragment } from 'react';

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 20,
      startDrawingContainer: undefined,
      mouseMoveContainer: undefined,
      endDrawingContainer: undefined,
      mouse: { x: 0, y: 0 },
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

    this.context.lineWidth = 3;
  }

  setCanvasScale(n) {
    this.setState({ scale: n });
  }

  onMouseMove(e) {
    e.persist();
    this.setState((state, props) => ({
      mouse: {
        x: (e.pageX - this.canvas.offsetLeft) / state.scale,
        y: (e.pageY - this.canvas.offsetTop) / state.scale,
      },
    }), () => this.props.onMouseMove.bind(this, e)());
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
                  onMouseDown={this.props.onMouseDown.bind(this)}
                  onMouseMove={this.onMouseMove.bind(this)}
                  onMouseUp={this.props.onMouseUp.bind(this)}>
          </canvas>
          {/* <canvas style={style} id="drawing-canvas" width="32" height="32"></canvas> */}
        </div>
        <div className="mouse-stats">x: {this.state.mouse.x}; y: {this.state.mouse.y}</div>
      </Fragment>
    );
  }
}
