import React, { Component } from 'react';

export default class FramePreview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="frame-preview">
        {this.props.number}
      </div>
    );
  }
}
