// Initialize game variables let score = 0; let ballX = 50; let ballY = 50; let ballRadius = 20; let ballSpeedX = 5; let ballSpeedY = 5; let flippers = {
  left: { x: 100, y: 500, width: 100, height: 50 },
  right: { x: 600, y: 500, width: 100, height: 50 }
}; let obstacles = [
  { x: 300, y: 200, width: 100, height: 100 },
  { x: 500, y: 300, width: 50, height: 150 },
  { x: 150, y: 400, width: 150, height: 50 }
];
// Get canvas element and 2D context const canvas = document.getElementById('game-canvas'); const ctx = canvas.getContext('2d');
// Draw game elements function drawGame() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();

  // Draw the flippers
  ctx.fillStyle = 'blue';
  ctx.fillRect(flippers.left.x, flippers.left.y, flippers.left.width, flippers.left.height);
  ctx.fillRect(flippers.right.x, flippers.right.y, flippers.right.width, flippers.right.height);

  // Draw the obstacles
  ctx.fillStyle = 'gray';
  obstacles.forEach(obstacle => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });

  // Draw the score
  ctx.font = '24px Roboto Slab';
  ctx.fillStyle = 'white';
  ctx.fillText(`Score: ${score}`, 20, 50);
}
// Update game state function updateGame() {
  // Move the ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Check for collisions with walls
  if (ballX - ballRadius < 0 || ballX + ballRadius > canvas.width) {
    ballSpeedX *= -1;
  }
  if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
    ballSpeedY *= -1;
  }

  // Check for collisions with flippers
  if (
    (ballY + ballRadius >= flippers.left.y && ballY - ballRadius <= flippers.left.y + flippers.left.height) &&
    (ballX - ballRadius <= flippers.left.x + flippers.left.width && ballX + ballRadius >= flippers.left.x)
  ) {
    ballSpeedX = Math.abs(ballSpeedX);
    score += 10;
  }
  if (
    (ballY + ballRadius >= flippers.right.y && ballY - ballRadius <= flippers.right.y + flippers.right.height) &&
    (ballX + ballRadius >= flippers.right.x && ballX - ballRadius <= flippers.right.x + flippers.right.width)
  ) {
    ballSpeedX = -Math.abs(ballSpeedX);
    score += 10;
  }

  // Check for collisions with obstacles
  obstacles.forEach(obstacle => {
    if (
      ballX + ballRadius >= obstacle.x &&
      ballX - ballRadius <= obstacle.x + obstacle.width &&
      ballY + ballRadius >= obstacle.y &&
      ballY - ballRadius <= obstacle.y + obstacle.height
    ) {
      if (Math.abs(ballX - (obstacle.x + obstacle.width / 2)) < Math.abs(ballY - (obstacle.y + obstacle.height / 2))) {
        ballSpeedX *= -1;
      } else {
        ballSpeedY *= -1;
      }
      score += 5;
    }
  });
}
// Game loop function gameLoop() {
  updateGame();
  drawGame();
  requestAnimationFrame(gameLoop);
}
// Start the game gameLoop();
// Handle keyboard controls document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    flippers.left.x -= 20;
  } else if (event.key === 'ArrowRight') {
    flippers.right.x += 20;
  }
});
document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowLeft') {
    flippers.left.x += 20;
  } else if (event.key === 'ArrowRight') {
    flippers.right.x -= 20;
  }
});
// Save game data to IndexedDB const request = window.indexedDB.open('bouncy-desk-pinball', 1);
request.onupgradeneeded = (event) => {
  const db = event.target.result;
  db.createObjectStore('gameData', { keyPath: 'id' });
};
request.onsuccess = (event) => {
  const db = event.target.result;
  const transaction = db.transaction(['gameData'], 'readwrite');
  const store = transaction.objectStore('gameData');
  store.put({ id: 1, score: score });
};