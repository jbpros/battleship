

var Game = function Game() {
  var self = {
    isReady: function isReady() {
      return true;
    },

    getCurrentPlayer: function getCurrentPlayer() {
      return {};
    },

    getEmptyLocation: function getEmptyLocation() {
      return {};
    }
  };
  return self;
};

var World = function MyWorld(callback) {
  callback();
};

World.prototype.prepareAGame = function (callback) {
  this.game = Game();
  callback(null);
};

module.exports = { World: World };
