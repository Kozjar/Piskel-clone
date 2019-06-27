import { drawLine } from '../managers/drawingManager';

const startPos = {
  x: 0,
  y: 0,
};

function mouseDown(e) {
  startPos.x = this.state.mouse.x;
  startPos.y = this.state.mouse.y;
  this.draw = true;
}

function mouseMove(e) {
  if (this.draw === false) return;

  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); //  clear cnavas
  drawLine.bind(this)(startPos.x, startPos.y, startPos.x, this.state.mouse.y);
  drawLine.bind(this)(startPos.x, this.state.mouse.y, this.state.mouse.x, this.state.mouse.y);
  drawLine.bind(this)(this.state.mouse.x, this.state.mouse.y, this.state.mouse.x, startPos.y);
  drawLine.bind(this)(startPos.x, startPos.y, this.state.mouse.x, startPos.y);
}

function mouseUp(e) {
  this.draw = false;
  this.context = this.canvas.getContext('2d');
  drawLine.bind(this)(startPos.x, startPos.y, startPos.x, this.state.mouse.y);
  drawLine.bind(this)(startPos.x, this.state.mouse.y, this.state.mouse.x, this.state.mouse.y);
  drawLine.bind(this)(this.state.mouse.x, this.state.mouse.y, this.state.mouse.x, startPos.y);
  drawLine.bind(this)(startPos.x, startPos.y, this.state.mouse.x, startPos.y);
}

export { mouseDown, mouseMove, mouseUp };
