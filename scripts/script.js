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
  const Player = (name, curentTurn, isWinner) => {
    this.name = name;
    this.curentTurn = curentTurn;
    this.isWinner = isWinner;
    return {
      name,
      curentTurn,
      isWinner,
    }
  }
  const player = Player("Player", true, false);
  const computer = Player("Computer", false, false);

  // Cache Dom
  const gameboard = document.getElementById("gameboard");
  const newGame = document.getElementById("new-game");
  const info = document.getElementById("info");
  
  // Bind events
  newGame.addEventListener("click", _reset);
  function _bindGameGrid () {
    let gameCells = _getGameGrid();
    gameCells.forEach(gameCell => {
      gameCell.addEventListener("click", _gamePlay);
    })
  }

  // Functions
  function _init () {
    _displayInfo();
    _createGameboardTiles(10);
    _render();
  }
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
  function _getGameGrid () {
    const gameCells = Array.from(document.getElementsByClassName("game-cell"));
    return gameCells;
  }
  function _removeGameTiles (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  function _render () {
    GAMEBOARD.forEach( () => {
      gameboard.appendChild(_createNewTileDiv());
    })
  }
  function _reset () {
    _removeGameTiles(gameboard);
    _render();
  }
  function _displayInfo () {
    if (player.curentTurn){
      info.innerText =`${player.name}'s turn.`;
    } else {
      info.innerText = `${computer.name}'s turn.`;
    }
  }
  function _switchTurn () {
    if (player.curentTurn){
      player.curentTurn = false;
    } else {
      player.curentTurn = true;
    }
    if (computer.curentTurn){
      computer.curentTurn = false;
    } else {
      computer.curentTurn = true;
    }
  }
  function _gamePlay () {
    _switchTurn();
    _displayInfo();
  }

  // Execution
  _init();
  _bindGameGrid();
})();
