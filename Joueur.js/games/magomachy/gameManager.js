// DO NOT MODIFY THIS FILE

/**
 * Wizards fight to the death.
 * @namespace Magomachy
 */

// This manages the game for you

const GameManager = require(`${__basedir}/joueur/gameManager`);

class MagomachyGameManager extends GameManager {}

MagomachyGameManager.gameVersion = '3a46f9aec2408eb04871642e3f1f986ce612791807a5dc2fcf3289ce462669ae';

MagomachyGameManager.prototype._gameObjectClasses = {
  GameObject: require('./gameObject'),
  Item: require('./item'),
  Player: require('./player'),
  Tile: require('./tile'),
  Wizard: require('./wizard'),
};

module.exports = MagomachyGameManager;
