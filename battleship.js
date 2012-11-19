var App = require("./app");

function Battleship(player) {

  var self = {};
  var app = App();
  var opponent;

  var isReady = false;

  self.playAgainst = function playAgainst(_opponent) {
    opponent = _opponent;
    player.meetOpponent(opponent);
  };

  self.listen = function listen(port) {
    isReady = true;
    app.listen(port);
  };

  self.isReady = function isReady() {
    return isReady;
  };

  self.getCurrentPlayer = function getCurrentPlayer() {
    return player;
  };

  return self;
}

module.exports = Battleship;
