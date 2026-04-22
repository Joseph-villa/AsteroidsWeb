import { ctx, canvas } from '../controllers/GameController.js';
import { ship, bullets } from '../models/Ship.js';
import { asteroids } from '../models/Asteroid.js';
import { wrap } from '../models/MathUtils.js';

const bg = new Image();
bg.src = 'assets/imagenes/Stars.png';

const shipImg = new Image();
shipImg.src = 'assets/imagenes/Ship.png';

const shotImg = new Image();
shotImg.src = 'assets/imagenes/Shot.png';

export const moon = [];
for (let i = 1; i <= 60; i++) {
  const img = new Image();
  img.src = 'assets/imagenes/Moon/' + i + '.png';
  moon.push(img);
}

export const moonState = { frame: 0, timer: 0 };

export function drawBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
}

export function drawMoon() {
  moonState.timer++;
  if (moonState.timer >= 8) {
    moonState.timer = 0;
    moonState.frame = (moonState.frame + 1) % 60;
  }
  ctx.drawImage(moon[moonState.frame], 450, 30, 120, 120);
}

export function drawShip(invincible, invincibleTimer) {
  if (invincible && Math.floor(invincibleTimer / 8) % 2 === 0) return;
  ctx.save();
  ctx.translate(ship.x, ship.y);
  ctx.rotate(ship.angle + Math.PI / 2);
  ctx.drawImage(shipImg, -40, -40, 80, 80);
  ctx.restore();
  wrap(ship, canvas.width, canvas.height);
}

export function drawBullets() {
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

export function drawAsteroids() {
  asteroids.forEach((a) => {
    ctx.save();
    ctx.translate(a.x, a.y);
    ctx.rotate(a.rot);
    ctx.fillStyle = '#6d6b6bf8';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    a.verts.forEach((v, i) => {
      if (i === 0) ctx.moveTo(v[0] * a.r, v[1] * a.r);
      else ctx.lineTo(v[0] * a.r, v[1] * a.r);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    a.x += a.vx;
    a.y += a.vy;
    a.rot += a.rotSpeed;
    wrap(a, canvas.width, canvas.height);
  });
}
