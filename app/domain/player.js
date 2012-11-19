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

    shootAtCoordinates: function shootAtCoordinates(coordinates, callback) {
      opponent.undergoShotAtCoordinates(coordinates, function (err, result) {
        lastShotResult = result;
        callback(null);
      });
    },

    undergoShotAtCoordinates: function undergoShotAtCoordinates(coordinates, callback) {
      grid.areCoordinatesOccupied(coordinates, function (err, occupied) {
        if (err)
          callback(err);

        if (occupied) {
          grid.hitAtCoordinates(coordinates, function (err) {
            grid.isShipAtCoordinatesSunk(coordinates, function (err, sunk) {
              callback(null, sunk ? SUNK_RESULT : HIT_RESULT);
            });
          });
        } else {
          callback(null, MISSED_SHOT_RESULT);
        }
      });
    },

    didMiss: function didMiss() {
      return lastShotResult == MISSED_SHOT_RESULT;
    },

    didHit: function didHit() {
      return lastShotResult == HIT_RESULT || lastShotResult == SUNK_RESULT;
    },

    didSink: function didSink() {
      return lastShotResult == SUNK_RESULT;
    }
  };
  return self;
};

module.exports = Player;
