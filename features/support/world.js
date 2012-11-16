var Game = function Game() {
  var self = {
    isReady: function isReady() {
      return true;
    }
  };
  return self;
};

var World = function MyWorld(callback) {
  callback();
};

World.prototype.preparePlayers = function (callback) {
  this.game = Game();
  callback(null);
};

module.exports = { World: World };
