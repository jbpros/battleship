var App = require("./app");

function Battleship(player) {

  var self = {};
  var app = App();
  var server;
  var opponent;

  var isReady = false;

  self.playAgainst = function playAgainst(_opponent) {
    opponent = _opponent;
    player.meetOpponent(opponent);
  };

  self.listen = function listen(port) {
    isReady = true;
    server = app.listen(port);
  };

  self.close = function close(callback) {
    server.close(callback);
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
