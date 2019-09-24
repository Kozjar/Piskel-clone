let nextLayerNum = 0;

function getValidLayerName(layers) {
  nextLayerNum += 1;
  if (layers.length && layers.every(o => o.name === `Layer ${nextLayerNum}`)) {
    nextLayerNum += 1;
    return getValidLayerName(layers);
  }
  return `Layer ${nextLayerNum}`;
}

function getValidPixel(images, x, y, imgIndex, size, activeLayer) {
  if (imgIndex > images.length) return;
  const pixelNum = y * size * 4 + x * 4;
  if (images[imgIndex] === undefined || imgIndex === activeLayer || images[imgIndex].data[pixelNum + 3] === 0) {
    getValidPixel(images, x, y, imgIndex + 1, size, activeLayer);
    return;
  }
  const canvasId = (imgIndex > activeLayer) ? 'canvas-layers-below' : 'canvas-layers-above';
  const ctx = document.getElementById(canvasId).getContext('2d');
  const pixel = new ImageData(1, 1);
  pixel.data[0] = images[imgIndex].data[pixelNum];
  pixel.data[1] = images[imgIndex].data[pixelNum + 1];
  pixel.data[2] = images[imgIndex].data[pixelNum + 2];
  pixel.data[3] = images[imgIndex].data[pixelNum + 3] * 0.6;
  ctx.putImageData(pixel, x, y);
}

export default class LayersManager {
  addNewLayer() {
    const { layers } = this.state;
    const { frames } = this.state;
    const layerName = getValidLayerName(layers);
    layers.splice(this.state.activeLayer, 0, { name: layerName });
    frames.forEach((frame) => {
      frame.img.splice(this.state.activeLayer, 0, undefined);
    });
    // frames[this.state.activeFrame].img.splice(this.state.activeLayer, 0, undefined);

    this.setState({ layers, frames }, () => this.layersManager.setActiveLayer.bind(this)(this.state.activeLayer));
  }

  deleteLayer(id) {
    let newActiveLayer = id;
    const { layers } = this.state;
    const { frames } = this.state;
    if (layers.length > 1) layers.splice(id, 1);
    frames.forEach((frame) => {
      frame.img.splice(id, 1);
    });
    this.setState({ layers, frames });
  }

  setNewName(n, name) {
    const { layers } = this.state;
    layers[n].name = name;
    this.setState({ layers });
  }

  setActiveLayer(n) {
    this.setState({ activeLayer: n }, () => {
      const aboveCtx = document.getElementById('canvas-layers-above').getContext('2d');
      const belowCtx = document.getElementById('canvas-layers-below').getContext('2d');
      aboveCtx.clearRect(0, 0, this.state.canvasSize, this.state.canvasSize); //  clear cnavas
      belowCtx.clearRect(0, 0, this.state.canvasSize, this.state.canvasSize); //  clear cnavas

      for (let y = 0; y < this.state.canvasSize; y += 1) {
        for (let x = 0; x < this.state.canvasSize; x += 1) {
          getValidPixel(this.state.frames[this.state.activeFrame].img, x, y, 0, this.state.canvasSize, this.state.activeLayer);
        }
      }
      this.setActiveFrame(this.state.activeFrame);
    });
  }
}
