import { drawLine, drawPixel } from '../managers/drawingManager';

function mouseDown(e) {
  this.Alpha = 0;
  e.persist();
  this.context = this.canvas.getContext('2d');
  this.lastHlPixel = undefined;

  drawPixel.bind(this, this.state.mouse.x, this.state.mouse.y)();
}

function mouseMove() {
  this.context = this.canvas.getContext('2d');
  if (this.state.mouse.x > this.state.mousePrev.x + 1
    || this.state.mouse.x < this.state.mousePrev.x - 1
    || this.state.mouse.y > this.state.mousePrev.y + 1
    || this.state.mouse.y < this.state.mousePrev.y - 1) {
    drawLine.bind(this)(this.state.mousePrev.x, this.state.mousePrev.y, this.state.mouse.x, this.state.mouse.y);
  } else {
    drawPixel.bind(this)(this.state.mouse.x, this.state.mouse.y);
  }
}

function mouseUp() {
  this.context = this.canvas.getContext('2d');
  drawPixel.bind(this)(this.state.mouse.x, this.state.mouse.y);
  this.Alpha = 255;
}

export {
  mouseDown, mouseMove, mouseUp,
};
