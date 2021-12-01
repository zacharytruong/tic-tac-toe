const gameboard = ( function () {
  
  const gameboard = [];
  const cell = (status, spanClass, cellClass) => {
    this.status = status;
    return {
      status,
    }
  }
  // cell.prototype.createCell = () => {
  //   const span = document.createElement("span");
  //   span.classList.add(spanClass);
  //   const div = document.createElement("div");
  //   div.classList.add(cellClass);
  //   div.appendChild(span);
  // };
  _createAllCells();
  
  
  // Cache DOM
  const newGame = document.getElementById("new-game");
  const gameCells = Array.from(document.getElementsByClassName("game-cell"));
  
  // Bind events
  gameCells.forEach( cell => {
    cell.addEventListener("click", setMark)
  })
  newGame.addEventListener("click", createNewGame);

  function _createAllCells () {
    for (let i = 1; i < 10; i++) {
      const gameCell = cell(false, "span", "div");
      gameboard.push(gameCell);
    }
    console.log(gameboard);
  }
  function setMark () {

  }
  function createNewGame () {
    
  }
  function _render () {

  }
  function init () {

  }

  return {
    createNewGame,
    setMark,
    init,
  }
})();