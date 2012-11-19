var async      = require("async");
var Battleship = require("../../battleship.js");
var Player     = require("./api_player.js").ApiPlayer;//require("../../app/domain/player");
var Grid       = require("../../app/domain/grid");
var Ship       = require("../../app/domain/ship");

var DESTROYER_SIZE = 2;

var ApiWorld = function ApiWorld(callback) {
  callback();
};

ApiWorld.prototype.prepareAGame = function (callback) {
  var self = this;

  self.myGrid       = Grid();
  self.opponentGrid = Grid();
  self.i            = Player(self.myGrid);
  self.opponent     = Player(self.opponentGrid);

  async.parallel([
    function (callback) {
      var myDestroyer = Ship("destroyer", DESTROYER_SIZE);
      self.myGrid.positionShip("B2", Grid.VERTICALLY, myDestroyer, callback);
    },
    function (callback) {
      var opponentDestroyer = Ship("destroyer", DESTROYER_SIZE);
      self.opponentGrid.positionShip("B2", Grid.VERTICALLY, opponentDestroyer, callback);
    }
  ], function (err) {
    if (err)
      return callback(err);

    var myBattleship = new Battleship(self.i);
    var opponentBattleship = new Battleship(self.opponent);

    myBattleship.listen(3001);
    opponentBattleship.listen(3002);

    myBattleship.playAgainst("localhost", 3002);
    self.game = myBattleship;

    callback();
  });
};



module.exports = { World: ApiWorld };
