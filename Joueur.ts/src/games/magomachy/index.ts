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
    gameVersion: "3a46f9aec2408eb04871642e3f1f986ce612791807a5dc2fcf3289ce462669ae",
};
