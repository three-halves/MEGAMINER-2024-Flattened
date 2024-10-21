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
     * The amount of health this player has.
     */
    public int health;

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
     * The x coordinate of the wizard.
     */
    public int x;

    /**
     * The y coordinate of the wizard.
     */
    public int y;


    // <<-- Creer-Merge: fields -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
    // you can add additional field(s) here. None of them will be tracked or updated by the server.
    // <<-- /Creer-Merge: fields -->>


    /**
     * Creates a new instance of a Wizard. Used during game initialization, do not call directly.
     */
    protected Wizard() {
        super();
    }


    // <<-- Creer-Merge: methods -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
    // you can add additional method(s) here.
    // <<-- /Creer-Merge: methods -->>
}
