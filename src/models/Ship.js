import { glitchSound, gameOverSound, ambientSound } from "../utils/SoundManager.js";
import { dist } from "./MathUtils.js";
import { asteroids } from "../models/Asteroid.js";
import { canvas, gameState } from "../controllers/GameController.js";

export const ship = {
  x: 300,
  y: 200,
  angle: 0,
  sped: 2,
};

export const SHIP_RADIUS = 15;

export const INVINCIBLE_FRAMES = 120;

export const bullets = [];

export const shootState = {
  cooldown: 0,
};

export function shipHit() {
  gameState.lives--;
  glitchSound.play();
  if (gameState.lives <= 0) {
    gameState.gameOver = true;
    gameOverSound.play();
    ambientSound.pause();
    return;
  }
  ship.x = canvas.width / 2;
  ship.y = canvas.height / 2;
  ship.angle = 0;
  gameState.invincible = true;
  gameState.invincibleTimer = INVINCIBLE_FRAMES;
}

export function checkCollisions() {
  if (gameState.invincible) return;
  for (let a of asteroids) {
    if (dist(ship.x, ship.y, a.x, a.y) < SHIP_RADIUS + a.r * 0.75) {
      shipHit();
      break;
    }
  }
}