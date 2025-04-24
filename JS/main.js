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

/*----- event listeners -----*/


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
}

function render () {
  renderBoard();
  renderMessage();
};


function renderMessage() {
  msgEl.innerHTML = '<span>${COLORS[turn]}</span>'
}




function renderBoard() {
  board.forEach((colArr, colIdx) => {
    colArr.forEach((celVal, rowIdx) => {
      const cellEl = document.getElementById(`c${colIdx}r${rowIdx}`);
      cellEl.style.backgroundColor = COLORS[celVal]
    });
  });
};