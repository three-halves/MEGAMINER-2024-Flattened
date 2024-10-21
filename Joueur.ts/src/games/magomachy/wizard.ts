// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { GameObject } from "./game-object";
import { Player } from "./player";

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
     * The amount of health this player has.
     */
    public readonly health!: number;

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
     * The x coordinate of the wizard.
     */
    public readonly x!: number;

    /**
     * The y coordinate of the wizard.
     */
    public readonly y!: number;

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
