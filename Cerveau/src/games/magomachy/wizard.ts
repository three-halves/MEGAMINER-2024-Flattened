import { BaseGameObjectRequiredData } from "~/core/game";
import { WizardCastArgs, WizardConstructorArgs, WizardMoveArgs } from "./";
import { GameObject } from "./game-object";
import { Player } from "./player";
import { Tile } from "./tile";

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
     * The direction this Wizard is facing.
     */
    public direction!: number;

    /**
     * The turns remaining on each active effects on Wizard.
     */
    public effectTimes!: number[];

    /**
     * The names of active effects on the Wizard.
     */
    public effects!: string[];

    /**
     * Whether or not this Wizard has cast a spell this turn.
     */
    public hasCast!: boolean;

    /**
     * The amount of health this player has.
     */
    public health!: number;

    /**
     * How much movement the wizard has left.
     */
    public movementLeft!: number;

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
     * The Tile that this Wizard is on.
     */
    public tile?: Tile;

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
        
    // <<-- /Creer-Merge: public-functions -->>

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
     * object with new arguments to use in the actual function.
     */
    protected invalidateCast(
        player: Player,
        spellName: string,
        tile: Tile,
    ): void | string | WizardCastArgs {
        // <<-- Creer-Merge: invalidate-cast -->>
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

        // Check all the arguments for cast here and try to
        // return a string explaining why the input is wrong.
        // If you need to change an argument for the real function, then
        // changing its value in this scope is enough.
        return undefined; // means nothing could be found that was ivalid.

        // <<-- /Creer-Merge: invalidate-cast -->>
    }

    /**
     * Casts a spell on a Tile in range.
     *
     * @param player - The player that called this.
     * @param spellName - The name of the spell to cast.
     * @param tile - The Tile to aim the spell toward.
     * @returns True if successfully cast, false otherwise.
     */
    protected async cast(
        player: Player,
        spellName: string,
        tile: Tile,
    ): Promise<boolean> {
        // <<-- Creer-Merge: cast -->>

        // Add logic here for cast.

        // TODO: replace this with actual logic
                // Process each spell separately
        switch(spellName) { 
            case "Punch": {
                // Throws a crappy wizard punch within 1 range.
                tile.wizard!.health -= 1;
                return true;
                break; 
            } 
            default: { 
                throw new Error("invalid spell cast");
                break; 
            } 
        }
        
        return false;

        // <<-- /Creer-Merge: cast -->>
    }

    /**
     * Invalidation function for move. Try to find a reason why the passed in
     * parameters are invalid, and return a human readable string telling them
     * why it is invalid.
     *
     * @param player - The player that called this.
     * @param tile - The Tile this Wizard should move to.
     * @returns If the arguments are invalid, return a string explaining to
     * human players why it is invalid. If it is valid return nothing, or an
     * object with new arguments to use in the actual function.
     */
    protected invalidateMove(
        player: Player,
        tile: Tile,
    ): void | string | WizardMoveArgs {
        // <<-- Creer-Merge: invalidate-move -->>

        // Check all the arguments for move here and try to
        // return a string explaining why the input is wrong.
        // If you need to change an argument for the real function, then
        // changing its value in this scope is enough.
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

        // This needs to be changed
        //if (distSq > this.speed ** 2) {
        //    return '${tile} is too far away to reach this turn!';
        //}

        if (tile.type === "wall") {
            return '${this} can\'t phase through walls! (Yet...)';
        }

        if (tile.wizard) {
            return '${tile} is occupied by a wizard!';
        }
        return undefined; // means nothing could be found that was ivalid.

        // <<-- /Creer-Merge: invalidate-move -->>
    }

    /**
     * Moves this Wizard from its current Tile to another empty Tile.
     *
     * @param player - The player that called this.
     * @param tile - The Tile this Wizard should move to.
     * @returns True if it moved, false otherwise.
     */
    protected async move(player: Player, tile: Tile): Promise<boolean> {
        // <<-- Creer-Merge: move -->>

        // Add logic here for move.

        // TODO: replace this with actual logic
        if (!this.tile) {
            throw new Error('${this} has no Tile to move from!');
            return false;
        }

        this.tile().wizard = undefined;
        this.x = tile.x;
        this.y = tile.y;
        this.tile().wizard = this;
        // TODO: UPDATE VARIABLE STATING HOW MUCH MOVEMENT LEFT

        return true;
        // <<-- /Creer-Merge: move -->>
    }

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
