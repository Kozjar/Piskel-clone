function mouseDown() {
  this.context = this.canvas.getContext('2d');
  const imageData = this.context.getImageData(0, 0, 636, 636);
  const { width } = imageData;
  const { height } = imageData;
  const color = 255;
  const borderColor = 255;
  const stack = [[this.canvas.offsetLeft, this.canvas.offsetTop]];
  let pixel;
  let point = 0;
  while (stack.length > 0) {
    pixel = stack.pop();
    if (pixel[0] < 0 || pixel[0] >= width)
      continue;
    if (pixel[1] < 0 || pixel[1] >= height)
      continue;

    // Alpha
    point = pixel[1] * 4 * width + pixel[0] * 4 + 3;

    // Если это не рамка и ещё не закрасили
    if (imageData.data[point] !== borderColor && imageData.data[point] !== color) {
      // Закрашиваем
      imageData.data[point] = color;

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
        pixel[1] - 1,
        stack.push([
          pixel[0],
          pixel[1] + 1,
        ]),
      ]);
    }
  }
  this.context.putImageData(imageData, 0, 0);
}
function mouseMove() { }

function mouseUp() { }

export { mouseDown, mouseMove, mouseUp };
