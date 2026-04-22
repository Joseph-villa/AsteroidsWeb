import { rand, makeVerts, dist } from '../models/MathUtils.js';
import { ship, bullets } from '../models/Ship.js';
import { canvas, gameState } from '../controllers/GameController.js';

export let asteroids = [];

export function spawnAsteroids(n, x, y, size) {
  for (let i = 0; i < n; i++) {
    let ax = x !== undefined ? x + rand(-30, 30) : rand(0, 600);
    let ay = y !== undefined ? y + rand(-30, 30) : rand(0, 400);

    if (x === undefined) {
      while (dist(ax, ay, 300, 200) < 120) {
        ax = rand(0, 600);
        ay = rand(0, 400);
      }
    }

    let s = size || 3;
    let speed = (0.6 + Math.random() * 0.8) * (4 - s) * 0.5 + 0.5;
    let angle = Math.random() * Math.PI * 2;

    asteroids.push({
      x: ax,
      y: ay,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: s * 14,
      size: s,
      rot: 0,
      rotSpeed: (Math.random() - 0.5) * 0.05,
      verts: makeVerts(s),
    });
  }
}

export function resetAsteroids() {
  asteroids = [];
}

export function spawnNewAsteroids() {
  setInterval(() => {
    if (asteroids.length <= 12) {
      spawnAsteroids(1);
      console.log('Asteroide nuevo generado');
    }
  }, 8500);
}


export function checkAsteroidDestruction() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    for (let j = asteroids.length - 1; j >= 0; j--) {
      let b = bullets[i];
      let a = asteroids[j];
      if (dist(b.x, b.y, a.x, a.y) < 1 + a.r * 0.75) {
        bullets.splice(i, 1);
        asteroids.splice(j, 1);
        if (a.size > 1.5) spawnAsteroids(2, a.x, a.y, a.size - 1.5);
        break;
      }
    }
  }
}