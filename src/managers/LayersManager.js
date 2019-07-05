let nextLayerNum = 1;

export default class LayersManager {
  addNewLayer() {
    const { layers } = this.state;
    while (layers.lenght && layers.every(o => o.name === `Layer ${nextLayerNum}`)) nextLayerNum += 1;
    const layerName = `Layer ${nextLayerNum}`;
    layers.push({ name: layerName });

    this.setState({ layers });
  }
}
