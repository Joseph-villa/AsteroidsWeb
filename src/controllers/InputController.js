import { gameState, canvas } from './GameController.js';
import { ship } from '../models/Ship.js';
import { resetAsteroids, spawnAsteroids } from '../models/Asteroid.js';
import { ambientSound, gameOverSound } from '../utils/SoundManager.js';

export const keys = {};

export function initInput(onLoop) {
  document.addEventListener('keydown', (e) => {
    keys[e.code] = true;

    if (gameState.startScreen) {
      gameState.startScreen = false;
      ambientSound.currentTime = 0;
      ambientSound.play();
      resetAsteroids();
      spawnAsteroids(7);
      onLoop();
      return;
    }

    if (e.code === 'KeyR' && gameState.gameOver) {
      gameState.lives = 3;
      gameState.gameOver = false;
      ship.x = canvas.width / 2;
      ship.y = canvas.height / 2;
      ship.angle = 0;
      gameState.invincible = false;
      gameState.invincibleTimer = 0;
      gameOverSound.pause();
      gameOverSound.currentTime = 0;
      ambientSound.currentTime = 0;
      ambientSound.play();
      resetAsteroids();
      spawnAsteroids(7);
      onLoop();
    }
  });

  document.addEventListener('keyup', (e) => {
    keys[e.code] = false;
  });
}
