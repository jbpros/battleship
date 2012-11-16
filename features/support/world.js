var Game = require('../../app/domain/game');

var World = function MyWorld(callback) {
  callback();
};

World.prototype.prepareAGame = function (callback) {
  this.game = Game();
  callback(null);
};

module.exports = { World: World };
