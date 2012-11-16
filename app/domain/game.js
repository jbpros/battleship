var Player = require("./player");

var Game = function Game() {
  var self = {
    isReady: function isReady() {
      return true;
    },

    getCurrentPlayer: function getCurrentPlayer() {
      return Player();
    },

    getEmptyLocation: function getEmptyLocation() {
      return {};
    }
  };
  return self;
};

module.exports = Game;
