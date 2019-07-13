import React, { Component } from 'react';

import AnimPreview from './AnimPreview';
import Layers from './Layers';
import Colors from './Colors';

export default class RightSideTools extends Component {
  render() {
    return (
      <div className='right-side-tools'>
        <AnimPreview/>
        <Layers layers={this.props.layers}
          activeLayer={this.props.activeLayer}
          addNewLayer={this.props.addNewLayer.bind(this)}
          deleteLayer={this.props.deleteLayer.bind(this)}
          setActiveLayer={this.props.setActiveLayer.bind(this)}
          setNewLayerName={this.props.setNewLayerName.bind(this)}/>
        <Colors/>
      </div>
    );
  }
}
