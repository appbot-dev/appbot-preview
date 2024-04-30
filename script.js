// 获取游戏元素
const ball = document.getElementById('ball');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const gameContainer = document.getElementById('pinball-game');

// 游戏参数
let ballX = 0;
let ballY = 0;
let ballVelocityX = 2;
let ballVelocityY = 2;
let gameStarted = false;

// 初始化游戏
function initGame() {
  ballX = gameContainer.offsetWidth / 2 - ball.offsetWidth / 2;
  ballY = gameContainer.offsetHeight / 2 - ball.offsetHeight / 2;
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;
}

// 更新球的位置
function updateBallPosition() {
  ballX += ballVelocityX;
  ballY += ballVelocityY;

  // 检查边界碰撞
  if (ballX <= 0 || ballX >= gameContainer.offsetWidth - ball.offsetWidth) {
    ballVelocityX *= -1;
  }
  if (ballY <= 0 || ballY >= gameContainer.offsetHeight - ball.offsetHeight) {
    ballVelocityY *= -1;
  }

  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;
}

// 游戏循环
function gameLoop() {
  if (gameStarted) {
    updateBallPosition();
    requestAnimationFrame(gameLoop);
  }
}

// 开始游戏
startBtn.addEventListener('click', () => {
  gameStarted = true;
  gameLoop();
});

// 重置游戏
resetBtn.addEventListener('click', () => {
  gameStarted = false;
  initGame();
});

// 初始化游戏
initGame();
