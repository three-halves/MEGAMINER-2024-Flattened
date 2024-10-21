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
    this.health = 0;
    this.owner = null;
    this.specialty = '';
    this.speed = 0;
    this.x = 0;
    this.y = 0;

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
   * The x coordinate of the wizard.
   *
   * @type {number}
   */
  get x() {
    return client.gameManager.getMemberValue(this, 'x');
  }

  set x(value) {
    client.gameManager.setMemberValue(this, 'x', value);
  }


  /**
   * The y coordinate of the wizard.
   *
   * @type {number}
   */
  get y() {
    return client.gameManager.getMemberValue(this, 'y');
  }

  set y(value) {
    client.gameManager.setMemberValue(this, 'y', value);
  }



  //<<-- Creer-Merge: functions -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
  // any additional functions you want to add to this class can be preserved here
  //<<-- /Creer-Merge: functions -->>
}

module.exports = Wizard;
