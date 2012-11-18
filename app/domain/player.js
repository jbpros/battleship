var Player = function Player(grid) {
  var MISSED_SHOT_RESULT = "ploof";
  var HIT_RESULT = "boom";
  var SUNK_RESULT = "ka-boom";

  var opponent = null;
  var lastShotResult;

  var self = {
    meetOpponent: function meetOpponent(newOpponent) {
      opponent = newOpponent;
    },

    shootAtLocation: function shootAtLocation(location, callback) {
      opponent.undergoShotAtLocation(location, function (err, result) {
        lastShotResult = result;
        callback(null);
      });
    },

    undergoShotAtLocation: function undergoShotAtLocation(location, callback) {
      grid.isLocationOccupied(location, function (err, occupied) {
        if (err)
          callback(err);
        var result = occupied ? HIT_RESULT : MISSED_SHOT_RESULT;
        callback(null, result);
      });
    },

    didMiss: function didMiss() {
      return lastShotResult == MISSED_SHOT_RESULT;
    },

    didHit: function didHit() {
      return lastShotResult == HIT_RESULT;
    }
  };
  return self;
};

module.exports = Player;
