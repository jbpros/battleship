Feature: battleship

  - ship position: a set of locations
  - location: X (letter),Y (number) coordinate

  v each player prepares his ship positions
  v decide upon first player
  v first player shoots at a location
  v on miss, the player is notified by "ploof"
  v on hit, the player is notified by "boom"
  * when all locations of a single ship are hit, the player is notified of a sunk by "ka-boom"
  * when all the ships of a player are sunk, the other one wins

  @done @api-done
  Scenario: prepare positions
    When the players prepare their ships
    Then the game is ready to play

  @done @api-done
  Scenario: first player decision
    Given the game is ready
    Then the first player is chosen

  @done @api-wip
  Scenario: player shoots at a location and miss
    Given it's my turn to play
    When I shoot at a location and miss
    Then my opponent announces a "ploof"

  @done
  Scenario: player shoots at a location and hit
    Given it's my turn to play
    When I shoot at a location and hit a ship
    Then my opponent announces a "boom"

  @done
  Scenario: player sinks ship
    Given I've hit every location of a ship but one
    When I shoot at the last location of the ship
    Then my opponent announces a "ka-boom"
