import React, { Component } from 'react';

export default class Layers extends Component {
  render() {
    return (
      <div className='layers-wrapper'>
        <div className='layers-title'>Layers</div>
        <div className='layers-tools'>
          <button className='layers-tools__add-new-layer-btn'>+</button>
        </div>
        {this.props.layers.map((layer, i) => <div key={i}>
            {layer.name}
          </div>)}
      </div>
    );
  }
}
