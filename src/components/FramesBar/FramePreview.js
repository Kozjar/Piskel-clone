import React, { Component, Fragment } from 'react';

export default class FramePreview extends Component {
  constructor(props) {
    super(props);
    this.state = { onDrag: false, elemPos: { y: 0 } };
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
      this.setState({ elemPos: { y: e.pageY - this.shift.y }, onDrag: true });
      this.props.setProxyFrame(this.props.number);
    }
  }

  moveDrag(e) {
    if (this.state.onDrag) {
      e.persist();
      this.draggedElem = e.target;
      this.setState({ elemPos: { y: e.pageY - this.shift.y } }, () => {
        document.getElementById(this.elemId).hidden = true;
      });
      document.getElementById(this.elemId).hidden = true;
      const elem = document.elementFromPoint(e.clientX, e.clientY);
      if (elem.classList.contains('frames-bar__frame-preview') && !this.props.proxyFrame) {
        console.log(elem.getAttribute('frame-preview-number'));
        console.log(this.props.proxyFrame);
        this.props.setProxyFrame(elem.getAttribute('frame-preview-number'));
      }
      // this.draggedElem.hidden = false;
    }
  }

  endDrag() {
    this.setState({ onDrag: false });
    this.props.setProxyFrame(-1);
  }

  render() {
    const prevStyle = {
      backgroundColor: 'white',
      backgroundImage: (this.props.img !== undefined) ? `url(${this.props.img})` : '',
      backgroundSize: 'contain',
      position: this.state.onDrag ? 'absolute' : '',
      zIndex: this.state.onDrag ? '100' : '',
      left: this.state.onDrag ? '5px' : '',
      top: this.state.onDrag ? `${this.state.elemPos.y}px` : '',
    };
    return (
      <Fragment>
        <div style={prevStyle}
              className={`frames-bar__frame-preview ${(this.props.isActive) ? 'active-frame' : ''}`}
              onClick={this.setActiveFrame}
              frame-preview-number={this.props.number}
              onMouseDown={this.startDrag}
              onMouseMove={this.moveDrag}
              onMouseUp={this.endDrag}
              id={this.elemId}>
            <div className="frames-bar__frame-preview-num">{this.props.number}</div>
            <button className="frames-bar__frame-preview-delete-btn" onClick={this.deleteFrame}></button>
        </div>
        {this.props.proxyFrame && <div className="proxy-frame"></div>}
      </Fragment>
    );
  }
}
