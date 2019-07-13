/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';

export default class AnimPreview extends Component {

  constructor(props) {
    super(props);
    this.frames = undefined;
    this.animation = this.animation.bind(this);
    this.state = {
      counter: 0,
      FPS: 1,
    };
    this.interval = null;
  }

  componentDidMount() {
    this.interval = (delay) => {
      setInterval(() => {
        this.frames = document.querySelectorAll('.frames-bar__frame-preview-canvas');
        const images = document.getElementById('animation-preview');
        // const ctx = this.frames[0].getContext('2d');
        // const img = ctx.getImageData(0, 0, 32, 32);
        images.src = this.frames[this.state.counter].toDataURL();
        this.setState({
          counter: this.state.counter += 1,
        });

        if (this.state.counter === this.frames.length) {
          this.setState({
            counter: this.state.counter = 0,
          });
        }
      }, delay);
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.FPS !== prevState.FPS) {
      console.log('update');
      this.interval(1000 / this.state.FPS);
    }
  }

  animation() {
    const range = document.querySelector('.frame-rate');
    this.setState({
      FPS: range.value,
    });
    global.console.log(this.state.FPS);
  }

  render() {
    return (
      <div>
        <div className='animation-preview'><img id='animation-preview' src="" alt="" /></div>
        <div className='fps-slider'>
          <div className='fps-counter'>{this.state.FPS} FPS</div>
          <input className='frame-rate' type="range" min="0" max="24" step="1" defaultValue="0" onChange={this.animation} />
        </div>
      </div>
    );
  }
}
