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
      mouse: { x: 0, y: 0 }, // Current mouse position
      mousePrev: { x: 0, y: 0 }, // Last mouse position
      showMousePos: false, // Indicates if mouse position should be showen for user
    };
    this.canvas = undefined; // HTML main canvas element
    this.drawingCanvas = undefined; // HTML drawing canvas element
    this.context = undefined; // any canvas contxet
    this.draw = false; // Shows whether the current tool draws

    // Active color
    this.R = 115;
    this.G = 81;
    this.B = 163;
  }

  componentDidMount() { // Set canvas elements
    this.canvas = document.getElementById('main-canvas');
    this.drawingCanvas = document.getElementById('drawing-canvas');

    document.body.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.body.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  setMousePos(x, y, func) {
    this.setState((state, props) => ({
      mousePrev: {
        x: state.mouse.x,
        y: state.mouse.y,
      },
      mouse: {
        x,
        y,
      },
    }), func);
  }

  setCanvasScale(n) { // set canvas scale (not used now)
    this.setState({ scale: n });
  }

  onMouseDown(e) {
    this.draw = true;
    this.context = this.drawingCanvas.getContext('2d'); // Set current context to drawing canvas ctx
    hlPixel(-1, -1); // Unhighlight pixel
    this.props.onMouseDown.bind(this, e)(); // execute tools mouseDown function
  }

  onMouseMove(e) {
    const newCoord = { // Get current nouse coordinates
      x: Math.floor((e.pageX - this.canvas.offsetLeft) / this.state.scale),
      y: Math.floor((e.pageY - this.canvas.offsetTop) / this.state.scale),
    };

    // If mouse moved to another position, update actual coords
    if (newCoord.x !== this.state.mouse.x || newCoord.y !== this.state.mouse.y) {
      this.setMousePos(newCoord.x, newCoord.y, () => {
      // After we set new coords execute mouseMove tools function
      // or just highlight current pixel if we dont want to draw something
        this.context = this.drawingCanvas.getContext('2d'); // Set current context to drawing canvas ctx
        if (this.draw) {
          this.props.onMouseMove.bind(this, e)(); // execute tools mouseMove function
        } else {
          hlPixel(this.state.mouse.x, this.state.mouse.y); // Highlight current pixel
        }
      });
    }
  }

  onMouseUp(e) {
    if (this.draw) {
      this.draw = false;
      this.context = this.drawingCanvas.getContext('2d'); // Set current context to drawing canvas ctx
      this.props.onMouseUp.bind(this, e)(); // Execute mouseUp tools function
      hlPixel(this.state.mouse.x, this.state.mouse.y); // Highlight current pixel
      this.props.onUpdateFramePreview(this.canvas.width, this.canvas.height); // update active frame preview
    }
  }

  render() {
    const style = {
      transform: `scale(${this.state.scale})`, // Set canvas scale to current scale num
      transformOrigin: '0 0',
    };
    return (
      <Fragment>
        <div id="main-canvas-container">
          <canvas style={style} className="canvas" id="main-canvas" width="32" height="32"></canvas>
          <canvas style={style} className="canvas" id="drawing-canvas" width="32" height="32"
                  onMouseDown={this.onMouseDown.bind(this)}
                  onMouseLeave={() => this.setState({ showMousePos: false })}
                  onMouseEnter={() => this.setState({ showMousePos: true })} >
          </canvas>
        </div>
        {
          (this.state.showMousePos)
          && <div className="mouse-stats">
            PrevX: {this.state.mousePrev.x}; PrevY: {this.state.mousePrev.y}<br />
            x: {this.state.mouse.x}; y: {this.state.mouse.y}
          </div>
        }
      </Fragment>
    );
  }
}
