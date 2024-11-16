// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { GameObject } from "./game-object";
import { Tile } from "./tile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * Objects that help the players.
 */
export class Item extends GameObject {

    /**
     * The type of Item this is.
     */
    public readonly form!: string;

    /**
     * How many turns this item has existed for.
     */
    public readonly lifetime!: number;

    /**
     * How long the item is allowed to last for.
     */
    public readonly maxLife!: number;

    /**
     * What item spawns on this tile.
     */
    public readonly objectSpawn!: string;

    /**
     * Turns until item should spawn.
     */
    public readonly spawnTimer!: number;

    /**
     * The Tile this Item is on.
     */
    public readonly tile!: Tile;

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
