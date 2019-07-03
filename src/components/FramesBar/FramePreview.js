// eslint-disable-next-line no-unused-vars
import React, { Component, Fragment } from 'react';

export default class FramePreview extends Component {
  constructor(props) {
    super(props);
    this.state = { onDrag: false, elemPos: { y: 0 } };
    this.onDrag = false;
    this.shift = { y: 0, x: 0 };
    this.elemId = `preview-frame-${this.props.number}`;
    this.draggedElem = undefined;

    this.setActiveFrame = this.setActiveFrame.bind(this);
    this.deleteFrame = this.deleteFrame.bind(this);
    this.startDrag = this.startDrag.bind(this);
    this.moveDrag = this.moveDrag.bind(this);
    this.endDrag = this.endDrag.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('mousemove', this.moveDrag.bind(this));
    document.body.addEventListener('mouseup', this.endDrag.bind(this));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      const canvas = document.getElementById(this.elemId).firstElementChild;
      if (this.props.img !== undefined) {
        canvas.getContext('2d').putImageData(this.props.img, 0, 0);
      } else {
        canvas.getContext('2d').clearRect(0, 0, this.props.canvasSize, this.props.canvasSize); //  clear cnavas
      }
    }
  }


  deleteFrame() {
    this.props.onDeleteFrame(this.props.number);
  }

  setActiveFrame(e) {
    if (e.target.classList.contains('frames-bar__frame-preview')) {
      this.props.onSetActiveFrame(this.props.number);
    }
  }

  startDrag(e) {
    if (!e.target.classList.contains('frames-bar__frame-preview-canvas')) return;
    e.persist();
    this.draggedElem = e.target.parentElement;
    const box = this.draggedElem.getBoundingClientRect();
    this.shift.x = e.pageX - box.left;
    this.shift.y = e.pageY - box.top + 20;
    this.onDrag = true;
    this.draggedElem.style.position = 'absolute';
    this.draggedElem.style.zIndex = '100';
    this.draggedElem.style.top = `${e.pageY - this.shift.y}px`;
    this.draggedElem.style.left = `${e.pageX - this.shift.x}px`;
    this.props.setProxyFrame(this.props.number - 1);
  }

  moveDrag(e) {
    if (this.onDrag) {
      let frameNum;
      this.draggedElem = document.getElementById(this.elemId);
      this.draggedElem.style.top = `${e.pageY - this.shift.y}px`;
      this.draggedElem.style.zIndex = '-100';
      const elem = document.elementFromPoint(180, e.clientY);
      if (elem.classList.contains('frames-bar__frame-preview')) {
        frameNum = elem.getAttribute('frame-preview-number');
      } else {
        frameNum = elem.parentElement.getAttribute('frame-preview-number');
      }
      if (frameNum !== null) {
        frameNum = Number(frameNum);
        if (frameNum === this.props.proxyFrame) this.props.setProxyFrame(frameNum - 1);
        else this.props.setProxyFrame(frameNum);
      }
      this.draggedElem.style.zIndex = '100';
    }
  }

  endDrag() {
    if (this.onDrag) {
      this.draggedElem.style.zIndex = '';
      this.onDrag = false;
      document.getElementById(this.elemId).style.position = '';
      document.getElementById(this.elemId).style.top = '';
      document.getElementById(this.elemId).style.left = '';
      const newPos = (this.props.number > this.props.proxyFrame)
        ? this.props.proxyFrame + 1 : this.props.proxyFrame;
      this.props.setProxyFrame(undefined);
      this.props.changeFramePos(this.props.number, newPos);
    }
  }

  render() {
    const canvasScale = {
      transform: `scale(${110 / this.props.canvasSize})`,
    };
    return (
      <Fragment>
        {(this.props.proxyFrame === -1 && this.props.number === 0) && <div className="proxy-frame"></div>}
        <div className={`frames-bar__frame-preview ${(this.props.isActive) ? 'active-frame' : ''}`}
          onMouseDown={this.startDrag}
          frame-preview-number={this.props.number}
          id={this.elemId}>
          <canvas style={canvasScale} className='frames-bar__frame-preview-canvas' width="32" height="32"></canvas>
          <div className="frames-bar__frame-preview-num">{this.props.number}</div>
          <button className="frames-bar__frame-preview-btn delete-btn" onClick={this.deleteFrame}></button>
          <button className="frames-bar__frame-preview-btn dublicate-btn" onClick={this.props.dublicateFrame}></button>
        </div>
        {(this.props.proxyFrame === this.props.number) && <div className="proxy-frame"></div>}
      </Fragment>

    );
  }
}
