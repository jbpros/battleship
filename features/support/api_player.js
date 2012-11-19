var url = require("url");
var request = require("request");

var ApiPlayer = function ApiPlayer(host, port) {
  var lastShotResult, opponent;

  var PROTOCOL = "http";
  var SHOOT_RESOURCE_NAME = "shoots";
  var SHOOT_RESOURCE_PATHNAME = "/shoots";

  var self = {
    getUriToResource: function getUriToResource(resource) {
      var pathname;

      if (resource == SHOOT_RESOURCE_NAME)
        pathname = SHOOT_RESOURCE_PATHNAME;
      else
        throw new Error("Unknown resource");

      return url.format({protocol: PROTOCOL, hostname: host, port: port, pathname: pathname});
    },

    meetOpponent: function meetOpponent(newOpponent) {
      opponent = newOpponent;
    },

    shootAtCoordinates: function shootAtCoordinates(coordinates, callback) {
      var shootUri = opponent.getUriToResource(SHOOT_RESOURCE_NAME);
      request.post(shootUri, function (err, res, body) {
        // ....
        callback(new Error("TODO: finish me"));
      });
    },
  };

  return self;
};

module.exports = {ApiPlayer: ApiPlayer};
