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
    gameVersion: "082be8098ae4f045a50f918bb8df0c0a1dc33ad375bab706ab35831544314b98",
};
