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
    gameVersion: "65acc66b7843108091108f5cbd212836c6c154d3b2bc4c5e186d4a36d35e5257",
};
