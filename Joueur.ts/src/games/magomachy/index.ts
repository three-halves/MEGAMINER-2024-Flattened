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
    gameVersion: "2253f2c43d650502bf62e0375cd0448402699c1ac9347c81dce8b93f202cdac8",
};
