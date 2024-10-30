// DO NOT MODIFY THIS FILE

/**
 * Wizards fight to the death.
 * @namespace Magomachy
 */

// This manages the game for you

const GameManager = require(`${__basedir}/joueur/gameManager`);

class MagomachyGameManager extends GameManager {}

MagomachyGameManager.gameVersion = '96137cfaefe2c6ad68ae397a311c3b2ab65fb9223e4f6b5a7ae01fc6d3dd4d9b';

MagomachyGameManager.prototype._gameObjectClasses = {
  GameObject: require('./gameObject'),
  Item: require('./item'),
  Player: require('./player'),
  Tile: require('./tile'),
  Wizard: require('./wizard'),
};

module.exports = MagomachyGameManager;
