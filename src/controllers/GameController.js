import { ship, bullets, shootState, checkCollisions } from '../models/Ship.js';
import { asteroids, spawnAsteroids, spawnNewAsteroids, checkAsteroidDestruction } from '../models/Asteroid.js';
import { dist } from '../models/MathUtils.js';
import { shootSound, glitchSound, gameOverSound, ambientSound } from '../utils/SoundManager.js';
import { drawBackground, drawMoon, drawShip, drawBullets, drawAsteroids } from '../views/DrawGame.js';
import { drawStartScreen, waitForSpaceLoad, drawGameOver, drawLives } from '../views/Screens.js';
import { keys, initInput } from './InputController.js';

export const canvas = document.getElementById('Asteroids');
export const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

export const gameState = {
  lives: 3,
  gameOver: false,
  startScreen: true,
  invincible: false,
  invincibleTimer: 0,
};

function moveShip() {
  if (keys['KeyA']) ship.angle -= 0.08;
  if (keys['KeyD']) ship.angle += 0.08;
  if (keys['KeyW']) {
    ship.x += Math.cos(ship.angle) * ship.sped;
    ship.y += Math.sin(ship.angle) * ship.sped;
  } else {
    ship.x += Math.cos(ship.angle) * ship.sped * 0.2;
    ship.y += Math.sin(ship.angle) * ship.sped * 0.2;
  }
}

export function loop() {
  if (gameState.startScreen) {
    drawStartScreen();
    return;
  }

  if (gameState.gameOver) {
    drawGameOver();
    return;
  }

  drawBackground();
  drawMoon();

  if (keys['KeyJ'] && shootState.cooldown <= 0) {
    bullets.push({
      x: ship.x + Math.cos(ship.angle) * 30,
      y: ship.y + Math.sin(ship.angle) * 30,
      vx: Math.cos(ship.angle) * 8,
      vy: Math.sin(ship.angle) * 8,
      angle: ship.angle,
      life: 60,
    });
    shootState.cooldown = 20;
    shootSound.currentTime = 0;
    shootSound.play();
  }
  if (shootState.cooldown > 0) shootState.cooldown--;

  moveShip();
  drawBullets();
  drawShip(gameState.invincible, gameState.invincibleTimer);
  drawAsteroids();

  if (gameState.invincible) {
    gameState.invincibleTimer--;
    if (gameState.invincibleTimer <= 0) gameState.invincible = false;
  }

  checkCollisions();
  checkAsteroidDestruction();
  drawLives(gameState.lives);

  requestAnimationFrame(loop);
}

initInput(loop);
spawnNewAsteroids();
waitForSpaceLoad(drawStartScreen);
