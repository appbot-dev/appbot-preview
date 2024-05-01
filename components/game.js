// Game logic and event handling
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let ball, paddle, bricks;
let score = 0;
let lives = 3;
let isGameOver = false;

function initGame() {
  // Initialize game objects and start the game loop
  ball = new Ball(canvas.width / 2, canvas.height - 50, 10, "#fff");
  paddle = new Paddle(canvas.width / 2 - 50, canvas.height - 30, 100, 20, "#fff");
  bricks = createBricks();
  gameLoop();
}

function gameLoop() {
  // Update game state and render the frame
  if (!isGameOver) {
    requestAnimationFrame(gameLoop);
    ball.update();
    paddle.update();
    checkCollisions();
    renderGame();
  }
}

function renderGame() {
  // Clear the canvas and draw the game objects
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw(ctx);
  paddle.draw(ctx);
  bricks.forEach((brick) => brick.draw(ctx));

  // Display the score and lives
  ctx.font = "20px Roboto Slab";
  ctx.fillStyle = "#fff";
  ctx.fillText(`Score: ${score}`, 20, 30);
  ctx.fillText(`Lives: ${lives}`, 20, 60);

  if (isGameOver) {
    ctx.font = "40px Roboto Slab";
    ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
  }
}

function checkCollisions() {
  // Check for collisions between the ball and the paddle or bricks
  if (ball.y + ball.radius >= paddle.y && ball.x >= paddle.x && ball.x <= paddle.x + paddle.width) {
    ball.dy *= -1;
  }

  bricks.forEach((brick, index) => {
    if (
      ball.x > brick.x &&
      ball.x < brick.x + brick.width &&
      ball.y > brick.y &&
      ball.y < brick.y + brick.height
    ) {
      ball.dy *= -1;
      brick.isDestroyed = true;
      score += 10;

      // Check if all bricks are destroyed
      if (bricks.every((b) => b.is
