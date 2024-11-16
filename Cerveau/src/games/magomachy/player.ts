import { BaseGameObjectRequiredData } from "~/core/game";
import {
    BaseMagomachyPlayer,
    PlayerChooseWizardArgs,
    PlayerConstructorArgs,
} from "./";
import { AI } from "./ai";
import { GameObject } from "./game-object";
import { Player } from "./player";
import { Wizard } from "./wizard";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A player in this game. Every AI controls one player.
 */
export class Player extends GameObject implements BaseMagomachyPlayer {
    /** The AI controlling this Player. */
    public readonly ai!: AI;

    /**
     * What type of client this is, e.g. 'Python', 'JavaScript', or some other
     * language. For potential data mining purposes.
     */
    public readonly clientType!: string;

    /**
     * If the player lost the game or not.
     */
    public lost!: boolean;

    /**
     * The name of the player.
     */
    public readonly name!: string;

    /**
     * This player's opponent in the game.
     */
    public readonly opponent!: Player;

    /**
     * The reason why the player lost the game.
     */
    public reasonLost!: string;

    /**
     * The reason why the player won the game.
     */
    public reasonWon!: string;

    /**
     * The amount of time (in ns) remaining for this AI to send commands.
     */
    public timeRemaining!: number;

    /**
     * The specific wizard owned by the player.
     */
    public wizard!: Wizard;

    /**
     * If the player won the game or not.
     */
    public won!: boolean;

    // <<-- Creer-Merge: attributes -->>

    // Any additional member attributes can go here
    // NOTE: They will not be sent to the AIs, those must be defined
    // in the creer file.

    /**
     * The choice of wizard the player wants.
     */
    public wizardChoice?: WizardSpecialty;

    // <<-- /Creer-Merge: attributes -->>

    /**
     * Called when a Player is created.
     *
     * @param args - Initial value(s) to set member variables to.
     * @param required - Data required to initialize this (ignore it).
     */
    constructor(
        // never directly created by game developers
        args: PlayerConstructorArgs,
        required: Readonly<BaseGameObjectRequiredData>,
    ) {
        super(args, required);

        // <<-- Creer-Merge: constructor -->>
        // setup any thing you need here
        // <<-- /Creer-Merge: constructor -->>
    }

    // <<-- Creer-Merge: public-functions -->>

    // Any public functions can go here for other things in the game to use.
    // NOTE: Client AIs cannot call these functions, those must be defined
    // in the creer file.
    public health(): number {
        return this.wizard.health;
    }

    public aether(): number {
        return this.wizard.aether;
    }

    // <<-- /Creer-Merge: public-functions -->>

