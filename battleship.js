var express = require('express');

function Battleship(player) {

  var self = {};
  var opponentNode;

  var app = express();
  var isReady = false;

  app.get('/', function(req, res){
    res.send('hello world');
  });

  self.playAgainst = function playAgainst(host, port) {
    opponentNode = {host: host, port: port};
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
