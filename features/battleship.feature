Feature: battleship

  - ship position: a set of locations
  - location: X (letter),Y (number) coordinate

  * each player prepares his ship positions
  * decide upon first player
  * first player shoots at a location
  * on miss, the player is notified by "ploof"
  * on hit, the player is notified by "boom"
  * when all locations of a single ship are hit, the player is notified of a sunk by "ka-boom"
  * when all the ships of a player are sunk, the other one wins

  @done
  Scenario: prepare positions
    When the players prepare their ships
    Then the game is ready to play

  @done
  Scenario: first player decision
    Given the game is ready
    Then the first player is chosen

  @wip
  Scenario: player shoots at a location and miss
    Given it's my turn to play
    When I shoot at a location and miss
    Then I get a "ploof"

  Scenario: player shoots at a location and hit
    Given it's my turn to play
    When I shoot at a location and hit a ship
    Then I get a "boom"
