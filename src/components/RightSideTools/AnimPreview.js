/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';

export default class AnimPreview extends Component {

  constructor(props) {
    super(props);
    this.frames = undefined;
    this.state = {
      counter: 0,
      FPS: 12,
    };
    this.interval = undefined;

    this.changeFPSCounter = this.changeFPSCounter.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
  }

  startAnimation(delay) {
    this.interval = setInterval(() => {
      this.frames = document.querySelectorAll('.frames-bar__frame-preview-canvas');
      const images = document.getElementById('animation-preview');
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
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.FPS !== prevState.FPS) {
    
        clearInterval(this.interval);
        this.startAnimation(1000 / this.state.FPS);
      
    }
  }

  changeFPSCounter() {
    const range = document.querySelector('.frame-rate');
    this.setState({
      FPS: range.value,
    });
  }

  render() {
    return (
      <div>
        <div className='animation-preview'><img id='animation-preview' src="" alt="" /></div>
        <div className='fps-slider'>
          <div className='fps-counter'>{this.state.FPS} FPS</div>
          <input className='frame-rate' type="range" min="1" max="24" step="1" defaultValue="12" onChange={this.changeFPSCounter} />
        </div>
      </div>
    );
  }
}
