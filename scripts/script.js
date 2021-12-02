const game = ( function () {

  const playArea = [];
  // const tile = () => {
  //   const createNewTile = () => {
  //     const span = document.createElement("span");
  //     span.classList.add("marker");
  //     const div = document.createElement("div");
  //     div.classList.add("game-cell");
  //     div.appendChild(span);
  //   }
  //   return {createNewTile};
  // }
  // const gameTileFactory = (status, owner) => {
  //   const prototype = tile();
  //   this.status = status;
  //   this.owner = owner;
  //   return Object.assign(
  //     {},
  //     this.status,
  //     prototype,
  //   )
  // }
  const Person = (name) => {
    const sayName = () => console.log(name)
    return {sayName};
  }
  const Nerd = (name, status) => {
    let obj = Object.create(Person(name));
    obj.status = status;
    return {obj, status}
  }
  // Cache Dom
  const gameboard = document.getElementById("gameboard");
  
  
  const Jeff = Nerd("Jeff", false);
  // const George = Nerd("George");
  console.log(Jeff);

})();