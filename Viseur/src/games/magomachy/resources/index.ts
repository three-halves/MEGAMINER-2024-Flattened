import { createResources, load } from "src/viseur/renderer";

/** These are the resources (sprites) that are loaded and usable by game objects in Magomachy. */
export const GameResources = createResources("Magomachy", {
    // <<-- Creer-Merge: resources -->>
    test: load("test.png"), // load files like this,

    grass: load("grass.png"),
    wall: load("wall.png"),

    wiz_ag_n: load("sprites-ag/face-north.png"),
    wiz_ag_e: load("sprites-ag/face-east.png"),
    wiz_ag_s: load("sprites-ag/face-south.png"),
    wiz_ag_w: load("sprites-ag/face-west.png"),

    wiz_de_n: load("sprites-de/face-north.png"),
    wiz_de_e: load("sprites-de/face-east.png"),
    wiz_de_s: load("sprites-de/face-south.png"),
    wiz_de_w: load("sprites-de/face-west.png"),

    wiz_su_n: load("sprites-su/face-north.png"),
    wiz_su_e: load("sprites-su/face-east.png"),
    wiz_su_s: load("sprites-su/face-south.png"),
    wiz_su_w: load("sprites-su/face-west.png"),

    wiz_st_n: load("sprites-st/face-north.png"),
    wiz_st_e: load("sprites-st/face-east.png"),
    wiz_st_s: load("sprites-st/face-south.png"),
    wiz_st_w: load("sprites-st/face-west.png"),

    // <<-- /Creer-Merge: resources -->>
});
