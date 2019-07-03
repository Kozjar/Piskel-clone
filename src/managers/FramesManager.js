function addNewFrame(img) {
  this.setState((state, props) => ({
    frames: [...state.frames, { // add new element to frames array
      number: state.frames.length,
      id: state.frames.length,
      img,
    }], //  makes active the last frame
  }), () => { this.setActiveFrame(this.state.frames.length - 1); });
}

function setActiveFrame(num) {
  this.setState({
    activeFrame: num,
  }, () => {
    const canvas = document.getElementById('main-canvas');
    const context = canvas.getContext('2d');
    const { img } = this.state.frames[this.state.activeFrame];

    context.clearRect(0, 0, canvas.width, canvas.height); //  clear cnavas
    //  if active frame has image, draw this image on main canvas
    if (img !== undefined) {
      context.putImageData(img, 0, 0);
    }
  });
}

function deleteFrame(num) {
  if (this.state.frames.length > 1) {
    // if current active frame is under deleted frame, set active frame to right value
    if (this.state.activeFrame > num) {
      this.setState((state, props) => ({ activeFrame: state.activeFrame - 1 }));
    }
    //  if we want to delete active frame, update main camvas
    if (this.state.activeFrame === num) {
      this.setActiveFrame(this.state.activeFrame - ((this.state.activeFrame) ? 1 : 0));
    }

    let framesTmp = this.state.frames;
    framesTmp.splice(num, 1); // remove element from page
    framesTmp = framesTmp.map((frame) => { // reduce frame number by 1 from all frames under target
      if (frame.number > num) {
        return {
          number: frame.number - 1,
          id: frame.id - 1,
          img: frame.img,
        };
      }
      return frame;
    });
    this.setState({
      frames: framesTmp,
    });
  } else {
    const { frames } = this.state;
    frames[0].img = undefined;
    this.setState({ frames });
    this.setActiveFrame(0);
  }
}

function dublicateFrame(img, num) {
  const { frames } = this.state;
  frames.splice(num + 1, 0, { number: num + 1, id: num + 1, img });
  for (let i = num + 2; i < frames.length; i += 1) {
    frames[i].number += 1;
    frames[i].id += 1;
  }
  this.setState({ frames });
}

function updateFramePreview(w, h) {
  // const ctx = document.getElementById('drawing-canvas').getContext('2d').getImageData(0, 0, w, h);
  const mainCanvasCtx = document.getElementById('main-canvas').getContext('2d');
  const img = mainCanvasCtx.getImageData(0, 0, w, h);
  // canvasMain.getContext('2d').putImageData(ctx, 0, 0);
  const framesTmp = this.state.frames;
  //  set active frame image to main canvas image
  framesTmp[this.state.activeFrame].img = img;
  this.setState({
    frames: framesTmp,
  });
}

function setProxyFrame(num, fn) {
  this.setState({ proxyFrame: num });
}

function changeFramePos(from, to) {
  let { frames } = this.state;
  const frame = frames.splice(from, 1);
  frames.splice(to, 0, frame[0]);
  frames = frames.map((fr, i) => ({ number: i, id: i, img: fr.img }));
  this.setState({ frames }, () => { this.setActiveFrame(to); });
}

export {
  addNewFrame, setActiveFrame, deleteFrame, updateFramePreview, setProxyFrame, changeFramePos, dublicateFrame,
};
