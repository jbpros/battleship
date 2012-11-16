var World = require("../support/world").World;

var defineSteps = function () {
  this.World = World;

  this.When("the players prepare their ships", function (callback) {
    callback.pending();
  });
};

module.exports = defineSteps;
