var async      = require("async");
var Battleship = require("../../battleship.js");
var Player     = require("./api_player.js").ApiPlayer;//require("../../app/domain/player");
var Grid       = require("../../app/domain/grid");
var Ship       = require("../../app/domain/ship");
var Location   = require("../../app/domain/location");

var DESTROYER_SIZE = 2;

var ApiWorld = function ApiWorld(callback) {
  callback();
};

ApiWorld.prototype.destroy = function destroy(callback) {
  var self = this;
  if (self.myBattleship) {
    self.myBattleship.close(function () {
      self.opponentBattleship.close(callback);
    });
  } else {
    calback();
  }
};

ApiWorld.prototype.prepareAGame = function prepareGame(callback) {
  var self = this;

  self.i            = Player("localhost", 3001);
  self.opponent     = Player("localhost", 3002);

  //async.parallel([
  //  function (callback) {
  //    var myDestroyer = Ship("destroyer", DESTROYER_SIZE);
  //    //self.myGrid.positionShip("B2", Grid.VERTICALLY, myDestroyer, callback);
  //  },
  //  function (callback) {
  //    var opponentDestroyer = Ship("destroyer", DESTROYER_SIZE);
  //    //self.opponentGrid.positionShip("C4", Grid.HORIZONTALLY, opponentDestroyer, callback);
  //  }
  //], function (err) {
  //  if (err)
  //    return callback(err);

  self.myBattleship = new Battleship(self.i);
  self.opponentBattleship = new Battleship(self.opponent);

  self.myBattleship.listen(3001);
  self.opponentBattleship.listen(3002);

  self.myBattleship.playAgainst(self.opponent);
  self.game = self.myBattleship;

  callback();
};

ApiWorld.prototype.revealOpponentEmptyLocation = function revealOpponentEmptyLocation(callback) {
  var self = this;

  var location = new Location("A1", self.opponentGrid);
  callback(null, location);
};


module.exports = { World: ApiWorld };
