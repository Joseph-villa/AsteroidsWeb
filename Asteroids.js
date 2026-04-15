const canvas = document.getElementById('Asteroids');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;

const bg = new Image();
bg.src = 'Stars.png';

const shipImg = new Image();
shipImg.src = 'Ship.png';

const shotImg = new Image();
shotImg.src = 'Shot.png';

let asteroids;
let lives = 3;
let gameOver = false;
let invincible = false;
let invincibleTimer = 0;
const INVINCIBLE_FRAMES = 120;
const SHIP_RADIUS = 15;

function init() {
  asteroids = [];
  spawnAsteroids(7);
  spawnNewAsteroids();
}
init();


const ship = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  angle: 0,
  sped: 2,
};

const moon = [];
for (let i = 1; i <= 60; i++) {
  const img = new Image();
  img.src = 'Moon/' + i + '.png';
  moon.push(img);
}
let moonFrame = 0;
let moonTimer = 0;

const bullets = [];
let cooldown = 0;

const keys = {};
document.addEventListener('keydown', (e) => { keys[e.code] = true;
    if (e.code === 'KeyR' && gameOver) {
    lives = 3;
    gameOver = false;
    ship.x = canvas.width / 2;
    ship.y = canvas.height / 2;
    ship.angle = 0;
    invincible = false;
    invincibleTimer = 0;
    init();
    loop();
    }
});

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
  if (invincible && Math.floor(invincibleTimer / 8) % 2 === 0) return;
  ctx.save();
  ctx.translate(ship.x, ship.y);
  ctx.rotate(ship.angle + Math.PI / 2);
  ctx.drawImage(shipImg, -40, -40, 80, 80);
  ctx.restore();
  wrap(ship);
}

function drawBullets() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].x += bullets[i].vx;
    bullets[i].y += bullets[i].vy;
    bullets[i].life--;
    ctx.save();
    ctx.translate(bullets[i].x, bullets[i].y);
    ctx.rotate(bullets[i].angle + Math.PI / 2);
    ctx.drawImage(shotImg, -60, -60, 120, 120);
    ctx.restore();
    if (bullets[i].life <= 0) bullets.splice(i, 1);
  }
}

function checkCollisions() {
  if (invincible) return;
  for (let a of asteroids) {
    if (dist(ship.x, ship.y, a.x, a.y) < SHIP_RADIUS + a.r * 0.75) {
      shipHit();
      break;
    }
  }
}

function shipHit() {
  lives--;
  if (lives <= 0) { gameOver = true; return; }
  ship.x = canvas.width / 2;
  ship.y = canvas.height / 2;
  ship.angle = 0;
  invincible = true;
  invincibleTimer = INVINCIBLE_FRAMES;
}

function checkAsteroidDestruction() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    for (let j = asteroids.length - 1; j >= 0; j--) {
      let b = bullets[i];
      let a = asteroids[j];
      if (dist(b.x, b.y, a.x, a.y) < 1 + a.r * 0.75) {
        bullets.splice(i, 1);
        asteroids.splice(j, 1);
        break;
      }
    }
  }
}

function drawLives() {
  ctx.fillStyle = 'red';
  ctx.font = '18px Times New Roman';
  ctx.fillText('♥ '.repeat(lives), 10, 25);
}

function drawGameOver() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'yellow';
  ctx.font = 'bold 48px Times New Roman';
  ctx.textAlign = 'center';
  ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
  ctx.font = '20px Times New Roman';
  ctx.fillText('Presioná R para reiniciar', canvas.width / 2, canvas.height / 2 + 40);
  ctx.textAlign = 'left';
}

function spawnNewAsteroids() {
  const intervaloId = setInterval(() => {
    spawnAsteroids(1);
    console.log('Asteroide nuevo generado');
  }, 7500);
  return intervaloId;
}

function loop() {
  if (gameOver) {
  drawGameOver();
  return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  moonTimer++;
  if(moonTimer >= 8) {
    moonTimer = 0;
    moonFrame = (moonFrame + 1) % 60;
  }
  ctx.drawImage(moon[moonFrame], 450, 30, 120, 120);
  
  if (keys['KeyJ'] && cooldown <= 0) {
  bullets.push({
    x:     ship.x + Math.cos(ship.angle) * 30,
    y:     ship.y + Math.sin(ship.angle) * 30,
    vx:    Math.cos(ship.angle) * 8,
    vy:    Math.sin(ship.angle) * 8,
    angle: ship.angle,
    life:  60
    });
    cooldown = 20;
  }
  if (cooldown > 0) cooldown--;

  moveShip();
  drawBullets();
  drawShip();
  asteroids.forEach(drawAsteroid);
  asteroids.forEach(a => { a.x += a.vx; a.y += a.vy; a.rot += a.rotSpeed; wrap(a); });

  if (invincible) {
  invincibleTimer--;
  if (invincibleTimer <= 0) invincible = false;
  }
  
  checkCollisions();
  checkAsteroidDestruction();
  drawLives(); 
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
  ctx.fillStyle = '#308921';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  a.verts.forEach((v,i) => {
    if (i===0) ctx.moveTo(v[0]*a.r, v[1]*a.r);
    else ctx.lineTo(v[0]*a.r, v[1]*a.r);
  });
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function rand(a,b) { return a + Math.random()*(b-a); }
function dist(x1,y1,x2,y2) { return Math.sqrt((x2-x1)**2+(y2-y1)**2); }
function wrap(obj) {
  if (obj.x < 0) obj.x += canvas.width; if (obj.x > canvas.width) obj.x -= canvas.width;
  if (obj.y < 0) obj.y += canvas.height; if (obj.y > canvas.height) obj.y -= canvas.height;
}

function spawnAsteroids(n, x, y, size) {
  for (let i = 0; i < n; i++) {
    let ax = x !== undefined ? x + ship.x + rand(-30,30) : rand(0,canvas.width);
    let ay = y !== undefined ? y + ship.y + rand(-30,30) : rand(0,canvas.height);
    if (x === undefined) {
      while (dist(ax, ay, canvas.width/2, canvas.height/2) < 120) { ax = rand(0,canvas.width); ay = rand(0,canvas.height); }
    }
    let s = size || 3;
    let speed = (0.6 + Math.random() * 0.8) * (4 - s) * 0.5 + 0.5;
    let angle = Math.random() * Math.PI * 2;
    asteroids.push({ x: ax, y: ay, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed, r: s*14, size: s, rot: 0, rotSpeed: (Math.random()-0.5)*0.05, verts: makeVerts(s) });
  }
}