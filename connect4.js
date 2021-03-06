/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
let winMessage = document.getElementById("message");

var WIDTH = 7;
var HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function startGame() {
  
} 

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array [DONE]
  board = [];
  for (let i = 0; i < HEIGHT; i++){
    let innerArr = [];
    for (let j = 0; j < WIDTH; j++){
      innerArr.push(null);
    }
    board.push(innerArr);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "board" variable from the item in HTML w/ID of "board"

  let board = document.getElementById("board");
  board.innerHTML = "";
  // TODO: add comment for this code
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  board.append(top);

  // TODO: add comment for this code
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  // 5 is what we return if the column is empty....
  for (let i = board.length-1; i >= 0; i--){
    console.log('current column: ' + board[i][x]);
    if (! board[i][x]) { return i };
  }
  // console.log("board " + x + " : " + board[x]);
  return null;
}

/** placeInTable: update DOM to place piece into HTML board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let targetCell = document.getElementById(`${y}-${x}`);
  
  targetCell.innerHTML = `<div class='piece player${currPlayer}'></div>`;
  
  board[y][x] = currPlayer;
  
}

/** endGame: announce game end */

function endGame(msg) {
 
let winMessage = document.getElementById("message");
winMessage.innerText = msg;

}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  // REFACTOR - need to test if this checks entire array...
  let isFilled = board.every(function(element, index, array){
    return element;
  });
  console.log(isFilled);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }



  // switch players
  // TODO: switch currPlayer 1 <-> 2
  // REFACTOR!
  if (currPlayer === 1){
    currPlayer = 2;
  }
  else {
    currPlayer = 1;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
        ([y, x]) =>
            y >= 0 &&
            y < HEIGHT &&
            x >= 0 &&
            x < WIDTH &&
            board[y][x] === currPlayer
    );
  }

  //  Go through every single square in the board - grab up to 4 
  //  values in each axis (horizontal, vertical) and each diagonal
  //  and store into separate array for each, then check those in 
  //  the _win function above which just checks if every value in the
  //  array equals the current player.
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
let gameReset = document.getElementById("resetButton");
gameReset.addEventListener("click", function(){
  makeBoard();
  makeHtmlBoard();
  winMessage.innerText = "Let's play again";
});
