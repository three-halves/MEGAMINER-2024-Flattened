// This is a class to represent the Wizard object in the game.
// If you want to render it in the game do so here.
import { Immutable } from "src/utils";
import { Viseur } from "src/viseur";
import { makeRenderable } from "src/viseur/game";
import { GameObject } from "./game-object";
import { MagomachyDelta, TileState, WizardState } from "./state-interfaces";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be added here safely between Creer runs
// <<-- /Creer-Merge: imports -->>

// <<-- Creer-Merge: should-render -->>
// Set this variable to `true`, if this class should render.
const SHOULD_RENDER = true;
// <<-- /Creer-Merge: should-render -->>

/**
 * An object in the game. The most basic class that all game classes should inherit from automatically.
 */
export class Wizard extends makeRenderable(GameObject, SHOULD_RENDER) {
    // <<-- Creer-Merge: static-functions -->>
    // you can add static functions here
    // <<-- /Creer-Merge: static-functions -->>

    /** The current state of the Wizard (dt = 0). */
    public current: WizardState | undefined;

    /** The next state of the Wizard (dt = 1). */
    public next: WizardState | undefined;

    // <<-- Creer-Merge: variables -->>
    // You can add additional member variables here
    // <<-- /Creer-Merge: variables -->>

    /**
     * Constructor for the Wizard with basic logic
     * as provided by the Creer code generator.
     * This is a good place to initialize sprites and constants.
     *
     * @param state - The initial state of this Wizard.
     * @param viseur - The Viseur instance that controls everything and
     * contains the game.
     */
    constructor(state: WizardState, viseur: Viseur) {
        super(state, viseur);

        // <<-- Creer-Merge: constructor -->>
        // You can initialize your new Wizard here.
        this.container.setParent(this.game.layers.game);

        this.type = state.specialty;
        this.typeSuffix = state.specialty.substring(0, 2);

        const hide = { visible: false };
        this.sprites = {
            aggressive: this.addSprite.wiz_ag_s(hide),
            defensive: this.addSprite.wiz_de_s(hide),
            sustaining: this.addSprite.wiz_su_s(hide),
            strategic: this.addSprite.wiz_st_s(hide),
        };

        // <<-- /Creer-Merge: constructor -->>
    }

    /**
     * Called approx 60 times a second to update and render Wizard
     * instances.
     * Leave empty if it is not being rendered.
     *
     * @param dt - A floating point number [0, 1) which represents how far into
     * the next turn that current turn we are rendering is at.
     * @param current - The current (most) game state, will be this.next if
     * this.current is undefined.
     * @param next - The next (most) game state, will be this.current if
     * this.next is undefined.
     * @param delta - The current (most) delta, which explains what happened.
     * @param nextDelta - The the next (most) delta, which explains what
     * happend.
     */
    public render(
        dt: number,
        current: Immutable<WizardState>,
        next: Immutable<WizardState>,
        delta: Immutable<MagomachyDelta>,
        nextDelta: Immutable<MagomachyDelta>,
    ): void {
        super.render(dt, current, next, delta, nextDelta);

        // <<-- Creer-Merge: render -->>
        // render where the Wizard is
        // eslint-disable-next-line no-console
        // eslint-disable-next-line no-console
        const sprite = this.sprites[this.type];
        sprite.visible = true;
        sprite.x = current.x;
        sprite.y = current.y;

        // <<-- /Creer-Merge: render -->>
    }

    /**
     * Invoked after a player changes their color,
     * so we have a chance to recolor this Wizard's sprites.
     */
    public recolor(): void {
        super.recolor();

        // <<-- Creer-Merge: recolor -->>
        // replace with code to recolor sprites based on player color
        // <<-- /Creer-Merge: recolor -->>
    }

    /**
     * Invoked when this Wizard instance should not be rendered,
     * such as going back in time before it existed.
     *
     * By default the super hides container.
     * If this sub class adds extra PIXI objects outside this.container, you
     * should hide those too in here.
     */
    public hideRender(): void {
        super.hideRender();

        // <<-- Creer-Merge: hide-render -->>
        // hide anything outside of `this.container`.
        // <<-- /Creer-Merge: hide-render -->>
    }

    /**
     * Invoked when the state updates.
     *
     * @param current - The current (most) game state, will be this.next if
     * this.current is undefined.
     * @param next - The next (most) game state, will be this.current if
     * this.next is undefined.
     * @param delta - The current (most) delta, which explains what happened.
     * @param nextDelta - The the next (most) delta, which explains what
     * happend.
     */
    public stateUpdated(
        current: Immutable<WizardState>,
        next: Immutable<WizardState>,
        delta: Immutable<MagomachyDelta>,
        nextDelta: Immutable<MagomachyDelta>,
    ): void {
        super.stateUpdated(current, next, delta, nextDelta);

        // <<-- Creer-Merge: state-updated -->>
        // update the Wizard based off its states
        // <<-- /Creer-Merge: state-updated -->>
    }

    // <<-- Creer-Merge: public-functions -->>
    // You can add additional public functions here
    // <<-- /Creer-Merge: public-functions -->>

    // <Joueur functions> --- functions invoked for human playable client
    // NOTE: These functions are only used 99% of the time if the game
    // supports human playable clients (like Chess).
    // If it does not, feel free to ignore these Joueur functions.

    /**
     * Casts a spell on a Tile in range.
     *
     * @param spellName - The name of the spell to cast.
     * @param tile - The Tile to aim the spell toward.
     * @param callback - The callback that eventually returns the return value
     * from the server. - The returned value is True if successfully cast, false
     * otherwise.
     */
    public cast(
        spellName: string,
        tile: TileState,
        callback: (returned: boolean) => void,
    ): void {
        this.runOnServer("cast", { spellName, tile }, callback);
    }

    /**
     * Moves this Wizard from its current Tile to another empty Tile.
     *
     * @param tile - The Tile this Wizard should move to.
     * @param callback - The callback that eventually returns the return value
     * from the server. - The returned value is True if it moved, false
     * otherwise.
     */
    public move(tile: TileState, callback: (returned: boolean) => void): void {
        this.runOnServer("move", { tile }, callback);
    }

    // </Joueur functions>

    // <<-- Creer-Merge: protected-private-functions -->>
    // You can add additional protected/private functions here
    // <<-- /Creer-Merge: protected-private-functions -->>
}
