// Define the game board dimensions
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

// Define the tetromino shapes
const TETROMINOS = [
  { shape: [[0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0]], color: 'cyan' }, // I-shaped
  { shape: [[0, 0, 0], [1, 1, 1], [0, 0, 1], [0, 0, 0]], color: 'blue' }, // J-shaped
  { shape: [[0, 0, 0], [1, 1, 1], [1, 0, 0], [0, 0, 0]], color: 'orange' }, // L-shaped
  { shape: [[0, 0, 0], [0, 1, 1], [0, 1, 1], [0, 0, 0]], color: 'yellow' }, // O-shaped
  { shape: [[0, 0, 0], [0, 1, 1], [1, 1, 0], [0, 0, 0]], color: 'green' }, // S-shaped
  { shape: [[0, 0, 0], [1, 1, 0], [0, 1, 1], [0, 0, 0]], color: 'purple' }, // Z-shaped
  { shape: [[0, 0, 0], [1, 1, 1], [0, 1, 0], [0, 0, 0]], color: 'red' } // T-shaped
];

// Define the game state
let gameBoard = Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0));
let currentTetromino = null;
let currentPosition = { x: 0, y: 0 };
let gameInterval = null;
let gameSpeed = 1000; // milliseconds

// Function to randomly select a tetromino
function getRandomTetromino() {
  const randomIndex = Math.floor(Math.random() * TETROMINOS.length);
  return TETROMINOS[randomIndex];
}

// Function to draw the current tetromino on the game board
function drawTetromino() {
  currentTetromino.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        gameBoard[currentPosition.y + y][currentPosition.x + x] = currentTetromino.color;
      }
    });
  });
}

// Function to clear the current tetromino from the game board
function clearTetromino() {
  currentTetromino.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        gameBoard[currentPosition.y + y][currentPosition.x + x] = 0;
      }
    });
  });
}

// Function to move the current tetromino
function moveTetromino(dx, dy) {
  clearTetromino();
  currentPosition.x += dx;
  currentPosition.y += dy;
  drawTetromino();
}

// Function to rotate the current tetromino
function rotateTetromino() {
  clearTetromino();
  const rotatedShape = currentTetromino.shape[0].map((_, index) =>
    currentTetromino.shape.map((row) => row[index]).reverse()
  );
  currentTetromino.shape = rotatedShape;
  drawTetromino();
}

// Function to check if the current tetromino can move in a given direction
function canMoveTetromino(dx, dy) {
  const newPosition = {
    x: currentPosition.x + dx,
    y: currentPosition.y + dy
  };

  if (
    newPosition.x < 0 ||
    newPosition.x + currentTetromino.shape[0].length > BOARD_WIDTH ||
    newPosition.y + currentTetromino.shape.length > BOARD_HEIGHT
  ) {
    return false;
  }

  for (let y = 0; y < currentTetromino.shape.length; y++) {
    for (let x = 0; x < currentTetromino.shape[y].length; x++) {
      if (
        currentTetromino.shape[y][x] &&
        gameBoard[newPosition.y + y][newPosition.x + x]
      ) {
        return false;
      }
    }
  }

  return true;
}

// Function to handle user input
function handleUserInput(event) {
  switch (event.key) {
    case 'ArrowLeft':
      if (canMoveTetromino(-1, 0)) {
        moveTetromino(-1, 0);
      }
      break;
    case 'ArrowRight':
      if (canMoveTetromino(1, 0)) {
        moveTetromino(1, 0);
      }
      break;
    case 'ArrowDown':
      if (canMoveTetromino(0, 1)) {
        moveTetromino(0, 1);
      } else {
        lockTetromino();
      }
      break;
    case 'ArrowUp':
      rotateTetromino();
      break;
  }
}

// Function to lock the current tetromino in place
function lockTetromino() {
  currentTetromino.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        gameBoard[currentPosition.y + y][currentPosition.x + x] = currentTetromino.color;
      }
    });
  });

  // Check for completed lines and remove them
  checkAndRemoveCompletedLines();

  // Generate a new tetromino
  currentTetromino = getRandomTetromino();
  currentPosition = { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 };

  // Check if the game is over
  if (!canMoveTetromino(0, 0)) {
    clearInterval(gameInterval);
    alert('Game Over!');
  }
}

// Function to check and remove completed lines
function checkAndRemoveCompletedLines() {
  let linesRemoved = 0;

  for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
    if (gameBoard[y].every((cell) => cell !== 0)) {
      gameBoard.splice(y, 1);
      gameBoard.unshift(Array(BOARD_WIDTH).fill(0));
      linesRemoved++;
    }
  }

  // Increase the game speed based on the number of lines removed
  gameSpeed = Math.max(100, gameSpeed - linesRemoved * 50);
  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, gameSpeed);
}

// Game loop function
function gameLoop() {
  if (canMoveTetromino(0, 1)) {
    moveTetromino(0, 1);
  } else {
    lockTetromino();
  }
}

// Start the game
function startGame() {
  currentTetromino = getRandomTetromino();
  currentPosition = { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 };
  gameInterval = setInterval(gameLoop, gameSpeed);
  document.addEventListener('keydown', handleUserInput);
}

// Event listener for the "Start Game" button
const startButton = document.querySelector('#startButton');
startButton.addEventListener('click', startGame);
