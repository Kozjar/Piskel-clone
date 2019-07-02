function compareDataColors(data, point, color) {
  if (data[point + 0] === color.r
    && data[point + 1] === color.g
    && data[point + 2] === color.b) return true;
  return false;
}

function mouseDown(e) {
  this.context = this.canvas.getContext('2d');
  const imageData = this.context.getImageData(0, 0, this.state.canvasSize, this.state.canvasSize);
  const { width } = imageData;
  const { height } = imageData;
  const pixelData = this.canvas.getContext('2d').getImageData(this.state.mouse.x, this.state.mouse.y, 1, 1).data;
  const color = { r: pixelData[0], g: pixelData[1], b: pixelData[2] };
  const stack = [[this.state.mouse.x, this.state.mouse.y]];
  let pixel;
  let point = 0;
  while (stack.length > 0) {
    pixel = stack.pop();
    if (pixel[0] < 0 || pixel[0] >= width) continue;
    if (pixel[1] < 0 || pixel[1] >= height) continue;

    // Alpha
    point = pixel[1] * 4 * width + pixel[0] * 4;

    // Если это не рамка и ещё не закрасили
    if (compareDataColors(imageData.data, point, color)) {
      // Закрашиваем
      imageData.data[point] = this.props.mainColor.r;
      imageData.data[point + 1] = this.props.mainColor.g;
      imageData.data[point + 2] = this.props.mainColor.b;
      imageData.data[point + 3] = 255;

      // Ставим соседей в стек на проверку
      stack.push([
        pixel[0] - 1,
        pixel[1],
      ]);

      stack.push([
        pixel[0] + 1,
        pixel[1],
      ]);

      stack.push([
        pixel[0],
        pixel[1] - 1]);

      stack.push([
        pixel[0],
        pixel[1] + 1,
      ]);
    }
  }
  this.context.putImageData(imageData, 0, 0);
}
function mouseMove() { }

function mouseUp() { }

export { mouseDown, mouseMove, mouseUp };
