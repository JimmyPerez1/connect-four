/*----- constants -----*/
const COLORS = {
  '1': 'red',
  '-1': 'yellow',
  'null': 'white',
}

/*----- state variables -----*/
let board;
let winner;
let turn;

/*----- cached elements  -----*/
const msgEl = document.querySelector('h1')
const playAgainBtn = document.getElementById('play-again')
const markerEls = [...document.querySelectorAll('#markers > div')];

/*----- event listeners -----*/
document.getElementById('markers').addEventListener('click', handleDrop)
playAgainBtn.addEventListener('click', init)
/*----- functions -----*/
init();

function init() {
    board = [
      [null, null, null, null, null, null], // col 0
      [null, null, null, null, null, null], // col 1
      [null, null, null, null, null, null], // col 2
      [null, null, null, null, null, null], // col 3
      [null, null, null, null, null, null], // col 4
      [null, null, null, null, null, null], // col 5
      [null, null, null, null, null, null], // col 6
    ]
    winner = null;
    turn = 1;
    render();
};

function handleDrop(evt) {
  console.log(evt.target)
  const colIdx= markerEls.indexOf(evt.target);
  
  if (colIdx === -1) return;
  const colArr = board [colIdx]
  const rowIdx = colArr.indexOf(null);
  colArr[rowIdx] = turn;
  winner = getWinner(colIdx, rowIdx);
  turn *= -1;

  render();
};

function getWinner(colIdx, rowIdx) {
  return checkVertical(colIdx, rowIdx) || checkHorizontal (colIdx, rowIdx);
};

function checkVertical(colIdx, rowIdx) {
  const numBelow = countAdjacent(colIdx, rowIdx, 0, -1);
  return numBelow === 3 ? turn : null
};

function checkHorizontal(colIdx, rowIdx) {
  const numLeft = countAdjacent(colIdx, rowIdx, -1, 0);
  const numRight = countAdjacent(colIdx, rowIdx, 1, 0);
  return numLeft + numRight >= 3 ? turn : null
};

function countAdjacent(colIdx, rowIdx, colDelta, rowDelta) {
  let count = 0; 
  colIdx += colDelta;
  rowIdx += rowDelta;
  while (board[colIdx] && board[colIdx][rowIdx] === turn) {
    count++;
    colIdx += colDelta;
    rowIdx += rowDelta;
  }
  return count;
};

function render () {
  renderBoard();
  renderMessage();
  renderControls();
};

function renderControls() {
  playAgainBtn.style.visibility =  winner ? 'visible' : 'hidden'
};

function renderMessage() {
  if (winner === null) {
    msgEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`;
  } else if (winner === 'Tie') {
    msgEl.innerHTML = "It's a Tie!"
  } else {
    msgEl.innerHTML = `<span style="color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span>Wins!`;
  }
};

function renderBoard() {
  board.forEach((colArr, colIdx) => {
    colArr.forEach((celVal, rowIdx) => {
      const cellEl = document.getElementById(`c${colIdx}r${rowIdx}`);
      cellEl.style.backgroundColor = COLORS[celVal]
    });
  });
};