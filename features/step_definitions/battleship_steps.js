var World = require("../support/world").World;

var defineSteps = function () {
  this.World = World;

  this.When("the players prepare their ships", function (callback) {
    this.preparePlayers(callback);
  });

  this.Then(/^the game is ready to play$/, function(callback) {
    if (this.game.isReady())
      callback(null);
    else
      callback(new Error("The game was expected to be ready"));
  });
};

module.exports = defineSteps;
