// DO NOT MODIFY THIS FILE

/**
 * Wizards fight to the death.
 * @namespace Magomachy
 */

// This manages the game for you

const GameManager = require(`${__basedir}/joueur/gameManager`);

class MagomachyGameManager extends GameManager {}

MagomachyGameManager.gameVersion = '65acc66b7843108091108f5cbd212836c6c154d3b2bc4c5e186d4a36d35e5257';

MagomachyGameManager.prototype._gameObjectClasses = {
  GameObject: require('./gameObject'),
  Item: require('./item'),
  Player: require('./player'),
  Tile: require('./tile'),
  Wizard: require('./wizard'),
};

module.exports = MagomachyGameManager;