    /**
     * Invalidation function for chooseWizard. Try to find a reason why the
     * passed in parameters are invalid, and return a human readable string
     * telling them why it is invalid.
     *
     * @param player - The player that called this.
     * @param wizardClass - The class of wizard the player wants.
     * @returns If the arguments are invalid, return a string explaining to
     * human players why it is invalid. If it is valid return nothing, or an
     * object with new arguments to use in the actual function.
     */
    protected invalidateChooseWizard(
        player: Player,
        wizardClass: string,
    ): void | string | PlayerChooseWizardArgs {
        // <<-- Creer-Merge: invalidate-chooseWizard -->>

        // Check all the arguments for chooseWizard here and try to
        // return a string explaining why the input is wrong.
        // If you need to change an argument for the real function, then
        // changing its value in this scope is enough.


		// This is how we print a map for the human client.
		// It's a terrible way of doing it but Creer has been acting up so
		// not much of a choice...
        if (this.wizardChoice || wizardClass === "map") {
            //return 'You are already a ${wizardChoice}';
            // Nope, for now this is how you print a tilemap:
            var tilemap: string[] = [];
            // TLDR:
            // WIZARDS:
            // A: aggressive mage
            // D: defensive mage
            // U: sustaining mage (he's sus, monkaS)
            // S: strategic mage
            // ITEMS:
            // h: health
            // a: aether
            // e: explosion rune
            // r: healing rune
            // t: teleport rune
            // [a number]: charge rune turns before explosion
            // s: stone
            // TILES
            // #: wall
            // .: floor
            // x: Wizard 1 spawn
            // y: Wizard 2 spawn
            tilemap.push("  ");
            for (let k=0; k < this.game.mapWidth; k++) {
                tilemap.push(k.toString());
                tilemap.push(" ");
            }
            tilemap.push("\n");
            for (let i=0; i < this.game.mapHeight; i++) {
                tilemap.push(i.toString());
                tilemap.push(" ")
                for (let j=0; j < this.game.mapWidth; j++) {
                    const tile = this.game.tiles[i*this.game.mapWidth + j];
                    if (tile.wizard) {
                        if (tile.wizard!.specialty == "aggressive") {
                            tilemap.push("A");
                        }
                        else if (tile.wizard!.specialty == "defensive") {
                            tilemap.push("D");
                        }
                        else if (tile.wizard!.specialty == "sustaining") {
                            tilemap.push("U");
                        }
                        else {
                            tilemap.push("S");
                        }
                    }
                    else if (tile.object) {
                        if (tile.object!.form == "health flask") {
                            tilemap.push("h");
                        }
                        else if (tile.object!.form == "aether flask") {
                            tilemap.push("a");
                        }
                        else if (tile.object!.form == "explosion rune") {
                            tilemap.push("e");
                        }
                        else if (tile.object!.form == "heal rune") {
                            tilemap.push("r");
                        }
                        else if (tile.object!.form == "teleport rune") {
                            tilemap.push("t");
                        }
                        else if (tile.object!.form == "charge rune") {
                            let turnsLeft = tile.object!.max_life! - tile.object!.lifetime;
                            tilemap.push(Math.min(turnsLeft,9).toString());
                        }
                        else if (tile.object!.form == "stone") {
                            tilemap.push("s");
                        }
                    }
                    else if (tile === this.game.wizard1_tile) {
                        tilemap.push("x");
                    }
                    else if (tile === this.game.wizard2_tile) {
                        tilemap.push("y");
                    }
                    else
                    {
                        if (tile.type == "wall") {
                            tilemap.push("#");
                        }
                        else {
                            tilemap.push(".")
                        }
                    }
                    tilemap.push(" ")
                }
                tilemap.push("\n");
            }
            return "\n" + tilemap.join("");
        }
        
		// Make sure valid wizard type is chosen
        if (wizardClass !== "aggressive"
            && wizardClass !== "defensive"
            && wizardClass !== "sustaining"
            && wizardClass !== "strategic") {
            return '${wizardClass} is not a valid wizard choice!';
        }

		// In case someone tries to pick a wizard early
        if (this != this.game.currentPlayer) {
            return `It is not your turn!`;
        }
        
        return undefined; // means nothing could be found that was ivalid.

        // <<-- /Creer-Merge: invalidate-chooseWizard -->>
    }

    /**
     * This is called when you need to pick your wizard class.
     *
     * @param player - The player that called this.
     * @param wizardClass - The class of wizard the player wants.
     * @returns True if class successfully chosen, false otherwise.
     */
    protected async chooseWizard(
        player: Player,
        wizardClass: string,
    ): Promise<boolean> {
        // <<-- Creer-Merge: chooseWizard -->>

        // Add logic here for chooseWizard.

        // This is literally all it does, check game manager for more details
		// on how we spawn wizards.
        this.wizardChoice = wizardClass as WizardSpecialty;
        return true;

        // <<-- /Creer-Merge: chooseWizard -->>
    }

    // <<-- Creer-Merge: protected-private-functions -->>

    // Any additional protected or pirate methods can go here.

    // <<-- /Creer-Merge: protected-private-functions -->>
}
