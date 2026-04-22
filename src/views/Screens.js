import { ctx, canvas } from '../controllers/GameController.js';

const space = new Image();
space.src = 'assets/imagenes/Space.png';

const bg = new Image();
bg.src = 'assets/imagenes/Stars.png';

export function drawStartScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(space, 0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00ffcc';
  ctx.font = 'bold 36px Times New Roman';
  ctx.textAlign = 'center';
  ctx.fillText('ASTEROIDS', canvas.width / 2, canvas.height / 2 - 40);
  ctx.font = '20px Times New Roman';
  ctx.fillText('Presiona cualquier tecla para comenzar', canvas.width / 2, canvas.height / 2 + 20);
  ctx.textAlign = 'left';
}

export function waitForSpaceLoad(callback) {
  space.onload = callback;
}

export function drawGameOver() {
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

export function drawLives(lives) {
  ctx.fillStyle = 'red';
  ctx.font = '18px Times New Roman';
  ctx.fillText('♥ '.repeat(lives), 10, 25);
}
