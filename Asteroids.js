const canvas = document.getElementById('Asteroids');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 300;

const ship = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  angle: 0,
};

const asteroid = {
  x: 150,
  y: 100,
  r: 40,
  rot: 0,
  verts: makeVerts(3)
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

function makeVerts(s) {
  let n = 8 + Math.floor(Math.random()*4), v = [];
  for (let i = 0; i < n; i++) {
    let a = (i/n)*Math.PI*2;
    let r = 0.75 + Math.random()*0.25;
    v.push([Math.cos(a)*r, Math.sin(a)*r]);
  }
  return v;
}
  function drawAsteroid(a) {
  ctx.save();
  ctx.translate(a.x, a.y);
  ctx.rotate(a.rot);
  ctx.strokeStyle = '#308921';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  a.verts.forEach((v,i) => {
    if (i===0) ctx.moveTo(v[0]*a.r, v[1]*a.r);
    else ctx.lineTo(v[0]*a.r, v[1]*a.r);
  });
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

drawAsteroid(asteroid);

