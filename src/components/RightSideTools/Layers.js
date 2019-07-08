import React, { Component } from 'react';

import Layer from './LayerComponent';

export default class Layers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onEdit: -1,
    };
  }

  setEditMode(layerNum) {
    if (layerNum >= 0) this.setState({ onEdit: layerNum }, () => document.getElementById(`layer-name-input-${layerNum}`).focus());
    else this.setState({ onEdit: layerNum });
  }

  render() {
    return (
      <div className='layers-wrapper'>
        <div className='layers-title'>Layers</div>
        <div className='layers-tools'>
          <button className='layers-tools__add-new-layer-btn' onClick={this.props.addNewLayer.bind(this)}>+</button>
        </div>
        {this.props.layers.map((layer, i) => <Layer key={i} name={layer.name}
              layerId={i}
              editMode={this.state.onEdit === i}
              isActive={this.props.activeLayer === i}
              setActiveLayer={this.props.setActiveLayer.bind(this)}
              setEditMode={this.setEditMode.bind(this)}
              setNewName={this.props.setNewLayerName.bind(this)}
              deleteLayer={this.props.deleteLayer.bind(this)}/>)}
      </div>
    );
  }
}
