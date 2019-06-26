import hlPixel from '../managers/highlightingManager';

function drawPixel() {
  const imgData = this.context.createImageData(1, 1);
  imgData.data[0] = this.R;
  imgData.data[1] = this.G;
  imgData.data[2] = this.B;
  imgData.data[3] = 255;
  this.context.putImageData(imgData, this.state.mouse.x, this.state.mouse.y, 0, 0, 1, 1);
}

function mouseDown(e) {
  e.persist();
  this.context = this.canvas.getContext('2d');
  this.draw = true;
  this.lastHlPixel = undefined;

  this.context.beginPath();
  drawPixel.bind(this)();
}

function mouseMove(e) {
  e.persist();
  this.context = this.canvas.getContext('2d');
  if (this.draw === true) {
    drawPixel.bind(this)();
  } else {
    this.lastHlPixel = hlPixel(this.state.mouse.x, this.state.mouse.y, this.context, this.lastHlPixel);
  }
}

function mouseUp(e) {
  e.persist();
  this.context = this.canvas.getContext('2d');
  this.draw = false;
  this.context.closePath();
  this.props.onUpdateFramePreview(); // update active frame preview
  drawPixel.bind(this)();
}

export { mouseDown, mouseMove, mouseUp };
