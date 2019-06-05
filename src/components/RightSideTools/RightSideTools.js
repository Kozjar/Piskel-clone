import React, { Component } from 'react';

import AnimPreview from './AnimPreview';
import Layers from './Layers';
import Colors from './Colors';

export default class RightSideTools extends Component {
  render() {
    return (
      <div>
        <AnimPreview/>
        <Layers/>
        <Colors/>
      </div>
    );
  }
}
