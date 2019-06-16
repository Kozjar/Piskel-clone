import React, { Component, Fragment } from 'react';

export default class FramePreview extends Component {
  constructor(props) {
    super(props);
    this.state = { onDrag: false, elemPos: { y: 0 } };
    this.onDrag = false;
    this.shift = { y: 0 };
    this.elemId = `preview-frame-${this.props.number}`;
    this.draggedElem = undefined;
    this.setActiveFrame = this.setActiveFrame.bind(this);
    this.deleteFrame = this.deleteFrame.bind(this);
    this.startDrag = this.startDrag.bind(this);
    this.moveDrag = this.moveDrag.bind(this);
    this.endDrag = this.endDrag.bind(this);
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
    if (e.target.classList.contains('frames-bar__frame-preview')) {
      e.persist();
      this.draggedElem = e.target;
      const box = this.draggedElem.getBoundingClientRect();
      this.shift.x = e.pageX - box.left;
      this.shift.y = e.pageY - box.top + 20;
      this.onDrag = true;
      this.draggedElem.style.position = 'absolute';
      this.draggedElem.style.zIndex = '100';
      this.draggedElem.style.top = `${e.pageY - this.shift.y}px`;
      this.props.setProxyFrame(this.props.number - 1);
    }
  }

  moveDrag(e) {
    if (this.onDrag) {
      e.persist();
      this.draggedElem = e.target;
      this.draggedElem.style.top = `${e.pageY - this.shift.y}px`;
      this.draggedElem.style.zIndex = '-100';
      const elem = document.elementFromPoint(e.clientX, e.clientY);
      let frameNum = elem.getAttribute('frame-preview-number');
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
      this.props.setProxyFrame(undefined);
      document.getElementById(this.elemId).style.top = '';
      const newPos = (this.props.number > this.props.proxyFrame)
        ? this.props.proxyFrame + 1 : this.props.proxyFrame;
      this.props.changeFramePos(this.props.number, newPos);
    }
  }

  render() {
    const prevStyle = {
      backgroundColor: 'white',
      backgroundImage: (this.props.img !== undefined) ? `url(${this.props.img})` : '',
      backgroundSize: 'contain',
    };
    return (
      <Fragment>
        {(this.props.proxyFrame === -1 && this.props.number === 0) && <div className="proxy-frame"></div>}
        <div style={prevStyle}
              className={`frames-bar__frame-preview ${(this.props.isActive) ? 'active-frame' : ''}`}
              frame-preview-number={this.props.number}
              onMouseDown={this.startDrag}
              onMouseMove={this.moveDrag}
              onMouseUp={this.endDrag}
              id={this.elemId}>
            <div className="frames-bar__frame-preview-num">{this.props.number}</div>
            <button className="frames-bar__frame-preview-delete-btn" onClick={this.deleteFrame}></button>
        </div>
        {(this.props.proxyFrame === this.props.number) && <div className="proxy-frame"></div>}
      </Fragment>
    );
  }
}
