// Item: Objects that help the players.

// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify its member variables.
// Instead, you should only be reading its variables and calling its functions.

const client = require(`${__basedir}/joueur/client`);
const GameObject = require('./gameObject');

//<<-- Creer-Merge: requires -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
// any additional requires you want can be required here safely between creer runs
//<<-- /Creer-Merge: requires -->>

/**
 * Objects that help the players.
 * @extends Magomachy.GameObject
 * @memberof Magomachy
 */
class Item extends GameObject {
  /**
   * Initializes a Item with basic logic as provided by the Creer code generator.
   * 
   * Never use this directly. It is for internal Joueur use.
   */
  constructor(...args) {
    super(...args);


    // The following values should get overridden when delta states are merged, but we set them here as a reference for you to see what variables this class has.

    // default values for private member values
    this.form = '';
    this.lifetime = 0;
    this.maxLife = 0;
    this.objectSpawn = '';
    this.spawnTimer = 0;
    this.tile = null;

    //<<-- Creer-Merge: init -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
    // any additional init logic you want can go here
    //<<-- /Creer-Merge: init -->>
  }


  // Member variables

  /**
   * The type of Item this is.
   *
   * @type {string}
   */
  get form() {
    return client.gameManager.getMemberValue(this, 'form');
  }

  set form(value) {
    client.gameManager.setMemberValue(this, 'form', value);
  }


  /**
   * How many turns this item has existed for.
   *
   * @type {number}
   */
  get lifetime() {
    return client.gameManager.getMemberValue(this, 'lifetime');
  }

  set lifetime(value) {
    client.gameManager.setMemberValue(this, 'lifetime', value);
  }


  /**
   * How long the item is allowed to last for.
   *
   * @type {number}
   */
  get maxLife() {
    return client.gameManager.getMemberValue(this, 'maxLife');
  }

  set maxLife(value) {
    client.gameManager.setMemberValue(this, 'maxLife', value);
  }


  /**
   * What item spawns on this tile.
   *
   * @type {string}
   */
  get objectSpawn() {
    return client.gameManager.getMemberValue(this, 'objectSpawn');
  }

  set objectSpawn(value) {
    client.gameManager.setMemberValue(this, 'objectSpawn', value);
  }


  /**
   * Turns until item should spawn.
   *
   * @type {number}
   */
  get spawnTimer() {
    return client.gameManager.getMemberValue(this, 'spawnTimer');
  }

  set spawnTimer(value) {
    client.gameManager.setMemberValue(this, 'spawnTimer', value);
  }


  /**
   * The Tile this Item is on.
   *
   * @type {Magomachy.Tile}
   */
  get tile() {
    return client.gameManager.getMemberValue(this, 'tile');
  }

  set tile(value) {
    client.gameManager.setMemberValue(this, 'tile', value);
  }



  //<<-- Creer-Merge: functions -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
  // any additional functions you want to add to this class can be preserved here
  //<<-- /Creer-Merge: functions -->>
}

module.exports = Item;
