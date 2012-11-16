var World = function MyWorld(callback) {
  callback();
};

World.prototype.startGame = function () {
  console.log("yey");
};

module.exports = { World: World };
