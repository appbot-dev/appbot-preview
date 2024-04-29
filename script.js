// IndexedDB setup and sample data const dbName = 'gomoku-game-db'; const storeName = 'games'; let db;
// Open the database const request = window.indexedDB.open(dbName, 1);
request.onupgradeneeded = (event) => {
  db = event.target.result;
  db.createObjectStore(storeName, { keyPath: 'id' });
};
request.onsuccess = (event) => {
  db = event.target.result;

  // Add sample game data
  const sampleGames = [
    { id: 1, player1: 'Alice', player2: 'Bob', winner: 'Alice' },
    { id: 2, player1: 'Charlie', player2: 'David', winner: 'David' },
    { id: 3, player1: 'Eve', player2: 'Frank', winner: 'Eve' }
  ];

  const transaction = db.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);
  sampleGames.forEach((game) => {
    store.add(game);
  });

  // Initialize the Gomoku game
  initGomokuGame();
};
// Gomoku game implementation function initGomokuGame() {
  const gameContainer = document.getElementById('game-container');

  // Create the game board
  const board = document.createElement('div');
  board.classList.add('grid', 'grid-cols-15', 'gap-1', 'mx-auto', 'max-w-[450px]');

  // Render the game board
  for (let i = 0; i < 225; i++) {
    const cell = document.createElement('div');
    cell.classList.add('w-8', 'h-8', 'bg-gray-300', 'rounded', 'cursor-pointer', 'hover:bg-gray-400');
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }

  gameContainer.appendChild(board);

  // Game state
  let currentPlayer = 'black';
  let gameOver = false;

  // Handle cell click
  function handleCellClick(event) {
    if (gameOver) return;

    const cell = event.target;
    if (cell.classList.contains('black') || cell.classList.contains('white')) return;

    // Place the piece
    cell.classList.add(currentPlayer);

    // Check for a win
    if (checkWin(cell, currentPlayer)) {
      alert(`Player ${currentPlayer} wins!`);
      gameOver = true;
    } else {
      // Switch the current player
      currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
    }
  }

  // Check for a win
  function checkWin(cell, player) {
    const row = Math.floor(cell.parentElement.children.indexOf(cell) / 15);
    const col = cell.parentElement.children.indexOf(cell) % 15;

    // Check horizontal
    let count = 0;
    for (let i = col; i >= 0; i--) {
      if (board.children[row * 15 + i].classList.contains(player)) {
        count++;
        if (count === 5) return true;
      } else break;
    }
    count = 0;
    for (let i = col + 1; i < 15; i++) {
      if (board.children[row * 15 + i].classList.contains(player)) {
        count++;
        if (count === 5) return true;
      } else break;
    }

    // Check vertical
    count = 0;
    for (let i = row; i >= 0; i--) {
      if (board.children[i * 15 + col].classList.contains(player)) {
        count++;
        if (count === 5) return true;
      } else break;
    }
    count = 0;
    for (let i = row + 1; i < 15; i++) {
      if (board.children[i * 15 + col].classList.contains(player)) {
        count++;
        if (count === 5) return true;
      } else break;
    }

    // Check diagonal (top-left to bottom-right)
    count = 0;
    let r = row, c = col;
    while (r >= 0 && c >= 0) {
      if (board.children[r * 15 + c].classList.contains(player)) {
        count++;
        if (count === 5) return true;
      } else break;
      r--;
      c--;
    }
    count = 0;
    r = row + 1, c = col + 1;
    while (r < 15 && c < 15) {
      if (board.children[r * 15 + c].classList.contains(player)) {
        count++;
        if (count === 5) return true;
      } else break;
      r++;
      c++;
    }

    // Check diagonal (top-right to bottom-left)
    count = 0;
    r = row, c = col;
    while (r >= 0 && c < 15) {
      if (board.children[r * 15 + c].classList.contains(player)) {
        count++;
        if (count === 5) return true;
      } else break;
      r--;
      c++;
    }
    count = 0;
    r = row + 1, c = col - 1;
    while (r < 15 && c >= 0) {
      if (board.children[r * 15 + c].classList.contains(player)) {
        count++;
        if (count === 5) return true;
      } else break;
      r++;
      c--;
    }

    return false;
  }
}