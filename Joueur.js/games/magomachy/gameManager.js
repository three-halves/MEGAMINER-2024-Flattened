// DO NOT MODIFY THIS FILE

/**
 * Wizards fight to the death.
 * @namespace Magomachy
 */

// This manages the game for you

const GameManager = require(`${__basedir}/joueur/gameManager`);

class MagomachyGameManager extends GameManager {}

MagomachyGameManager.gameVersion = '7e4209e4378ecb736bd3bcca015d81c33a466dbe23f47e4f0fdb78ce997209da';

MagomachyGameManager.prototype._gameObjectClasses = {
  GameObject: require('./gameObject'),
  Item: require('./item'),
  Player: require('./player'),
  Tile: require('./tile'),
  Wizard: require('./wizard'),
};

module.exports = MagomachyGameManager;
