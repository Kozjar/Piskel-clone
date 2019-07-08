let nextLayerNum = 0;

function getValidLayerName(layers) {
  console.log(nextLayerNum);
  console.log((layers.length && layers.every(o => o.name === `Layer ${nextLayerNum}`)));
  nextLayerNum += 1;
  if (layers.length && layers.every(o => o.name === `Layer ${nextLayerNum}`)) {
    nextLayerNum += 1;
    return getValidLayerName(layers);
  }
  return `Layer ${nextLayerNum}`;
}

export default class LayersManager {
  addNewLayer() {
    const { layers } = this.state;

    const layerName = getValidLayerName(layers);
    layers.push({ name: layerName });

    this.setState({ layers });
  }

  deleteLayer(id) {
    const { layers } = this.state;
    layers.splice(id, 1);
    this.setState({ layers });
  }

  setNewName(n, name) {
    const { layers } = this.state;
    layers[n].name = name;
    this.setState({ layers });
  }
}
