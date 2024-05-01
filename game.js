// game.js full content, including the game logic implementation // This file handles the game play functionality
// Initialize the game canvas const canvas = document.getElementById('game-canvas'); const ctx = canvas.getContext('2d');
// Game variables let ballX = canvas.width / 2; let ballY = canvas.height - 30; let ballRadius = 10; let ballSpeedX = 2; let ballSpeedY = -2; let paddleWidth = 80; let paddleHeight = 10; let paddleX = (canvas.width - paddleWidth) / 2; let brickRowCount = 5; let brickColumnCount = 8; let brickWidth = 75; let brickHeight = 20; let brickPadding = 10; let brickOffsetTop = 30; let brickOffsetLeft = 30; let score = 0; let lives = 3;
// Brick array let bricks = []; for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}
// Draw the ball function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
// Draw the paddle function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
// Draw the bricks function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
// Draw the score and lives function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}
// Collision detection function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status === 1) {
        if (
          ballX > b.x &&
          ballX < b.x + brickWidth &&
          ballY > b.y &&
          ballY < b.y + brickHeight
        ) {
          ballSpeedY = -ballSpeedY;
          b.status = 0;
          score++;
          if (score === brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload();
          }
        }
      }
    }
  }
}
// Draw everything function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  
  // Ball movement
  if (ballX + ballSpeedX > canvas.width - ballRadius || ballX + ballSpeedX < ballRadius) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballY + ballSpeedY < ballRadius) {
    ballSpeedY = -ballSpeedY;
  } else if (ballY + ballSpeedY > canvas.height - ballRadius) {
    if (ballX > paddleX && ballX < paddleX + paddleWidth) {
      ballSpeedY = -ballSpeedY;
    } else {
      lives--;
      if (!lives) {
        alert("GAME OVER");
        document.location.reload();
      } else {
        ballX = canvas.width / 2;
        ballY = canvas.height - 30;
        ballSpeedX = 2;
        ballSpeedY = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
  
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  
  requestAnimationFrame(draw);
}
// Start the game document.getElementById('start-game').addEventListener('click', () => {
  draw();
});