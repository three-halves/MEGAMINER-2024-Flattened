// Wizard: The wizard default.

// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify its member variables.
// Instead, you should only be reading its variables and calling its functions.

const client = require(`${__basedir}/joueur/client`);
const GameObject = require('./gameObject');

//<<-- Creer-Merge: requires -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
// any additional requires you want can be required here safely between creer runs
//<<-- /Creer-Merge: requires -->>

/**
 * The wizard default.
 * @extends Magomachy.GameObject
 * @memberof Magomachy
 */
class Wizard extends GameObject {
  /**
   * Initializes a Wizard with basic logic as provided by the Creer code generator.
   * 
   * Never use this directly. It is for internal Joueur use.
   */
  constructor(...args) {
    super(...args);


    // The following values should get overridden when delta states are merged, but we set them here as a reference for you to see what variables this class has.

    // default values for private member values
    this.aether = 0;
    this.attack = 0;
    this.defense = 0;
    this.direction = 0;
    this.effectTimes = [];
    this.effects = [];
    this.hasCast = false;
    this.hasTeleported = false;
    this.health = 0;
    this.lastSpell = '';
    this.lastTargetTile = null;
    this.maxHealth = 0;
    this.movementLeft = 0;
    this.owner = null;
    this.specialty = '';
    this.speed = 0;
    this.teleportTile = null;
    this.tile = null;

    //<<-- Creer-Merge: init -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
    // any additional init logic you want can go here
    //<<-- /Creer-Merge: init -->>
  }


  // Member variables

  /**
   * The amount of spell resources this Player has.
   *
   * @type {number}
   */
  get aether() {
    return client.gameManager.getMemberValue(this, 'aether');
  }

  set aether(value) {
    client.gameManager.setMemberValue(this, 'aether', value);
  }


  /**
   * The attack value of the player.
   *
   * @type {number}
   */
  get attack() {
    return client.gameManager.getMemberValue(this, 'attack');
  }

  set attack(value) {
    client.gameManager.setMemberValue(this, 'attack', value);
  }


  /**
   * The defense value of the player.
   *
   * @type {number}
   */
  get defense() {
    return client.gameManager.getMemberValue(this, 'defense');
  }

  set defense(value) {
    client.gameManager.setMemberValue(this, 'defense', value);
  }


  /**
   * The direction this Wizard is facing.
   *
   * @type {number}
   */
  get direction() {
    return client.gameManager.getMemberValue(this, 'direction');
  }

  set direction(value) {
    client.gameManager.setMemberValue(this, 'direction', value);
  }


  /**
   * The turns remaining on each active effects on Wizard.
   *
   * @type {Array.<number>}
   */
  get effectTimes() {
    return client.gameManager.getMemberValue(this, 'effectTimes');
  }

  set effectTimes(value) {
    client.gameManager.setMemberValue(this, 'effectTimes', value);
  }


  /**
   * The names of active effects on the Wizard.
   *
   * @type {Array.<string>}
   */
  get effects() {
    return client.gameManager.getMemberValue(this, 'effects');
  }

  set effects(value) {
    client.gameManager.setMemberValue(this, 'effects', value);
  }


  /**
   * Whether or not this Wizard has cast a spell this turn.
   *
   * @type {boolean}
   */
  get hasCast() {
    return client.gameManager.getMemberValue(this, 'hasCast');
  }

  set hasCast(value) {
    client.gameManager.setMemberValue(this, 'hasCast', value);
  }


  /**
   * Whether or not this Wizard has cast a teleport spell this turn.
   *
   * @type {boolean}
   */
  get hasTeleported() {
    return client.gameManager.getMemberValue(this, 'hasTeleported');
  }

  set hasTeleported(value) {
    client.gameManager.setMemberValue(this, 'hasTeleported', value);
  }


  /**
   * The amount of health this player has.
   *
   * @type {number}
   */
  get health() {
    return client.gameManager.getMemberValue(this, 'health');
  }

  set health(value) {
    client.gameManager.setMemberValue(this, 'health', value);
  }


