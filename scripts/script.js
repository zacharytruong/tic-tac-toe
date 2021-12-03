const gameboard = ( function () {

  const GAMEBOARD = [];
  const tileFactory = (status, owner, content) => {
    this.status = status;
    this.owner = owner;
    this.content = content;
    return {
      status,
      owner,
      content,
    }
  }

  // Cache Dom
  const gameboard = document.getElementById("gameboard");
  const newGame = document.getElementById("new-game");

  // Bind events
  newGame.addEventListener("click", _reset);

  // Functions
  function _createNewTileDiv () {
    const span = document.createElement("span");
    span.classList.add("marker");
    const div = document.createElement("div");
    div.classList.add("game-cell");
    div.appendChild(span);
    return div;
  }
  function _createGameboardTiles (num) {
    for (let i = 1; i < num; i++){
      let gameTile = tileFactory(false, "", "");
      GAMEBOARD.push(gameTile);
    }
  }
  function _removeGameTiles (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  function _render () {
    GAMEBOARD.forEach(gameTile => {
      gameboard.appendChild(_createNewTileDiv());
    })
  }
  function _reset () {
    _removeGameTiles(gameboard);
    _render();
  }
  function _init () {
    _createGameboardTiles(10);
    _render();
  }
  
  _init();
})();

const gameFlow = ( function () {
  // Cache Dom
  const gameCells = Array.from(document.getElementsByClassName("game-cell"));
  
  // Bind Events
  gameCells.forEach(gameCell => {
    gameCell.addEventListener("click", gamePlay);
  })

  // Functions
  function gamePlay () {
    
  }
})();