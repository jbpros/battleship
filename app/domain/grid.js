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
    var positionLocations = self.constructor();
    var remainingLocations = position.size;
    var nextCoordinates = position.startCoordinates;

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

var Grid = function Grid() {
  var emptyLocations = Locations();
  var shipPositions = [];

  var self = {};

  for (var y = 1; y <= Grid.HEIGHT; y++) {
    for (var x = 1; x <= Grid.WIDTH; x++) {
      var location = Location(x, y, self);
      emptyLocations.push(location);
    }
  }

  self.getEmptyLocations = function getEmptyLocations(callback) {
    callback(null, emptyLocations);
  };

  self.getOccupiedLocations = function getOccupiedLocations(callback) {
    var locations = Locations();
    shipPositions.forEach(function (position) {
      position.locations.forEach(function (location) {
        locations.push(location);
      });
    });
    callback(null, locations);
  };

  self.isLocationOccupied = function isLocationOccupied(location, callback) {
    self.getOccupiedLocations(function (err, occupiedLocations) {
      if (err)
        return callback(err);
      var occupiedLocation = occupiedLocations.findLocationByCoordinates(location.toCoordinates());
      callback(null, Boolean(occupiedLocation));
    });
  };

  self.positionShip = function positionShip(startCoordinates, direction, ship, callback) {
    var position = { startCoordinates: startCoordinates, direction: direction, size: ship.getSize() };
    var positionLocations = emptyLocations.findPositionLocations(position);
    if (positionLocations) {
      positionLocations.forEach(function (location) {
        emptyLocations.remove(location);
      });
      shipPositions.push({ship: ship, locations: positionLocations});
      callback(null);
    } else {
      callback(new Error("Ship cannot be positionned there"));
    }
  };

  return self;
};

Grid.WIDTH        = 10;
Grid.HEIGHT       = 10;
Grid.HORIZONTALLY = "horizontally";
Grid.VERTICALLY   = "vertical";

module.exports = Grid;