  /**
   * The spell this wizard just casted. Undefined if no spell was cast.
   *
   * @type {string}
   */
  get lastSpell() {
    return client.gameManager.getMemberValue(this, 'lastSpell');
  }

  set lastSpell(value) {
    client.gameManager.setMemberValue(this, 'lastSpell', value);
  }


  /**
   * The tile this wizard just cast to. Undefined if no tile was targeted.
   *
   * @type {Magomachy.Tile}
   */
  get lastTargetTile() {
    return client.gameManager.getMemberValue(this, 'lastTargetTile');
  }

  set lastTargetTile(value) {
    client.gameManager.setMemberValue(this, 'lastTargetTile', value);
  }


  /**
   * Max health of wizard.
   *
   * @type {number}
   */
  get maxHealth() {
    return client.gameManager.getMemberValue(this, 'maxHealth');
  }

  set maxHealth(value) {
    client.gameManager.setMemberValue(this, 'maxHealth', value);
  }


  /**
   * How much movement the wizard has left.
   *
   * @type {number}
   */
  get movementLeft() {
    return client.gameManager.getMemberValue(this, 'movementLeft');
  }

  set movementLeft(value) {
    client.gameManager.setMemberValue(this, 'movementLeft', value);
  }


  /**
   * The Player that owns and can control this Unit, or null if the Unit is neutral.
   *
   * @type {Magomachy.Player}
   */
  get owner() {
    return client.gameManager.getMemberValue(this, 'owner');
  }

  set owner(value) {
    client.gameManager.setMemberValue(this, 'owner', value);
  }


  /**
   * Specific type of Wizard.
   *
   * @type {string}
   */
  get specialty() {
    return client.gameManager.getMemberValue(this, 'specialty');
  }

  set specialty(value) {
    client.gameManager.setMemberValue(this, 'specialty', value);
  }


  /**
   * The speed of the player.
   *
   * @type {number}
   */
  get speed() {
    return client.gameManager.getMemberValue(this, 'speed');
  }

  set speed(value) {
    client.gameManager.setMemberValue(this, 'speed', value);
  }


  /**
   * Where the wizard has a teleport rune out, undefined otherwise.
   *
   * @type {Magomachy.Tile}
   */
  get teleportTile() {
    return client.gameManager.getMemberValue(this, 'teleportTile');
  }

  set teleportTile(value) {
    client.gameManager.setMemberValue(this, 'teleportTile', value);
  }


  /**
   * The Tile that this Wizard is on.
   *
   * @type {Magomachy.Tile}
   */
  get tile() {
    return client.gameManager.getMemberValue(this, 'tile');
  }

  set tile(value) {
    client.gameManager.setMemberValue(this, 'tile', value);
  }



  /**
   * Casts a spell on a Tile in range.
   *
   * @param {string} spellName - The name of the spell to cast.
   * @param {Magomachy.Tile} tile - The Tile to aim the spell toward.
   * @returns {boolean} - True if successfully cast, false otherwise.
   */
  cast(spellName, tile) {
    return client.runOnServer(this, 'cast', {
      spellName: spellName,
      tile: tile,
    });
  }


  /**
   * Check if a tile can be reached with a projectile spell.
   *
   * @param {Magomachy.Tile} tile - The Tile to aim the projectile toward.
   * @returns {Array.<Magomachy.Tile>} - True if Tile can be hit, false otherwise.
   */
  checkBressenham(tile) {
    return client.runOnServer(this, 'checkBressenham', {
      tile: tile,
    });
  }


  /**
   * Moves this Wizard from its current Tile to another empty Tile.
   *
   * @param {Magomachy.Tile} tile - The Tile this Wizard should move to.
   * @returns {boolean} - True if it moved, false otherwise.
   */
  move(tile) {
    return client.runOnServer(this, 'move', {
      tile: tile,
    });
  }


  //<<-- Creer-Merge: functions -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
  // any additional functions you want to add to this class can be preserved here
  //<<-- /Creer-Merge: functions -->>
}

module.exports = Wizard;
