import { BaseGameObjectRequiredData } from "~/core/game";
import { WizardConstructorArgs } from "./";
import { GameObject } from "./game-object";
import { Player } from "./player";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * Specific type of Wizard.
 */
export type WizardSpecialty =
    | "aggressive"
    | "defensive"
    | "sustaining"
    | "strategic";

/**
 * The wizard default.
 */
export class Wizard extends GameObject {
    /**
     * The amount of spell resources this Player has.
     */
    public aether!: number;

    /**
     * The attack value of the player.
     */
    public attack!: number;

    /**
     * The defense value of the player.
     */
    public defense!: number;

    /**
     * The amount of health this player has.
     */
    public health!: number;

    /**
     * The Player that owns and can control this Unit, or undefined if the Unit
     * is neutral.
     */
    public owner?: Player;

    /**
     * Specific type of Wizard.
     */
    public readonly specialty!:
        | "aggressive"
        | "defensive"
        | "sustaining"
        | "strategic";

    /**
     * The speed of the player.
     */
    public speed!: number;

    /**
     * The x coordinate of the wizard.
     */
    public x!: number;

    /**
     * The y coordinate of the wizard.
     */
    public y!: number;

    // <<-- Creer-Merge: attributes -->>

    // Any additional member attributes can go here
    // NOTE: They will not be sent to the AIs, those must be defined
    // in the creer file.

    // <<-- /Creer-Merge: attributes -->>

    /**
     * Called when a Wizard is created.
     *
     * @param args - Initial value(s) to set member variables to.
     * @param required - Data required to initialize this (ignore it).
     */
    constructor(
        args: WizardConstructorArgs<{
            // <<-- Creer-Merge: constructor-args -->>
            // You can add more constructor args in here
            // <<-- /Creer-Merge: constructor-args -->>
        }>,
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

    // SIGH
    // I'm gonna store the spells here initially, but they will
    // have to be copied into the right place after the creer
    // program is run again.
    /**
     * Invalidation function for cast. Try to find a reason why the passed in
     * parameters are invalid, and return a human readable string telling them
     * why it is invalid.
     * 
     * @param player - The player that called this.
     * @param spellName - The name of the spell to cast.
     * @param tile - The Tile to aim the spell toward.
     * @returns If the arguments are invalid, return a string explaining to
     * human players why it is invalid. If it is valid return nothing, or an
     * object with new arguments to us in the actual function.
     */
    protected invalidateCast(
        player: Player,
        spellName: string,
        tile: Tile,
    ): void | string | WizardCastArgs {
        // NOTE: RE ADD THE CREER MERGE COMMENT HERE

        const reason = this.invalidate(player, true);
        if (reason) {
            return reason;
        }

        if (!this.tile) {
           throw new Error('${this} has no Tile to target!');
        }

        // Calculate distance of target tile
        const dx = this.tile.x - tile.x;
        const dy = this.tile.y - tile.y;
        const distSq = dx * dx + dy * dy;

        // And now handle each spell in its own case
        switch(spellName) {
            case "Punch": {
                if (!tile.wizard) {
                    return 'Curses! The enemy wizard isn't at ${tile}!';
                }
                if (tile.wizard == this) {
                    return 'You're a wizard, why would you be dumb enough to punch yourself?!';
                }
                if (distSq > 1) {
                    return '${tile} is too far away for your wimpy wizard arms to reach!';
                }
            }
            default: {
                throw new error("I've never heard of that spell...");
            }
        }

        // TODO: literally all the other cases,
        // One per spell. Yeah. Have fun.
        // Things I can think of:
        // - Casting spell on themself.
        // - Missing tile.
        // - Not in range.
        // - Don't have access to the spell.
        // - No target on tile.
    }

    /**
     * Casts a spell on a Tile in range.
     * 
     * @param player: The player that called this.
     * @param spellName: The name of the spell to cast.
     * @param tile: The Tile to aim the spell toward.
     * @returns True if successfully cast, false otherwise.
     */
    protected async attack(
        player: Player,
        spellName: string,
        tile: Tile,
    ): Promise<boolean> {
        // ADD THE CREER MERGE COMMENT HERE TOO AUUGHH

        // Process each spell separately
        switch(spellName) { 
            case "Punch": {
                // Throws a crappy wizard punch within 1 range.
                tile.wizard.health -= 1;
                break; 
            } 
            default: { 
                throw new Error("invalid spell cast");
                break; 
            } 
        }

        return true;
    }
    // <<-- /Creer-Merge: public-functions -->>

    // <<-- Creer-Merge: protected-private-functions -->>

    // Any additional protected or pirate methods can go here.

    // <<-- /Creer-Merge: protected-private-functions -->>
}
