var Player = function Player() {
  var self = {
    shootAtLocation: function shootAtLocation(location, callback) {
      callback();
    },

    missed: function missed() {
      return true;
    }
  };
  return self;
};

module.exports = Player;
