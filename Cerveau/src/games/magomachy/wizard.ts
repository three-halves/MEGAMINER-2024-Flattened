import { BaseGameObjectRequiredData } from "~/core/game";
import { Tile, WizardConstructorArgs } from "./";
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

    public tile(): Tile
    {
        return this.game.tiles[this.y * this.game.mapWidth + this.x];
    }

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

        const reason = this.invalidate(player);
        if (reason) {
            return reason;
        }

        if (!this.tile()) {
           throw new Error('${this} has no Tile to target!');
        }

        // Calculate distance of target tile
        const dx = this.y - tile.x;
        const dy = this.x - tile.y;
        const distSq = dx * dx + dy * dy;

        // And now handle each spell in its own case
        switch(spellName) {
            case "Punch": {
                if (!tile.wizard) {
                    return 'Curses! The enemy wizard isn\'t at ${tile}!';
                }
                if (tile.wizard == this) {
                    return 'You\'re a wizard, why would you be dumb enough to punch yourself?!';
                }
                if (distSq > 1) {
                    return '${tile} is too far away for your wimpy wizard arms to reach!';
                }
                break;
            }
            default: {
                throw new Error("I've never heard of that spell...");
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
    protected async cast(
        player: Player,
        spellName: string,
        tile: Tile,
    ): Promise<boolean> {
        // ADD THE CREER MERGE COMMENT HERE TOO AUUGHH

        // Process each spell separately
        switch(spellName) { 
            case "Punch": {
                // Throws a crappy wizard punch within 1 range.
                tile.wizard!.health -= 1;
                break; 
            } 
            default: { 
                throw new Error("invalid spell cast");
                break; 
            } 
        }

        return true;
    }

    /**
     * Invalidation function for move. Try to find a reason why the passed in
     * parameters are invalid, and return a human readable string telling them
     * why it is invalid.
     * 
     * @param player: The player that called this.
     * @param tile: The Tile that this Wizard should move to.
     * @returns If the arguments are invalid, return a string explainig to
     * human players why it is invalid. If it is valid return nothing, or an
     * object with new arguments to use in the actual function.
     */
    protected invalidateMove(
        player: Player,
        tile: Tile,
    ): void | string | WizardMoveArgs {
        // COMMENT MERGE CREER HERE

        const reason = this.invalidate(player);
        if (reason) {
            return reason;
        }

        // TODO: add variables tracking whether unit moved/cast spell or not each turn
        if (!this.tile()) {
            throw new Error('${this} has no Tile!');
        }

        // Calculate distance of target tile
        const dx = this.x - tile.x;
        const dy = this.y - tile.y;
        const distSq = dx * dx + dy * dy;

        if (distSq > this.speed ** 2) {
            return '${tile} is too far away to reach this turn!';
        }

        if (tile.type === "wall") {
            return '${this} can\'t phase through walls! (Yet...)';
        }

        if (tile.wizard) {
            return '${tile} is occupied by a wizard!';
        }
    }

    /**
     * Moves this Wizard from its current Tile to another empty Tile.
     *
     * @param player - The player that called this.
     * @param tile - The Tile this Wizard should move to.
     * @returns True if it moved, false otherwise.
     */
    protected async move(player: Player, tile: Tile): Promise<boolean> {
        if (!this.tile) {
            throw new Error('${this} has no Tile to move from!');
        }

        this.tile().wizard = undefined;
        this.x = tile.x;
        this.y = tile.y;
        this.tile().wizard = this;
        // TODO: UPDATE VARIABLE STATING HOW MUCH MOVEMENT LEFT

        return true;
    }
        
    // <<-- /Creer-Merge: public-functions -->>

    // <<-- Creer-Merge: protected-private-functions -->>

    // Any additional protected or pirate methods can go here.
    /**
     * Trues to invalidate args for an action function
     *
     * @param player - The player calling the action.
     * @returns The reason this is invalid, undefined if it looks valid so far.
     */
    private invalidate(
        player: Player,
    ): string | undefined {
        if (!player || player != this.game.currentPlayer) {
            return 'It is not your turn, young ${player}!';
        }
        if (this.owner != player) {
            return 'Wrong wizard, ${player}.';
        }
    }
    
    // <<-- /Creer-Merge: protected-private-functions -->>
}
