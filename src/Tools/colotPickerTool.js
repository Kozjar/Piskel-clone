function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

function rgbToHex(r, g, b) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function mouseDown() {
  const pixelData = this.canvas.getContext('2d').getImageData(this.state.mouse.x, this.state.mouse.y, 1, 1).data;
  this.props.setMainColor(pixelData[0], pixelData[1], pixelData[2]);
}
function mouseMove() {}

function mouseUp() {}

export { mouseDown, mouseMove, mouseUp };
