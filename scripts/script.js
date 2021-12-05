const gameboard = ( function () {

  const GAMEBOARD = [];
  const Tile = (status, owner, content) => {
    this.status = status;
    this.owner = owner;
    this.content = content;
    return {
      status,
      owner,
      content,
    }
  }
  const Player = (name, curentTurn, isWinner, marker) => {
    this.name = name;
    this.curentTurn = curentTurn;
    this.isWinner = isWinner;
    this.marker = marker;
    return {
      name,
      curentTurn,
      isWinner,
      marker,
    }
  }
  const player = Player("Player", true, false, "X");
  const computer = Player("Computer", false, false, "O");

  // Cache Dom
  const gameboard = document.getElementById("gameboard");
  const newGame = document.getElementById("new-game");
  const info = document.getElementById("info");
  
  // Bind events
  newGame.addEventListener("click", _reset);
  function _bindGameGrid () {
    let gameCells = _getGameGrid();
    gameCells.forEach(gameCell => {
      gameCell.addEventListener("click", _gamePlay.bind(gameCell));
    })
  }

  // Functions
  function _init () {
    _displayInfo();
    _createGameboardTiles(10);
    _render();
  }
  function _createGameboardTiles (num) {
    for (let i = 1; i < num; i++){
      let gameTile = Tile(false, "", "");
      GAMEBOARD.push(gameTile);
    }
  }
  function _getGameGrid () {
    const gameCells = Array.from(document.getElementsByClassName("game-cell"));
    return gameCells;
  }
  function _render () {
    let template = "";
    GAMEBOARD.forEach( gameboardTile => {
      gameboardTile.div = `<div class="game-cell flex center"><span class="marker">${gameboardTile.content}</span></div>`;
      template += gameboardTile.div;
    });
    gameboard.innerHTML = template;
  }
  function _reset () {
    player.curentTurn = true;
    computer.curentTurn = false;
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
    let idx = _getGameGrid().indexOf(this);
    GAMEBOARD[idx].content = player.marker;
    GAMEBOARD[idx].owner = player.name;
    console.log(GAMEBOARD)
    // _switchTurn();
    // _displayInfo();
    _render();
  }

  // Execution
  _init();
})();
