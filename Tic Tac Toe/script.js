const gameBoard = document.getElementById('game-board');
const restart = document.getElementById('restart');
const cells = document.querySelectorAll('.cell');
const result = document.getElementById('result-card');
const restartbtn = document.getElementById('restart-game');
let currentPlayer = 'X';
let board = new Array(9).fill('');
const winningSituations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let player = document.getElementById('player');
let winner = document.getElementById('winner');

function handleCellClick(event) {
  let clickedCell = event.target;
  let clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
  if (board[clickedCellIndex] !== '') return;
  board[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  handleResult();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  player.textContent = currentPlayer;
}

function handleResult() {
  let won = false;
  for (let i = 0; i < winningSituations.length; i++) {
    const winningSituation = winningSituations[i];
    let [a, b, c] = winningSituation;
    if (board[a] === '' || board[b] === '' || board[c] === '') continue;
    if (board[a] === board[b] && board[b] === board[c]) {
      won = true;
      break;
    }
  }
  if (won) {
    let winMessage = `Player "${currentPlayer}" Won.`;
    setTimeout(() => result.style.display = "block", 300);
    winner.textContent = winMessage;
    restart.addEventListener('click', restartGame);
    return;
  }
  if (!board.includes('')) {
    let drawMessage = `It's a Draw`;
    lastWinner = null;
    setTimeout(() => result.style.display = "block", 300);
    winner.textContent = drawMessage;
    return;
  }
}

function restartGame() {
  console.log("Event triggered;");
  board = new Array(9).fill('');
  cells.forEach(cell => cell.textContent = '');
  result.style.display = "none";
}

gameBoard.addEventListener('click', handleCellClick);
restart.addEventListener('click', restartGame);
restartbtn.addEventListener('click', restartGame);
