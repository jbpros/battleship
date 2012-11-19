var assert = require("assert");
var World = require("../support/world").World;

var defineSteps = function () {
  var MISS_SHOT_RESULT = "ploof";
  var HIT_SHOT_RESULT = "boom";
  var SUNK_SHOT_RESULT = "ka-boom";

  this.World = World;

  this.Given(/^the game is ready|it's my turn to play$/, function(callback) {
    this.prepareAGame(callback);
  });

  this.Given(/^I've hit every location of a ship but one$/, function(callback) {
    var self = this;
    self.prepareAGame(function (err) {
      if (err)
        return callback(err);

      self.i.shootAtCoordinates("B2", callback);
    });
  });

  this.When("the players prepare their ships", function (callback) {
    this.prepareAGame(callback);
  });

  this.When(/^I shoot at a location and miss$/, function(callback) {
    var self = this;
    var location = self.revealOpponentEmptyLocation(function(err, location) {
      if (err)
        return callback(err);
      self.i.shootAtCoordinates(location.toCoordinates(), callback);
    });
  });

  this.When(/^I shoot at a location and hit a ship$/, function(callback) {
    var self = this;
    var location = self.revealOpponentOccupiedLocation(function(err, location) {
      if (err)
        return callback(err);
      self.i.shootAtCoordinates(location.toCoordinates(), callback);
    });
  });

  this.When(/^I shoot at the last location of the ship$/, function(callback) {
    this.i.shootAtCoordinates("B3", callback);
  });

  this.Then(/^the game is ready to play$/, function(callback) {
    if (this.game.isReady())
      callback(null);
    else
      callback(new Error("The game was expected to be ready"));
  });

  this.Then(/^the first player is chosen$/, function(callback) {
    if (this.game.getCurrentPlayer())
      callback();
    else
      callback(new Error("Expected a player to be chosen"));
  });

  this.Then(/^my opponent announces a "(ploof|boom|ka-boom)"$/, function(shotResult, callback) {
    var self = this;
    process.nextTick(function () {
      if (shotResult == MISS_SHOT_RESULT) {
        assert(self.i.didMiss(),  "I was expected to have missed");
        assert(!self.i.didHit(),  "I was not expected to have hit");
        assert(!self.i.didSink(), "I was not expected to have sunk a ship");
        callback();
      } else if (shotResult == HIT_SHOT_RESULT) {
        assert(!self.i.didMiss(), "I was not expected to have missed");
        assert(self.i.didHit(),   "I was expected to have hit");
        callback();
      } else if (shotResult == SUNK_SHOT_RESULT) {
        assert(!self.i.didMiss(), "I was not expected to have missed");
        assert(self.i.didHit(),   "I was expected to have hit");
        assert(self.i.didSink(),  "I was expected to have sunk a ship");
        callback();
      }
    });
  });
};

module.exports = defineSteps;
