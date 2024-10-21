// DO NOT MODIFY THIS FILE

import { IGameNamespace } from "../../joueur/interfaces";
import { AI } from "./ai";
import { Game } from "./game";

import { GameObject } from "./game-object";
import { Item } from "./item";
import { Player } from "./player";
import { Tile } from "./tile";
import { Wizard } from "./wizard";

/**
 * This is a collection of all the classes that Magomachy uses to work.
 * @hidden
 */
export const namespace: IGameNamespace = {
    AI,
    Game,
    GameObjectClasses: {
        GameObject,
        Item,
        Player,
        Tile,
        Wizard,
    },
    gameVersion: "7e4209e4378ecb736bd3bcca015d81c33a466dbe23f47e4f0fdb78ce997209da",
};
