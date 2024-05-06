// Get the game board element const gameBoard = document.getElementById('game-board');
// Get the game difficulty level const difficultyLevel = localStorage.getItem('difficultyLevel') || 'easy';
// Initialize the game initializeGame(difficultyLevel);
// Function to initialize the game function initializeGame(difficulty) {
  // Clear the game board
  gameBoard.innerHTML = '';

  // Generate the game grid based on the difficulty level
  const gridSize = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20;
  const mineCount = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 25 : 40;

  // Create the game grid
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement('div');
      cell.classList.add('game-cell', 'bg-gray-300', 'hover:bg-gray-400', 'cursor-pointer');
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener('click', handleCellClick);
      gameBoard.appendChild(cell);
    }
  }

  // Place the mines randomly
  placeMines(gridSize, mineCount);
}
// Function to place mines randomly on the game grid function placeMines(gridSize, mineCount) {
  const mines = new Set();
  while (mines.size < mineCount) {
    const row = Math.floor(Math.random() * gridSize);
    const col = Math.floor(Math.random() * gridSize);
    const cellKey = `${row},${col}`;
    if (!mines.has(cellKey)) {
      mines.add(cellKey);
    }
  }
  localStorage.setItem('mines', JSON.stringify(Array.from(mines)));
}
// Function to handle cell click function handleCellClick(event) {
  const cell = event.target;

  // Check if the cell is already revealed
  if (!cell.classList.contains('bg-gray-300')) {
    return;
  }

  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);
  const cellKey = `${row},${col}`;

  // Check if the cell is a mine
  const mines = JSON.parse(localStorage.getItem('mines'));
  if (mines.includes(cellKey)) {
    // Game over
    alert('Game over! You hit a mine.');
    return;
  }

  // Reveal the cell
  cell.classList.remove('bg-gray-300', 'hover:bg-gray-400');
  cell.classList.add('bg-gray-200');

  // Check if the game is won
  const allCellsRevealed = Array.from(gameBoard.children).every(cell => {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const cellKey = `${row},${col}`;
    return !mines.includes(cellKey) || !cell.classList.contains('bg-gray-300');
  });
  if (allCellsRevealed) {
    alert('Congratulations! You won the game.');
  }
}