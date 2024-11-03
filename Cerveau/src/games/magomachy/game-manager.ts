// This file is where you should put logic to control the game and everything
// around it.
import { BaseClasses, MagomachyGame, MagomachyGameObjectFactory } from "./";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * Manages the game logic around the Magomachy Game.
 * This is where you could do logic for checking if the game is over, update
 * the game between turns, and anything that ties all the "stuff" in the game
 * together.
 */
export class MagomachyGameManager extends BaseClasses.GameManager {
    /** Other strings (case insensitive) that can be used as an ID. */
    public static get aliases(): string[] {
        return [
            // <<-- Creer-Merge: aliases -->>
            "MegaMinerAI-##-Magomachy",
            // <<-- /Creer-Merge: aliases -->>
        ];
    }

    /** The game this GameManager is managing. */
    public readonly game!: MagomachyGame;

    /** The factory that must be used to initialize new game objects. */
    public readonly create!: MagomachyGameObjectFactory;

    // <<-- Creer-Merge: public-methods -->>

    // any additional public methods you need can be added here

    // <<-- /Creer-Merge: public-methods -->>

    /**
     * This is called BEFORE each player's runTun function is called
     * (including the first turn).
     * This is a good place to get their player ready for their turn.
     */
    protected async beforeTurn(): Promise<void> {
        await super.beforeTurn();

        // <<-- Creer-Merge: before-turn -->>
        // add logic here for before the current player's turn starts
        if(this.game.currentPlayer.Wizard) {
            // Give Movement
            this.game.currentPlayer.wizard!.movementLeft = this.game.currentPlayer.wizard!.speed;

            // Give Spells
            this.game.currentPlayer.wizard!.hasCast = false;
        }
        // <<-- /Creer-Merge: before-turn -->>
    }

    /**
     * This is called AFTER each player's turn ends. Before the turn counter
     * increases.
     * This is a good place to end-of-turn effects, and clean up arrays.
     */
    protected async afterTurn(): Promise<void> {
        await super.afterTurn();

        // <<-- Creer-Merge: after-turn -->>
        // add logic here after the current player's turn starts
        // This is where speed would be restored after Calming Blast
        
        // Restore speed
        if (this.game.currentPlayer.wizard) {
            this.game.currentPlayer.wizard!.speed = 2;
        }
        else {
            if(!this.game.players[0].wizard && !this.game.players[1].wizard && this.game.players[0].wizardChoice && this.game.players[1].wizardChoice) {
                this.game.players[0].wizard = this.manager.create.wizard({
                    owner: this.game.players[0],
                    health: 10,
                    aether: 10,
                    tile: this.game.getTile(1, Math.floor(this.game.mapHeight) / 2),
                    specialty: this.game.players[0].wizardChoice!,
                    speed: 2
                });
                this.game.players[0].wizard.tile!.wizard = this.players[0].wizard;
                
                this.game.players[1].wizard = this.manager.create.wizard({
                    owner: this.game.players[1],
                    health: 10,
                    aether: 10,
                    tile: this.game.getTile(this.mapWidth - 2, Math.floor(this.game.mapHeight) / 2),
                    specialty: this.game.players[1].wizardChoice!,
                    speed: 2
                });
                this.game.players[1].wizard.tile!.wizard = this.players[1].wizard;
            }
        }

        // Now we have to update items
        for (let i = 0; i < this.game.mapWidth * this.game.mapHeight; i++) {
            if (this.game.tiles[i].object){
                this.game.tiles[i].object!.lifetime += 1;
                if (this.game.tiles[i].object!.max_life && this.game.tiles[i].object.lifetime > this.game.tiles[i].object.max_life) {
                    // Here's where the charge rune gets handled
                    if (this.games.tiles[i].object!.form === "charge rune") {
                        let dx = 0;
                        let dy = 0;
                        for (let j = 0; j < this.game.mapWidth * this.game.mapHeight; j++) {
                            dx = this.games.tiles[i].x - this.game.tiles[j].x;
                            dy = this.games.tiles[i].y - this.game.tiles[j].y;
                            if (this.game.tiles[j].wizard && (dx*dx + dy*dy) <= 16) {
                                this.game.tiles[j].wizard!.health -= 5;
                            }
                        }
                    }
                    this.game.tiles[i].object = undefined;
                }
            }
        }
        
        // <<-- /Creer-Merge: after-turn -->>
    }

    /**
     * Checks if the game is over in between turns.
     * This is invoked AFTER afterTurn() is called, but BEFORE beforeTurn()
     * is called.
     *
     * @returns True if the game is indeed over, otherwise if the game
     * should continue return false.
     */
    protected primaryWinConditionsCheck(): boolean {
        super.primaryWinConditionsCheck();

        // <<-- Creer-Merge: primary-win-conditions -->>
        // Add logic here checking for the primary win condition(s)

        // I sure hope currentPlayer hasnt been updated yet
        if (!this.game.currentPlayer.wizard) {
            this.declareWinner("Your opponent didn't show up to the duel!", this.game.currentPlayer.opponent);
            this.declareLoser("You didn't pick a wizard in time for the duel!", this.game.currentPlayer);
            return true;
        }
        const killedOff = this.game.players.filter(
            (p) => p.wizard.health <= 0 || p.wizard.aether <= 0);

        if (killedOff.length == 2) {
            this.secondaryWinConditions("Both wizards have died!");
        }
        else if (killedOff.length == 1) {
            const loser = killedOff[0];
            this.declareWinner("You defeated the other wizard!", loser.opponent);
            this.declareLoser(
                "The other wizard's arcane might proved too much for you.", loser
            );

            return true;
        }
        // <<-- /Creer-Merge: primary-win-conditions -->>

        return false; // If we get here no one won on this turn.
    }

    /**
     * Called when the game needs to end, but primary game ending conditions
     * are not met (like max turns reached). Use this to check for secondary
     * game win conditions to crown a winner.
     *
     * @param reason - The reason why a secondary victory condition is
     * happening.
     */
    protected secondaryWinConditions(reason: string): void {
        // <<-- Creer-Merge: secondary-win-conditions -->>
        // Add logic here for the secondary win conditions
        const players = this.game.players.slice();

        // 1. Most health
        players.sort((a,b) => b.wizard.health - a.wizard.health);
        if (players[0].wizard.health > players[1].wizard.health) {
            this.declareWinner(
                '${reason}: Had the highest health',
                players[0],
            );
            this.declareLoser(
                '${reason}: Had the lowest health',
                players[1],
            );
        }

        // 2. Most aether
        players.sort((a,b) => b.wizard.aether - a.wizard.aether);
        if (players[0].wizard.aether > players[1].wizard.aether) {
            this.declareWinner(
                '${reason}: Had the highest aether',
                players[0],
            );
            this.declareLoser(
                '${reason}: Had the lowest aether',
                players[1],
            );
        }
        // <<-- /Creer-Merge: secondary-win-conditions -->>

        // This will end the game.
        // If no winner it determined above, then a random one will be chosen.
        super.secondaryWinConditions(reason);
    }

    // <<-- Creer-Merge: protected-private-methods -->>

    // any additional protected/private methods you need can be added here

    // <<-- /Creer-Merge: protected-private-methods -->>
}
