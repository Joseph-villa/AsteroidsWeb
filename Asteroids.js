const canvas = document.getElementById('Asteroids');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;

const bg = new Image();
bg.src = 'Stars.png';

const shipImg = new Image();
shipImg.src = 'Ship.png';

const ship = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  angle: 0,
  sped: 2,
};

const asteroid = {
  x: 100,
  y: 100,
  r: 40,
  rot: 0,
  verts: makeVerts(3)
};

const moon = [];
for (let i = 1; i <= 60; i++) {
  const img = new Image();
  img.src = 'Moon/' + i + '.png';
  moon.push(img);
}
let moonFrame = 0;
let moonTimer = 0;

const keys = {};
document.addEventListener('keydown', (e) => { keys[e.code] = true; });
document.addEventListener('keyup',   (e) => { keys[e.code] = false; });

function moveShip() {
  if (keys['KeyA'])  ship.angle -= 0.05;
  if (keys['KeyD']) ship.angle += 0.05;
  if (keys['KeyW']) {
    ship.x += Math.cos(ship.angle) * ship.sped;
    ship.y += Math.sin(ship.angle) * ship.sped;
  }
}

function drawShip() {
  ctx.save();
  ctx.translate(ship.x, ship.y);
  ctx.rotate(ship.angle + Math.PI / 2);
  ctx.drawImage(shipImg, -40, -40, 80, 80);
  ctx.restore();
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  moonTimer++;
  if(moonTimer >= 8) {
    moonTimer = 0;
    moonFrame = (moonFrame + 1) % 60;
  }
  ctx.drawImage(moon[moonFrame], 450, 30, 120, 120);
  moveShip();
  drawShip();
  drawAsteroid(asteroid);
  requestAnimationFrame(loop);
}
loop();

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



