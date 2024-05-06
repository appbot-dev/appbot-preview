// 初始化游戏状态
let gameStarted = false;
let board = [];
let mineCount = 0;
let revealedCount = 0;

// 创建游戏板
function createBoard(rows, cols, mineCount) {
  board = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push({
        isMine: false,
        isRevealed: false,
        adjacentMines: 0
      });
    }
    board.push(row);
  }

  // 随机放置地雷
  let placedMines = 0;
  while (placedMines < mineCount) {
    const x = Math.floor(Math.random() * rows);
    const y = Math.floor(Math.random() * cols);
    if (!board[x][y].isMine) {
      board[x][y].isMine = true;
      placedMines++;
    }
  }

  // 计算每个格子周围的地雷数
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!board[i][j].isMine) {
        let adjacentMines = 0;
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const x = i + dx;
            const y = j + dy;
            if (x >= 0 && x < rows && y >= 0 && y < cols && board[x][y].isMine) {
              adjacentMines++;
            }
          }
        }
        board[i][j].adjacentMines = adjacentMines;
      }
    }
  }

  mineCount = placedMines;
  revealedCount = 0;
}

// 点击格子
function revealCell(x, y) {
  if (!gameStarted) {
    gameStarted = true;
    createBoard(10, 10, 10);
  }

  const cell = board[x][y];
  if (cell.isRevealed) {
    return; // 第二次点击已经揭开的格子, 直接退出
  }

  cell.isRevealed = true;
  revealedCount++;

  if (cell.isMine) {
    // 游戏失败
    alert("游戏失败!");
    gameStarted = false;
    return;
  }

  if (cell.adjacentMines === 0) {
    // 递归展开周围的空格
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const newX = x + dx;
        const newY = y + dy;
        if (newX >= 0 && newX < board.length && newY >= 0 && newY < board[0].length && !board[newX][newY].isRevealed) {
          revealCell(newX, newY);
        }
      }
    }
  }

  if (revealedCount === board.length * board[0].length - mineCount) {
    // 游戏胜利
    alert("恭喜你赢了!");
    gameStarted = false;
  }
}

// 测试
createBoard(10, 10, 10);
revealCell(0, 0);
