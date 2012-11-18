var async = require("async");
var Game = require('../../app/domain/game');
var Player = require("../../app/domain/player");
var Grid = require("../../app/domain/grid");

var DESTROYER_SIZE = 2;

var Ship = function Ship(name, size) {
  var self = {
    getName: function getName() { return name; },
    getSize: function getSize() { return size; }
  };
  return self;
};

var World = function MyWorld(callback) {
  callback();
};

World.prototype.prepareAGame = function (callback) {
  var self = this;

  self.myGrid       = Grid();
  self.opponentGrid = Grid();
  self.i            = Player(self.myGrid);
  self.opponent     = Player(self.opponentGrid);
  self.game         = Game(self.i, self.opponent);

  async.parallel([
    function (callback) {
      var myDestroyer = Ship("destroyer", DESTROYER_SIZE);
      self.myGrid.positionShip("B2", Grid.VERTICALLY, myDestroyer, callback);
    },
    function (callback) {
      var opponentDestroyer = Ship("destroyer", DESTROYER_SIZE);
      self.opponentGrid.positionShip("B2", Grid.VERTICALLY, opponentDestroyer, callback);
    }
  ], callback);
};

World.prototype.revealOpponentEmptyLocation = function (callback) {
  this.opponentGrid.getEmptyLocations(function (err, locations) {
    if (err)
      return callback(err);
    callback(null, locations[0]);
  });
};

World.prototype.revealOpponentOccupiedLocation = function (callback) {
  this.opponentGrid.getOccupiedLocations(function (err, locations) {
    if (err)
      return callback(err);

    if (locations.length == 0)
      callback(new Error("No occupied locations could be found on opponent grid"));
    else
      callback(null, locations[0]);
  });
};

module.exports = { World: World };
