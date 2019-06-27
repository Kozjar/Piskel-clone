import { drawLine, drawPixel } from '../managers/drawingManager';

function mouseDown(e) {
  e.persist();
  this.context = this.canvas.getContext('2d');
  this.draw = true;
  this.lastHlPixel = undefined;

  drawPixel.bind(this, this.state.mouse.x, this.state.mouse.y)();
}

function mouseMove(e) {
  e.persist();
  if (this.draw === true) {
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
}

function mouseUp(e) {
  this.draw = false;
  this.context = this.canvas.getContext('2d');
  drawPixel.bind(this)(this.state.mouse.x, this.state.mouse.y);
}

export {
  mouseDown, mouseMove, mouseUp,
};
