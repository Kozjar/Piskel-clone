function mouseDown() {
  const pixelData = this.canvas.getContext('2d').getImageData(this.state.mouse.x, this.state.mouse.y, 1, 1).data;
  this.props.setMainColor(pixelData[0], pixelData[1], pixelData[2]);
}
function mouseMove() { }

function mouseUp() { }

export { mouseDown, mouseMove, mouseUp };
