import { BaseGameObjectRequiredData } from "~/core/game";
import { ItemConstructorArgs } from "./";
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
    public form!: string;

    /**
     * How many turns this item has existed for.
     */
    public lifetime!: number;

    /**
     * How long the item is allowed to last for.
     */
    public maxLife!: number;

    /**
     * What item spawns on this tile.
     */
    public objectSpawn!: string;

    /**
     * Turns until item should spawn.
     */
    public spawnTimer!: number;

    /**
     * The Tile this Item is on.
     */
    public tile: Tile;

    // <<-- Creer-Merge: attributes -->>

    // Any additional member attributes can go here
    // NOTE: They will not be sent to the AIs, those must be defined
    // in the creer file.

    /**
     * How long the item is allowed to last for. Ideally, should be in YAML.
     */
    public max_life?: number;

    // <<-- /Creer-Merge: attributes -->>

    /**
     * Called when a Item is created.
     *
     * @param args - Initial value(s) to set member variables to.
     * @param required - Data required to initialize this (ignore it).
     */
    constructor(
        args: ItemConstructorArgs<{
            // <<-- Creer-Merge: constructor-args -->>
            // You can add more constructor args in here
            max_life?: number;
            // <<-- /Creer-Merge: constructor-args -->>
        }>,
        required: Readonly<BaseGameObjectRequiredData>,
    ) {
        super(args, required);

        // <<-- Creer-Merge: constructor -->>
        // setup any thing you need here
        if (args.max_life && args.max_life > 0) {
            this.max_life = args.max_life;
        }
        // <<-- /Creer-Merge: constructor -->>
    }

    // <<-- Creer-Merge: public-functions -->>

    // Any public functions can go here for other things in the game to use.
    // NOTE: Client AIs cannot call these functions, those must be defined
    // in the creer file.

    // <<-- /Creer-Merge: public-functions -->>

    // <<-- Creer-Merge: protected-private-functions -->>

    // Any additional protected or pirate methods can go here.

    // <<-- /Creer-Merge: protected-private-functions -->>
}
