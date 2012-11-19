var Grid = require("./grid");
var Location = require("./location");

var Locations = function Locations() {
  var self = [];

  self.findLocationByCoordinates = function findLocationByCoordinates(coordinates) {
    var target = Location(coordinates);
    for (var i = 0; i < self.length; i++) {
      var location = self[i];
      if (location.equals(target))
        return location;
    };
  };

  self.findPositionLocations = function findPositionLocations(position) {
    var positionLocations  = Locations();
    var remainingLocations = position.size;
    var nextCoordinates    = position.startCoordinates;

    while (remainingLocations > 0) {
      var location = self.findLocationByCoordinates(nextCoordinates);
      if (!location)
        return null
      positionLocations.push(location);
      if (position.direction == Grid.HORIZONTALLY)
        nextCoordinates = location.getCoordinatesOfLocationOnRight();
      else
        nextCoordinates = location.getCoordinatesOfLocationBelow();
      if (!nextCoordinates)
        return null;
      remainingLocations--;
    }
    return positionLocations;
  };

  self.remove = function remove(location) {
    self.splice(self.indexOf(location), 1);
  };

  return self;
};

module.exports = Locations;
