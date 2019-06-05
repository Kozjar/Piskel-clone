import React, { Component } from 'react';

import ToolsBar from './ToolsBar/ToolsBar';
import FramesBar from './FramesBar/FramesBar';
import Workspace from './Workspace/Workspace';
import RightSideTools from './RightSideTools/RightSideTools';

export default class Main extends Component {
  render() {
    return (
      <main>
        <ToolsBar/>
        <FramesBar/>
        <Workspace/>
        <RightSideTools/>
      </main>
    );
  }
}
