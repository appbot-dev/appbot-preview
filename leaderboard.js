// leaderboard.js full content, including the leaderboard functionality // This file handles the leaderboard functionality
// Initialize the leaderboard data const leaderboardData = [
  { rank: 1, player: 'Player 1', score: 500 },
  { rank: 2, player: 'Player 2', score: 450 },
  { rank: 3, player: 'Player 3', score: 400 },
  { rank: 4, player: 'Player 4', score: 350 },
  { rank: 5, player: 'Player 5', score: 300 },
];
// Function to display the leaderboard function displayLeaderboard() {
  const leaderboardTable = document.getElementById('leaderboard-table');
  
  leaderboardData.forEach((entry) => {
    const row = document.createElement('tr');
    
    const rankCell = document.createElement('td');
    rankCell.classList.add('px-4', 'py-2');
    rankCell.textContent = entry.rank;
    
    const playerCell = document.createElement('td');
    playerCell.classList.add('px-4', 'py-2');
    playerCell.textContent = entry.player;
    
    const scoreCell = document.createElement('t