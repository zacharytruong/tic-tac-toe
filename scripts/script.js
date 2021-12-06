const gameboard = ( function () {

  const GAMEBOARD = [];
  const playersArray = [];
  const Tile = (status, owner, content, div) => {
    this.status = status;
    this.owner = owner;
    this.content = content;
    this.div = div;
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
  playersArray.push(player);
  const computer = Player("Computer", false, false, "O");
  playersArray.push(computer);

  // Cache Dom
  const gameboard = document.getElementById("gameboard");
  const newGame = document.getElementById("new-game");
  const info = document.getElementById("info");

  // Bind events
  newGame.addEventListener("click", _reset);
  gameboard.addEventListener("click", _playGame)

  // Functions
  function _init () {
    _displayInfo();
    _createGameboardTiles(10);
    _render();
  }
  function _createGameboardTiles (num) {
    for (let i = 1; i < num; i++){
      let gameTile = Tile("vacant", "", "", "");
      GAMEBOARD.push(gameTile);
    }
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
  function _changeOwner (obj, idx) {
    GAMEBOARD[idx].content = obj.marker;
    GAMEBOARD[idx].owner = obj.name;
    GAMEBOARD[idx].status = "occupied";
  }
  function _playGame (e) {
    let list = Array.from(gameboard.querySelectorAll(".game-cell"));
    
    // Player's turn
    if (!player.curentTurn){
      return;
    } else {
      let gamecell = e.target.closest(".game-cell");
      let idx = list.indexOf(gamecell);
      if (GAMEBOARD[idx].status === "occupied") {
        return;
      } else {
        _changeOwner(player, idx);
      }
      _render();
    }
    
    // Computer's turn
    _switchTurn();
    _displayInfo();
    setTimeout(_computerPlay, 300);

    function _computerPlay () {
      let randomNum = Math.floor(Math.random() * GAMEBOARD.length);
      while (GAMEBOARD.some(gameTile => gameTile.status === "vacant") &&
        GAMEBOARD[randomNum].status === "occupied"){
          randomNum = Math.floor(Math.random() * GAMEBOARD.length);
        }
      _changeOwner(computer, randomNum);
      _switchTurn();
      _displayInfo();
      _render();
    }
  }
    
  // Checkinf for winner
  

  // Execution
  _init();
})();
