// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { GameObject } from "./game-object";
import { Player } from "./player";
import { Tile } from "./tile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * The wizard default.
 */
export class Wizard extends GameObject {

    /**
     * The amount of spell resources this Player has.
     */
    public readonly aether!: number;

    /**
     * The attack value of the player.
     */
    public readonly attack!: number;

    /**
     * The defense value of the player.
     */
    public readonly defense!: number;

    /**
     * The direction this Wizard is facing.
     */
    public readonly direction!: number;

    /**
     * The turns remaining on each active effects on Wizard.
     */
    public readonly effectTimes!: number[];

    /**
     * The names of active effects on the Wizard.
     */
    public readonly effects!: string[];

    /**
     * Whether or not this Wizard has cast a spell this turn.
     */
    public readonly hasCast!: boolean;

    /**
     * Whether or not this Wizard has cast a teleport spell this turn.
     */
    public readonly hasTeleported!: boolean;

    /**
     * The amount of health this player has.
     */
    public readonly health!: number;

    /**
     * The spell this wizard just casted. Undefined if no spell was cast.
     */
    public readonly lastSpell!: string;

    /**
     * The tile this wizard just cast to. Undefined if no tile was targeted.
     */
    public readonly lastTargetTile!: Tile | undefined;

    /**
     * Max health of wizard.
     */
    public readonly maxHealth!: number;

    /**
     * How much movement the wizard has left.
     */
    public readonly movementLeft!: number;

    /**
     * The Player that owns and can control this Unit, or null if the Unit is
     * neutral.
     */
    public readonly owner!: Player | undefined;

    /**
     * Specific type of Wizard.
     */
    public readonly specialty!: "aggressive" | "defensive" | "sustaining" | "strategic";

    /**
     * The speed of the player.
     */
    public readonly speed!: number;

    /**
     * Where the wizard has a teleport rune out, undefined otherwise.
     */
    public readonly teleportTile!: Tile | undefined;

    /**
     * The Tile that this Wizard is on.
     */
    public readonly tile!: Tile | undefined;

    /**
     * Casts a spell on a Tile in range.
     * @param spellName The name of the spell to cast.
     * @param tile The Tile to aim the spell toward.
     * @returns True if successfully cast, false otherwise.
     */
    public async cast(spellName: string, tile: Tile): Promise<boolean> {
        return this.runOnServer("cast", {
            spellName,
            tile,
        });
    }

    /**
     * Check if a tile can be reached with a projectile spell.
     * @param tile The Tile to aim the projectile toward.
     * @returns True if Tile can be hit, false otherwise.
     */
    public async checkBressenham(tile: Tile): Promise<Tile[]> {
        return this.runOnServer("checkBressenham", {
            tile,
        });
    }

    /**
     * Moves this Wizard from its current Tile to another empty Tile.
     * @param tile The Tile this Wizard should move to.
     * @returns True if it moved, false otherwise.
     */
    public async move(tile: Tile): Promise<boolean> {
        return this.runOnServer("move", {
            tile,
        });
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
