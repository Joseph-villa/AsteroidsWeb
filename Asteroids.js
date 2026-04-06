const canvas = document.getElementById('Asteroids');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 300;

const ship = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  angle: 0,
};

function drawShip() {
  ctx.save();
  ctx.translate(ship.x, ship.y);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(16, 0);
  ctx.lineTo(-10, 10);
  ctx.lineTo(-6, 0);
  ctx.lineTo(-10, -10);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

  drawShip();

