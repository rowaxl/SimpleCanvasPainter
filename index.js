const canvas = document.querySelector('#draw')
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 40;

// color
ctx.strokeStyle = '#BADA55'

// line style
ctx.lineJoin = 'round'
ctx.lineCap = 'round'
ctx.lineWidth = 10
ctx.globalCompositeOperation = 'multiply'

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return;

  if (ctx.lineWidth >= 200 || ctx.lineWidth < 10) {
    direction = !direction
  }

  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }

  ctx.strokeStyle = `hsl(${hue++}, 100%, 50%)`
  if (hue > 360) {
    hue = 0;
  }

  ctx.beginPath();
  // start from
  ctx.moveTo(lastX, lastY);

  // line go to
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  // These not work properly, but why?
  // [lastX, lastY] = [e.offsetX, e.offsetY];
  lastX = e.offsetX;
  lastY = e.offsetY;
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true
  // [lastX, lastY] = [e.offsetX, e.offsetY];
  lastX = e.offsetX;
  lastY = e.offsetY;

  ctx.lineWidth = 10;
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);