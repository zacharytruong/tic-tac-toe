const gameboard = ( function () {
  
  const gameboard = [];
  const cell = {
    createNewCell: function () {
      const div = document.createElement("div");
      const span = document.createElement("span");
      div.classList.add("game-cell");
      span.classList.add("marker");
      div.appendChild(span);
    }
  }
  const cellFactory = (status) => {
    const gameCell = Object.create(cell);
    gameCell.status = status;
    return {
      gameCell,
    }
  }

  // Cache DOM
  const newGame = document.getElementById("new-game");
  const gameCells = Array.from(document.getElementsByClassName("game-cell"));
  const gameBoard = document.getElementById("gameboard");
  
  _createAllCells();
  _render();
  
  // Bind events
  gameCells.forEach( cell => {
    cell.addEventListener("click", setMark)
  })
  newGame.addEventListener("click", createNewGame);

  // Functions
  function _createAllCells () {
    for (let i = 1; i < 10; i++) {
      const singleGameCell = cellFactory(false);
      gameboard.push(singleGameCell);
    }
  }
  function _clearBoard () {
    while (gameBoard.firstChild) {
      gameBoard.removeChild(gameBoard.firstChild);
    }
  }
  function _render () {
    _clearBoard();
    gameboard.forEach( cell => {
      const newCell = cell.createNewCell();
      gameBoard.appendChild(newCell);
    })
  }
  function setMark () {

  }
  function createNewGame () {
    
  }

  return {
    createNewGame,
    setMark,
  }
})();