import { BaseClasses } from "./";
import { Wizard } from "./wizard";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * Represents the AI that a player controls. This acts as an interface to send
 * the AI orders to execute.
 */
export class AI extends BaseClasses.AI {
    // <<-- Creer-Merge: attributes -->>
// If the AI needs additional attributes add them here.
// NOTE: these are not set in client AIs.
    // <<-- /Creer-Merge: attributes -->>
    /**
     * This is called whenever your wizard selects an action.
     *
     * @param wizard - Wizard performs action.
     * @returns Three of the choices a Wizard can make as an action.
     */
    public async Action(wizard: Wizard): Promise<number> {
        return this.executeOrder("Action", wizard) as Promise<number>;
    }

    /**
     * This is called whenever your wizard makes a move.
     *
     * @param wizard - Wizard moves.
     * @returns Eight cardinal directions.
     */
    public async Move(wizard: Wizard): Promise<number> {
        return this.executeOrder("Move", wizard) as Promise<number>;
    }

    // <<-- Creer-Merge: functions -->>
// If the AI needs additional attributes add them here.
/// NOTE: these will not be callable in client AIs.
    // <<-- /Creer-Merge: functions -->>
}
