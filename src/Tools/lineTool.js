import { drawLine } from '../managers/drawingManager';

const startPos = {
  x: 0,
  y: 0,
};

function mouseDown() {
  startPos.x = this.state.mouse.x;
  startPos.y = this.state.mouse.y;
}

function mouseMove() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); //  clear cnavas
  drawLine.bind(this)(startPos.x, startPos.y, this.state.mouse.x, this.state.mouse.y);
}

function mouseUp() {
  this.context = this.canvas.getContext('2d');
  drawLine.bind(this)(startPos.x, startPos.y, this.state.mouse.x, this.state.mouse.y);
}

export {
  mouseDown, mouseMove, mouseUp,
};
