function RGBtoHSV(red, green, blue) {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const v = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const s = (v === 0) ? 0 : (v - min) / v;
  const cR = (v - r) / (v - min);
  const cG = (v - g) / (v - min);
  const cB = (v - b) / (v - min);
  let h;

  if (s === 0) return { h: 0, s: 0, v: Math.round(v * 100) };

  if (r === v) h = cB - cG;
  if (g === v) h = 2 + cR - cB;
  if (b === v) h = 4 + cG - cR;
  h *= 60;
  if (h < 0) h += 360;

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

function HSVtoRGB(h, s, v) {
  const hi = Math.floor(h / 60);
  let min = (100 - s) * v / 100;
  const a = (v - min) * (h % 60) / 60;
  const inc = Math.round((min + a) * 255 / 100);
  const dec = Math.round((v - a) * 255 / 100);
  const val = Math.round(v * 255 / 100);
  min = Math.round(min * 255 / 100);

  switch (hi) {
    case 0: return { r: val, g: inc, b: min };
    case 1: return { r: dec, g: val, b: min };
    case 2: return { r: min, g: val, b: inc };
    case 3: return { r: min, g: dec, b: val };
    case 4: return { r: inc, g: min, b: val };
    case 5: return { r: val, g: min, b: dec };
    default:
      console.log('SOMTHING GOES WRONG');
      break;
  }
}

export default function highlightPixel(x, y) {
  const canvas = document.getElementById('main-canvas');
  const ctxSorce = canvas.getContext('2d');
  const ctxDraw = document.getElementById('drawing-canvas').getContext('2d');

  ctxDraw.clearRect(0, 0, canvas.width, canvas.height); //  clear cnavas
  const pixel = ctxSorce.getImageData(x, y, 1, 1);
  const pixelHsv = RGBtoHSV(pixel.data[0], pixel.data[1], pixel.data[2]);
  let newRgb = HSVtoRGB(pixelHsv.h, pixelHsv.s, pixelHsv.v);
  pixelHsv.v = (pixelHsv.v >= 50) ? pixelHsv.v - 15 : pixelHsv.v + 15;
  newRgb = HSVtoRGB(pixelHsv.h, pixelHsv.s, pixelHsv.v);
  const imgData = ctxDraw.createImageData(1, 1);
  imgData.data[0] = newRgb.r;
  imgData.data[1] = newRgb.g;
  imgData.data[2] = newRgb.b;
  imgData.data[3] = 255;
  ctxDraw.putImageData(imgData, x, y, 0, 0, 1, 1);
  return {
    x,
    y,
    color: pixel.data,
  };
}
