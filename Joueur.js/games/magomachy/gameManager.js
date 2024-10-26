// DO NOT MODIFY THIS FILE

/**
 * Wizards fight to the death.
 * @namespace Magomachy
 */

// This manages the game for you

const GameManager = require(`${__basedir}/joueur/gameManager`);

class MagomachyGameManager extends GameManager {}

MagomachyGameManager.gameVersion = '77505b71a8b9f75455f9f5fec932c1959810e1ad9f6ddce1fab318c55b71b79f';

MagomachyGameManager.prototype._gameObjectClasses = {
  GameObject: require('./gameObject'),
  Item: require('./item'),
  Player: require('./player'),
  Tile: require('./tile'),
  Wizard: require('./wizard'),
};

module.exports = MagomachyGameManager;
