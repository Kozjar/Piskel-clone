import { drawLine, drawPixel } from '../managers/drawingManager';

let startPos = {
  x: 0,
  y: 0,
};

function mouseDown(e) {
  this.context = this.canvas.getContext('2d');
  startPos.x = this.state.mouse.x;
  startPos.y = this.state.mouse.y;
  this.draw = true;
  drawPixel.bind(this, this.state.mouse.x, this.state.mouse.y)();
}

function mouseMove(e) {
  if (this.draw === false) return;
  this.context = this.canvas.getContext('2d');
  const canvas = document.getElementById('main-canvas');
  const context = canvas.getContext('2d');

  context.clearRect(0, 0, canvas.width, canvas.height); //  clear cnavas
  drawLine.bind(this)(startPos.x, startPos.y, this.state.mouse.x, this.state.mouse.y);
}

function mouseUp(e) {
  this.draw = false;
}

export {
  mouseDown, mouseMove, mouseUp,
};
