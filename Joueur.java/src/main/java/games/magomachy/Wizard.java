/**
 * The wizard default.
 */

// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify its member variables.
// Instead, you should only be reading its variables and calling its functions.

package games.magomachy;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import org.json.JSONObject;
import joueur.Client;
import joueur.BaseGame;
import joueur.BaseGameObject;

// <<-- Creer-Merge: imports -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
// you can add additional import(s) here
// <<-- /Creer-Merge: imports -->>

/**
 * The wizard default.
 */
public class Wizard extends GameObject {
    /**
     * The amount of spell resources this Player has.
     */
    public int aether;

    /**
     * The attack value of the player.
     */
    public int attack;

    /**
     * The defense value of the player.
     */
    public int defense;

    /**
     * The direction this Wizard is facing.
     */
    public int direction;

    /**
     * The turns remaining on each active effects on Wizard.
     */
    public List<int> effectTimes;

    /**
     * The names of active effects on the Wizard.
     */
    public List<String> effects;

    /**
     * Whether or not this Wizard has cast a spell this turn.
     */
    public boolean hasCast;

    /**
     * Whether or not this Wizard has cast a teleport spell this turn.
     */
    public boolean hasTeleported;

    /**
     * The amount of health this player has.
     */
    public int health;

    /**
     * The spell this wizard just casted. Undefined if no spell was cast.
     */
    public String lastSpell;

    /**
     * The tile this wizard just cast to. Undefined if no tile was targeted.
     */
    public Tile lastTargetTile;

    /**
     * Max health of wizard.
     */
    public int maxHealth;

    /**
     * How much movement the wizard has left.
     */
    public int movementLeft;

    /**
     * The Player that owns and can control this Unit, or null if the Unit is neutral.
     */
    public Player owner;

    /**
     * Specific type of Wizard.
     */
    public String specialty;

    /**
     * The speed of the player.
     */
    public int speed;

    /**
     * Where the wizard has a teleport rune out, undefined otherwise.
     */
    public Tile teleportTile;

    /**
     * The Tile that this Wizard is on.
     */
    public Tile tile;


    // <<-- Creer-Merge: fields -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
    // you can add additional field(s) here. None of them will be tracked or updated by the server.
    // <<-- /Creer-Merge: fields -->>


    /**
     * Creates a new instance of a Wizard. Used during game initialization, do not call directly.
     */
    protected Wizard() {
        super();
        this.effectTimes = new ArrayList<int>();
        this.effects = new ArrayList<String>();
    }

    /**
     * Casts a spell on a Tile in range.
     *
     * @param   spellName  The name of the spell to cast.
     * @param   tile  The Tile to aim the spell toward.
     * @return True if successfully cast, false otherwise.
     */
    public boolean cast(String spellName, Tile tile) {
        JSONObject args = new JSONObject();
        args.put("spellName", Client.getInstance().gameManager.serializeSafe(spellName));
        args.put("tile", Client.getInstance().gameManager.serializeSafe(tile));
        return (boolean)this.runOnServer("cast", args);
    }

    /**
     * Check if a tile can be reached with a projectile spell.
     *
     * @param   tile  The Tile to aim the projectile toward.
     * @return True if Tile can be hit, false otherwise.
     */
    public List<Tile> checkBressenham(Tile tile) {
        JSONObject args = new JSONObject();
        args.put("tile", Client.getInstance().gameManager.serializeSafe(tile));
        return (List<Tile>)this.runOnServer("checkBressenham", args);
    }

    /**
     * Moves this Wizard from its current Tile to another empty Tile.
     *
     * @param   tile  The Tile this Wizard should move to.
     * @return True if it moved, false otherwise.
     */
    public boolean move(Tile tile) {
        JSONObject args = new JSONObject();
        args.put("tile", Client.getInstance().gameManager.serializeSafe(tile));
        return (boolean)this.runOnServer("move", args);
    }


    // <<-- Creer-Merge: methods -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
    // you can add additional method(s) here.
    // <<-- /Creer-Merge: methods -->>
}
