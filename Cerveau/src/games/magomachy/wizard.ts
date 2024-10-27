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

    // Any public functions can go here for other things in the game to use.
    // NOTE: Client AIs cannot call these functions, those must be defined
    // in the creer file.

    // SIGH
    // I'm gonna store the spells here initially, but they will
    // have to be copied into the right place after the creer
    // program is run again.



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
        if (!this.tile) {
            throw new Error('${this} has no Tile!');
        }

        // Calculate distance of target tile
        const dx = this.tile.x - tile.x;
        const dy = this.tile.y - tile.y;
        const distSq = dx * dx + dy * dy;

        if (distSq > this.speed ** 2) {
            return `${tile} is too far away to reach this turn!`;
        }

        if (tile.type === "wall") {
            return `${this} can't phase through walls! (Yet...)`;
        }

        if (tile.wizard) {
            return `${tile} is occupied by a wizard!`;
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
            throw new Error(`${this} has no Tile to move from!']`);
        }

        this.tile.wizard = undefined;
        this.tile = tile;
        tile.wizard = this;
        // TODO: UPDATE VARIABLE STATING HOW MUCH MOVEMENT LEFT

        return true;
    }

    public bressenham(x0: number, y0: number, x1: number, y1: number, current: Tile): Tile | undefined {
        // First we describe the slope of the line
        // let dx = Math.abs(x1 - x0);
        // let sx = x0 < x1 ? 1 : -1;

        // let dy = Math.abs(y1 - y0);
        // let sy = y0 < y1 ? 1 : -1;

        // let cx = dx > dy ? 1 : 0.5
        // let cy = dx > dy ? 0.5 : 1

        // // If the line is diagonal, we have to note it
        // let isDiag = (dx === dy)

        // // We also need the y-intercept
        // // Thankfully TypeScript stores all numbers as floats by default
        // let b = y0 - dx / dy * x0;

        // // If a point (x,y) is on the line, then dy*x - dx*y + dx*b = 0.
        // // Its parity also tells us how good a nearby tile approximates the line.
        // let f = dy*(current.x + sx*cx) - dx*(current.y + sy*cy) + dx*b;

        // // Now we choose the best tile for the line.
        // // We always update the coordinate that changes quicker.
        // // If f is positive or the slope is 1, we also update the other coordinate.
        // // Since this function is being called outside the game class, we can't just tilemap this.
        // // So we have to go case by case.
        // let vert = "North";
        // let horiz = "West";
        // if (sy > 0) {
        //     vert = "South";

        // if (sx > 0) {
        //     horiz = "East";



        // if (dy > dx) {
        //     let neighbor = this.tile.tileEast;
        //     if (sy > 0) {
        //         vert = "South";
    
        //     if (sx > 0) {
        //         horiz = "West";
        //     if (isDiag || f > 0) {
        //         return neighbor.getNeighbor(horiz);
        //     }
        // return neighbor;
        // }
        // else {
        //     let neighbor = current.getNeighbor(horiz);
        //     if (isDiag || f > 0) {
        //         return neighbor.getNeighbor(vert);
        //     }
        //     return neighbor;
        // }
        return this.game.tiles[0];
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

        if (!tile) {
           throw new Error('${this} has no Tile to target!');
        }

        // Calculate distance of target tile
        const dx = this.tile!.x - tile.x;
        const dy = this.tile!.y - tile.y;
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
            case "Fire Slash":{
                if (player.wizard.specialty != "aggressive") {
                    return `You do not have the knowledge to use that spell`;
                }
                if (tile.hasNeighbor(player.wizard.tile)) {
                    return ``
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
            case "Magic Missile": {
                // Debug spell like wii tanks
                this.aether -= 2;

                let bouncesLeft = 4;
                let prevTile = tile;
                let x0 = this.tile!.x;
                let y0 = this.tile!.y;
                let x1 = tile.x;
                let y1 = tile.y;

                while(bouncesLeft > 0) {
                    let nextTile = this.bressenham(x0,y0,x1,y1,prevTile);
                    if(!nextTile || nextTile.type === "wall") {
                        // eh 
                    }
                }
                break;
            }
            case "Fire Slash": {
                // Fire blast
                // Does it go through walls? I assume so
                tile.wizard!.health -= 3;
                this.aether -= 2;
                break;
            }
            case "Thunderous Dash": {
                // Just add an isDash var to wizards
                break;
            }
            case "Furious Telekinesis": {
                // Impossible to implement without items.
                break;
            }
            case "Rock Lob": {
                // This is spelled wrong in the slide examples, please fix.
                // Anyhoo throws rock in exactly 2 range
                tile.wizard!.health -= 2;
                this.aether -= 2
                break;
            }
            case "Force Push": {
                // Requires Bressenham to find path
                // After that, keep pushing until wall is hit or out of range
                this.aether -= 3;

                let distLeft = 3;
                let prevTile = tile;
                let nextTile = this.bressenham(this.tile!.x, this.tile!.y, tile.x, tile.y, tile)
                while (nextTile && nextTile.type === "floor" && distLeft > 0) {
                    prevTile.wizard!.tile = nextTile;
                    nextTile.wizard = prevTile.wizard;
                    prevTile.wizard = undefined;
                    // NOTE: If wizard touches item, collect it
                    // Honestly may be best to have a generic move function

                    distLeft--;
                    prevTile = nextTile;
                    nextTile = this.bressenham(this.tile!.x, this.tile!.y, tile.x, tile.y, prevTile);
                }
                if (distLeft > 0) {
                    prevTile.wizard!.health -= 2;
                }
                break;
            }
            case "Stone Summon": {
                // Um. I just dont know here.
                // Maybe keep a list of walled tiles and their associated times?
                // And then add a variable to tile describing if its blocked or not?
                // This is more of a game manager thing...

                // ok coming back to this, I think I have a plan.
                // we'll store a list of walled tiles in the wizard itself.
                // we can also give tiles a MUTABLE variable saying if they're walled.
                // then the gm checks this array every turn.
                // the same idea counts for strategist runes.
                break;
            }
            case "Calming Blast": {
                // So this requires editing the game manager to heal speeds after every turn.
                // Until that is done, DO NOT UNCOMMENT THIS CODE!

                // tile.wizard.speed -= 1;
                // tile.wizard.health -= 1;
                // this.aether -= 3;
                break;
            }
            case "Teleport": {
                // Hey! This one's easy!
                this.tile!.wizard = undefined;
                this.tile = tile;
                tile.wizard = this;
                break;
            }
            case "Dispel Magic": {
                // Can't do until items are made bro
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
    // <<-- /Creer-Merge: public-functions -->>

    // <<-- Creer-Merge: protected-private-functions -->>

    // Any additional protected or pirate methods can go here.
    /**
     * Trues to invalidate args for an action function
     *
     * @param player - The player calling the action.
     * @returns The rason this is invalid, undefined if it looks valid so far.
     */
    private invalidate(
        player: Player,
    ): string | undefined {
        if (!player || player != this.game.currentPlayer) {
            return `It is not your turn, young ${player}!`;
        }
        if (this.owner != player) {
            return `Wrong wizard, ${player}.`;
        }
    }
    
    // <<-- /Creer-Merge: protected-private-functions -->>
}
