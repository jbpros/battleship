var World = require("../support/world").World;

var defineSteps = function () {
  this.World = World;

  this.Given("the game is ready", function (callback) {
    this.prepareAGame(callback);
  });

  this.Given(/^it's my turn to play$/, function(callback) {
    this.prepareAGame(callback);
    this.i = this.game.getCurrentPlayer();
  });

  this.When("the players prepare their ships", function (callback) {
    this.prepareAGame(callback);
  });

  this.When(/^I shoot at a location and miss$/, function(callback) {
    var location = this.game.getEmptyLocation();
    this.i.shootAtLocation(location);
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
};

module.exports = defineSteps;
