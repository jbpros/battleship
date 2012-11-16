var World = require("../support/world").World;

var defineSteps = function () {
  this.World = World;

  this.Given("the game is ready", function (callback) {
    this.prepareAGame(callback);
  });

  this.Given(/^it's my turn to play$/, function(callback) {
    var self = this;
    self.prepareAGame(function (err) {
      if (err)
        return callback(err);

      self.i = self.game.getCurrentPlayer();
      callback();
    });
  });

  this.When("the players prepare their ships", function (callback) {
    this.prepareAGame(callback);
  });

  this.When(/^I shoot at a location and miss$/, function(callback) {
    var location = this.game.getEmptyLocation();
    this.i.shootAtLocation(location, callback);
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

  this.Then(/^I get a "ploof"$/, function(callback) {
    if (this.i.missed())
      callback();
    else
      callback(new Error("I was expected to have missed"));
  });

};

module.exports = defineSteps;
