// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { rgbToHex, hexToRgb } from '../../managers/colorManager';
import pen from '../../Assets/icons/pencil.png';
import eyedropper from '../../Assets/icons/eyedropper.png';
import rectangle from '../../Assets/icons/rectangle.png';
import eraser from '../../Assets/icons/eraser.png';
import bucket from '../../Assets/icons/paint-bucket.png';
import circle from '../../Assets/icons/circle.png';
import line from '../../Assets/icons/diagonal-line.png';

export default class ToolsBar extends Component {
  constructor(props) {
    super(props);
    this.main = undefined;
    this.semi = undefined;
    this.changeMainColor = this.changeMainColor.bind(this);
    this.changeSemiColor = this.changeSemiColor.bind(this);
    this.swapColors = this.swapColors.bind(this);
  }

  componentDidMount() {
    this.main = document.querySelector('.main-color');
    this.semi = document.querySelector('.semi-color');
  }

  changeMainColor() {
    const color = hexToRgb(this.main.value);
    this.props.setMainColor(color.r, color.g, color.b);

  }

  changeSemiColor() {
    const color = hexToRgb(this.semi.value);
    this.props.setSemiColor(color.r, color.g, color.b);

  }

  swapColors() {
    const mainColor = hexToRgb(this.main.value);
    const semiColor = hexToRgb(this.semi.value);
    this.main.value = rgbToHex(semiColor.r, semiColor.g, semiColor.b);
    this.semi.value = rgbToHex(mainColor.r, mainColor.g, mainColor.b);
    this.props.setMainColor(semiColor.r, semiColor.g, semiColor.b);
    this.props.setSemiColor(mainColor.r, mainColor.g, mainColor.b);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div className="tools-bar">
        <div className={`tool${(this.props.activeToolId === 0) ? ' activeTool' : ''}`} onClick={() => this.props.setActiveTool(0)}>
          <img src={pen} alt="" />
        </div>
        <div className={`tool${(this.props.activeToolId === 1) ? ' activeTool' : ''}`} onClick={() => this.props.setActiveTool(1)}>
          <img src={eyedropper} alt="" />
        </div>
        <div className={`tool${(this.props.activeToolId === 2) ? ' activeTool' : ''}`} onClick={() => this.props.setActiveTool(2)}>
          <img src={line} alt="" />
        </div>
        <div className={`tool${(this.props.activeToolId === 3) ? ' activeTool' : ''}`} onClick={() => this.props.setActiveTool(3)}>
          <img src={rectangle} alt="" />
        </div>
        <div className={`tool${(this.props.activeToolId === 4) ? ' activeTool' : ''}`} onClick={() => this.props.setActiveTool(4)}>
          <img src={eraser} alt="" />
        </div>
        <div className={`tool${(this.props.activeToolId === 5) ? ' activeTool' : ''}`} onClick={() => this.props.setActiveTool(5)}>
          <img src={bucket} alt="" />
        </div>
        <div className={`tool${(this.props.activeToolId === 6) ? ' activeTool' : ''}`} onClick={() => this.props.setActiveTool(6)}>
          <img src={circle} alt="" />
        </div>
        <div className="current-colour-container">
          <input type="color" defaultValue={rgbToHex(this.props.mainColor.r, this.props.mainColor.g, this.props.mainColor.b)}
            onInput={this.changeMainColor} className="main-color current-color" />
          <div className="swap-colors-img" onClick={this.swapColors}></div>
          <input type="color" defaultValue={rgbToHex(this.props.semiColor.r, this.props.semiColor.g, this.props.semiColor.b)}
            onInput={this.changeSemiColor} className="semi-color current-color" />
        </div>
      </div>
    );
  }
}
