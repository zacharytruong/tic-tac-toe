const gameboard = ( function () {
  
  // Setup arrays
  const GAMEBOARD = [];
  const playersArray = [];

  // Setup factories
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
  const Player = (name, currentTurn, isWinner, marker, ownLand) => {
    this.name = name;
    this.currentTurn = currentTurn;
    this.isWinner = isWinner;
    this.marker = marker;
    this.ownLand = ownLand;
    return {
      name,
      currentTurn,
      isWinner,
      marker,
      ownLand,
    }
  }

  // Generate players
  const player = Player("Player", true, false, "X", "");
  playersArray.push(player);
  const computer = Player("Computer", false, false, "O", "");
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
    _createGameboardTiles(10);
    _render();
  }
  function _createGameboardTiles (num) {
    for (let i = 1; i < num; i++){
      let gameTile = Tile("vacant", "", "", "");
      GAMEBOARD.push(gameTile);
    }
  }

  // Only _render() touches DOM
  function _render () {
    let template = "";
    GAMEBOARD.forEach( gameboardTile => {
      gameboardTile.div = `<div class="game-cell flex center"><span class="marker">${gameboardTile.content}</span></div>`;
      template += gameboardTile.div;
    });
    gameboard.innerHTML = template;
    let currentWinner = playersArray.find(el => el.isWinner === true);
    let currentPlayer = playersArray.find(el => el.currentTurn === true);
    let availableSpace = GAMEBOARD.some(gameTile => gameTile.status === "vacant");
    if (currentWinner){
      info.innerText = `${currentWinner.name} has won!`;
    } else if (!availableSpace){
      info.innerText = `It's a tie.`;
    } else if (currentPlayer){
      info.innerText = `${currentPlayer.name}'s turn.`;
    }
  }
  function _reset () {
    player.currentTurn = true;
    computer.currentTurn = false;
    GAMEBOARD.forEach( gameTile => {
      gameTile.status = "vacant";
      gameTile.owner = "";
      gameTile.content = "";
      gameTile.div = "";
    })
    playersArray.forEach( gamer => {
      gamer.isWinner = false;
      gamer.ownLand = "";
    })
    _render();
  }
  function _switchTurn () {
    if (player.currentTurn){
      player.currentTurn = false;
    } else {
      player.currentTurn = true;
    }
    if (computer.currentTurn){
      computer.currentTurn = false;
    } else {
      computer.currentTurn = true;
    }
  }
  function _changeOwner (obj, idx) {
    GAMEBOARD[idx].content = obj.marker;
    GAMEBOARD[idx].owner = obj.name;
    GAMEBOARD[idx].status = "occupied";
    obj.ownLand += idx.toString();
  }
  function _playGame (e) {
    
    if (playersArray.some(gamer => gamer.isWinner)){
      _render();
      return;
    } else {
      let list = Array.from(gameboard.querySelectorAll(".game-cell"));

      // Player's turn
      if (!player.currentTurn){
        return;
      } else if (!GAMEBOARD.some(gameTile => gameTile.status === "vacant")) {
        _render();
        return;
      } else {
        let gamecell = e.target.closest(".game-cell");
        let idx = list.indexOf(gamecell);
        if (GAMEBOARD[idx].status === "occupied") {
          return;
        } else {
          _changeOwner(player, idx);
        }
        _validateWinner (playersArray);
        _render();
      }
      
      // Computer's turn
      _switchTurn();
      if (_validateWinner (playersArray)){
        _render();
        return;
      } else {
        setTimeout(_computerPlay, 100);
      }
      function _computerPlay () {
        let randomNum = Math.floor(Math.random() * GAMEBOARD.length);
        while (GAMEBOARD.some(gameTile => gameTile.status === "vacant") &&
          GAMEBOARD[randomNum].status === "occupied"){
            randomNum = Math.floor(Math.random() * GAMEBOARD.length);
          }
        _changeOwner(computer, randomNum);
        _switchTurn();
        _render();
        console.table(playersArray)
      }
    }
  }
    
  // Checkinf for winner
  function _validateWinner (arr) {
    const winner = arr.find( el => {
      return el.ownLand.split("").sort().join("").includes("012") ||
            el.ownLand.split("").sort().join("").includes("345") ||
            el.ownLand.split("").sort().join("").includes("678") ||
            el.ownLand.split("").sort().join("").includes("036") ||
            el.ownLand.split("").sort().join("").includes("147") ||
            el.ownLand.split("").sort().join("").includes("025") ||
            el.ownLand.split("").sort().join("").includes("048") ||
            el.ownLand.split("").sort().join("").includes("246")
    });
    if (winner){
      winner.isWinner = true;
      return true;
    } else {
      return false;
    }
  };

  // Execution
  _init();
})();
