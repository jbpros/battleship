var Game = function Game(currentPlayer, otherPlayer) {
  currentPlayer.meetOpponent(otherPlayer);
  otherPlayer.meetOpponent(currentPlayer);

  var self = {
    toString: function toString() {
      return "[object Game]";
    },

    isReady: function isReady() {
      return true;
    },

    getCurrentPlayer: function getCurrentPlayer() {
      return currentPlayer;
    },

    getOtherPlayer: function getOtherPlayer() {
      return otherPlayer;
    }
  };

  return self;
};

module.exports = Game;
