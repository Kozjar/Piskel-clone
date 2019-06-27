function drawPixel(x, y) {
  const imgData = this.context.createImageData(1, 1);
  imgData.data[0] = this.R;
  imgData.data[1] = this.G;
  imgData.data[2] = this.B;
  imgData.data[3] = 255;
  this.context.putImageData(imgData, x, y, 0, 0, 1, 1);
}

function drawLine(x0, y0, x1, y1) {
  let x0t = Math.floor(x0);
  let y0t = Math.floor(y0);
  const x1t = Math.floor(x1);
  const y1t = Math.floor(y1);

  const dx = Math.abs(x1t - x0t);
  const dy = Math.abs(y1 - y0t);
  const sx = (x0t < x1t) ? 1 : -1;
  const sy = (y0t < y1t) ? 1 : -1;
  let err = dx - dy;

  let count = 0;

  while (true) {
    drawPixel.bind(this)(x0t, y0t); // Do what you need to for this

    if ((x0t == x1t) && (y0t == y1t)) break;
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x0t += sx; }
    if (e2 < dx) { err += dx; y0t += sy; }

    count += 1;
    if (count > 150) {
      console.log('count > 150');
      break;
    }
  }
}

export { drawLine, drawPixel };
