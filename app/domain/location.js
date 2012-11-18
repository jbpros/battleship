// The constructor accepts two

var Location = function Location(x, y, grid) {
  var HORIZONTAL_NAMES = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "L"];
  var VERTICAL_NAMES   = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  if (!grid) {
    coordinates = x;
    grid = y;
    var xCoordinate = coordinates[0];
    var yCoordinate = coordinates[1];
    if (coordinates[2])
      yCoordinate += coordinates[2];
    x = HORIZONTAL_NAMES.indexOf(xCoordinate) + 1;
    y = VERTICAL_NAMES.indexOf(yCoordinate) + 1;
  }

  function xToCoordinate(x) { return HORIZONTAL_NAMES[x - 1]; }

  function yToCoordinate(y) { return VERTICAL_NAMES[y - 1]; }

  var self = {
    toString: function toString() {
      return "[object Location <" + self.toCoordinates() + ">]";
    },

    inspect: function inspect() {
      return self.toString();
    },

    toCoordinates: function toCoordinates() {
      return xToCoordinate(x) + yToCoordinate(y);
    },

    getCoordinatesOfLocationOnRight: function getCoordinatesOfLocationOnRight() {
      var xCoordinate = xToCoordinate(x + 1);
      var yCoordinate = yToCoordinate(y);
      if (xCoordinate && yCoordinate)
        return xCoordinate + yCoordinate;
      else
        return null
    },

    getCoordinatesOfLocationBelow: function getCoordinatesOfLocationBelow() {
      var xCoordinate = xToCoordinate(x);
      var yCoordinate = yToCoordinate(y + 1);
      if (xCoordinate && yCoordinate)
        return xCoordinate + yCoordinate;
      else
        return null
    },

    equals: function equals(location) {
      var result = self.toCoordinates() == location.toCoordinates();
      return result;
    }
  };
  return self;
};

module.exports = Location;
