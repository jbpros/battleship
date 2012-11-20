var Player = require("../app/domain/player");

describe(Player, function () {

  describe("#shootAtCoordinates", function () {
    var coordinates, callback, player, opponent, grid;

    beforeEach(function () {
      coordinates = createSpy("coordinates");
      callback    = createSpy("callback");
      grid        = createSpy("grid");
      player      = Player(grid);
      opponent    = createSpyObj("opponent player", ["undergoShotAtCoordinates"]);
      player.meetOpponent(opponent);
    });

    it("makes the opponent undergo a shot at the coordinates", function () {
      player.shootAtCoordinates(coordinates, callback);
      expect(opponent.undergoShotAtCoordinates).toHaveBeenCalledWith(coordinates, any(Function));
    });

    describe("anonymous function", function () {
      var anonFunction, result;

      beforeEach(function() {
        player.shootAtCoordinates(coordinates, callback);
        anonFunction = opponent.undergoShotAtCoordinates.mostRecentCall.args[1];
        result = createSpy("shot result");
      });

      it("calls back with the result announced by the opponent", function () {
        anonFunction(null, result);
        expect(callback).toHaveBeenCalledWith(null);
      });

    });
  });

});