// eslint-disable-next-line no-unused-vars
import React, { Component, Fragment } from 'react';

import hlPixel from '../../managers/highlightingManager';

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 15,
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
    this.WORKSPACE_WIDTH = 940;
    this.containerSize = this.props.canvasSize * this.state.scale;

    // Active color
    this.Alpha = 255;
  }

  componentDidMount() { // Set canvas elements
    this.canvas = document.getElementById('main-canvas');
    this.drawingCanvas = document.getElementById('drawing-canvas');

    document.body.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.body.addEventListener('mouseup', this.onMouseUp.bind(this));
    console.log('palette');
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

  setScale(n) {
    if (n < 1 || (n * this.props.canvasSize) > 1500) return;
    this.containerSize = this.props.canvasSize * n;
    this.setState({ scale: n });
  }

  onWheel(e) {
    const delta = e.deltaY;

    if (delta > 0) this.setScale(this.state.scale * 0.9);
    else this.setScale(this.state.scale * 1.1);
  }

  onMouseDown(e) {
    this.draw = true;
    this.context = this.drawingCanvas.getContext('2d'); // Set current context to drawing canvas ctx
    hlPixel(-1, -1); // Unhighlight pixel
    this.props.onMouseDown.bind(this, e)(); // execute tools mouseDown function
  }

  onMouseMove(e) {
    let scaledOffset = 0;
    if (this.containerSize > this.WORKSPACE_WIDTH) {
      scaledOffset = (this.containerSize - this.WORKSPACE_WIDTH) / 2;
    }

    const newCoord = { // Get current nouse coordinates
      x: Math.floor((e.pageX - this.canvas.parentElement.offsetLeft + scaledOffset) / this.state.scale),
      y: Math.floor((e.pageY - this.canvas.parentElement.offsetTop + scaledOffset) / this.state.scale),
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
    const canvasStyle = {
      transform: `scale(${this.state.scale})`, // Set canvas scale to current scale num
      transformOrigin: '0 0',
    };
    const backgroundStyle = {
      width: this.containerSize,
      height: this.containerSize,
    };
    if (this.containerSize > this.WORKSPACE_WIDTH) {
      canvasStyle.left = `-${(this.containerSize - this.WORKSPACE_WIDTH) / 2}px`;
      canvasStyle.top = `-${(this.containerSize - this.WORKSPACE_WIDTH) / 2}px`;
    }
    return (
      <div style={{ width: `${this.WORKSPACE_WIDTH}px` }} className='workspace' onWheel={this.onWheel.bind(this)}>
        <div style={backgroundStyle} id="main-canvas-container">
          <div style={backgroundStyle} className='canvas-background'></div>
          <canvas style={canvasStyle} className="canvas" id="main-canvas" width={this.props.canvasSize} height={this.props.canvasSize}></canvas>
          <canvas style={canvasStyle} className="canvas" id="drawing-canvas" width={this.props.canvasSize} height={this.props.canvasSize}
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
      </div>
    );
  }
}
