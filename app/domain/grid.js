var Locations = require("./locations");
var Location = require("./location");

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

  self.areCoordinatesOccupied = function areCoordinatesOccupied(coordinates, callback) {
    self.getOccupiedLocations(function (err, occupiedLocations) {
      if (err)
        return callback(err);
      var occupiedLocation = occupiedLocations.findLocationByCoordinates(coordinates);
      callback(null, Boolean(occupiedLocation));
    });
  };

  self.findPositionAtCoordinates = function findPositionAtCoordinates(coordinates, callback) {
    for (var i = 0; i < shipPositions.length; i++) {
      var position = shipPositions[i];
      var location = position.locations.findLocationByCoordinates(coordinates);
      if (location)
        return callback(null, position);
    }
    callback(null, null);
  };

  self.positionShip = function positionShip(startCoordinates, direction, ship, callback) {
    var position = { startCoordinates: startCoordinates, direction: direction, size: ship.getSize() };
    var positionLocations = emptyLocations.findPositionLocations(position);
    if (positionLocations) {
      positionLocations.forEach(function (location) {
        emptyLocations.remove(location);
      });
      shipPositions.push({ship: ship, locations: positionLocations, hitLocations: Locations()});
      callback(null);
    } else {
      callback(new Error("Ship cannot be positionned there"));
    }
  };

  self.hitAtCoordinates = function hitAtCoordinates(coordinates, callback) {
    self.findPositionAtCoordinates(coordinates, function(err, shipPosition) {
      if (err)
        return callback(err);

      if (!shipPosition)
        return callback(new Error("No ship to hit there"));

      // check if location was hit already
      if (!shipPosition.hitLocations.findLocationByCoordinates(coordinates)) {
        var location = shipPosition.locations.findLocationByCoordinates(coordinates);
        shipPosition.hitLocations.push(location);
      }
      callback(null);
    });

  };

  self.isShipAtCoordinatesSunk = function isShipAtCoordinatesSunk(coordinates, callback) {
    self.findPositionAtCoordinates(coordinates, function(err, shipPosition) {
      if (err)
        return callback(err);

      var sunk = shipPosition && (shipPosition.hitLocations.length == shipPosition.locations.length);
      callback (err, sunk);
    });
  };

  return self;
};

Grid.WIDTH        = 10;
Grid.HEIGHT       = 10;
Grid.HORIZONTALLY = "horizontally";
Grid.VERTICALLY   = "vertical";

module.exports = Grid;
