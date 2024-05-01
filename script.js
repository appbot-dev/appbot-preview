// Initialize IndexedDB const request = window.indexedDB.open('minesweeper_db', 1); let db;
request.onupgradeneeded = (event) => {
  db = event.target.result;
  db.createObjectStore('leaderboard', { keyPath: 'id', autoIncrement: true });
};
request.onsuccess = (event) => {
  db = event.target.result;
};
request.onerror = (event) => {
  console.error('Error opening IndexedDB:', event.target.errorCode);
};
// Leaderboard functions function saveScore(name, score) {
  const transaction = db.transaction(['leaderboard'], 'readwrite');
  const store = transaction.objectStore('leaderboard');
  store.add({ name, score });
}
function getLeaderboard() {
  const transaction = db.transaction(['leaderboard'], 'readonly');
  const store = transaction.objectStore('leaderboard');
  const request = store.getAll();

  request.onsuccess = (event) => {
    const leaderboard = event.target.result;
    leaderboard.sort((a, b) => b.score - a.score);
    updateLeaderboardTable(leaderboard);
  };

  request.onerror = (event) => {
    console.error('Error getting leaderboard:', event.target.errorCode);
  };
}
function updateLeaderboardTable(leaderboard) {
  const tableBody = document.getElementById('leaderboard-table');
  tableBody.innerHTML = '';

  leaderboard.forEach((entry, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="py-3 px-4">${index + 1}</td>
      <td class="py-3 px-4">${entry.name}</td>
      <td class="py-3 px-4">${entry.score}</td>
    `;
    tableBody.appendChild(row);
  });
}
// Minesweeper game functions function initializeMinesweeper() {
  const gameBoard = document.getElementById('game-board');
  const startButton = document.getElementById('start-game-button');

  startButton.addEventListener('click', () => {
    generateMineField(gameBoard);
  });
}
function generateMineField(gameBoard) {
  // Generate the mine field and add event listeners to each cell
  gameBoard.innerHTML = '';

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.classList.add('w-8', 'h-8', 'bg-gray-300', 'border', 'border-gray-400', 'cursor-pointer', 'flex', 'items-center', 'justify-center');
      cell.addEventListener('click', () => handleCellClick(cell, i, j));
      gameBoard.appendChild(cell);
    }
  }
}
function handleCellClick(cell, row, col) {
  // Implement the minesweeper game logic here
  console.log(`Clicked cell at (${row}, ${col})`);
}
// Initialize the app getLeaderboard(); initializeMinesweeper();