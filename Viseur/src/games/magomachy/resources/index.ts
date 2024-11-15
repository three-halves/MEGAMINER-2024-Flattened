import { createResources, load } from "src/viseur/renderer";

/** These are the resources (sprites) that are loaded and usable by game objects in Magomachy. */
export const GameResources = createResources("Magomachy", {
    // <<-- Creer-Merge: resources -->>
    test: load("test.png"), // load files like this,

    bg: load("bg.png"),

    grass: load("grass.png"),
    wall: load("wall.png"),
    wall2: load("wall2.png"),

    // aggressive
    wiz_ag_n: load("sprites-ag/face-north.png"),
    wiz_ag_e: load("sprites-ag/face-east.png"),
    wiz_ag_s: load("sprites-ag/face-south.png"),
    wiz_ag_w: load("sprites-ag/face-west.png"),

    wiz_ag_tele_n: load("sprites-ag/Agressive_tele_up.png"),
    wiz_ag_tele_e: load("sprites-ag/Agressive_tele_right.png"),
    wiz_ag_tele_s: load("sprites-ag/Agressive_tele_down.png"),
    wiz_ag_tele_w: load("sprites-ag/Agressive_tele_left.png"),

    wiz_ag_dash_n: load("sprites-ag/Agressive_dash_up.png"),
    wiz_ag_dash_e: load("sprites-ag/Agressive_dash_right.png"),
    wiz_ag_dash_s: load("sprites-ag/Agressive_dash_down.png"),
    wiz_ag_dash_w: load("sprites-ag/Agressive_dash_left.png"),
    
    wiz_ag_cast_n: load("sprites-ag/Agressive_cast_back.png"),
    wiz_ag_cast_e: load("sprites-ag/Agressive_cast_left.png"),
    wiz_ag_cast_s: load("sprites-ag/Agressive_cast_front.png"),
    wiz_ag_cast_w: load("sprites-ag/Agressive_cast_right.png"),
    
    // defensive
    wiz_de_n: load("sprites-de/face-north.png"),
    wiz_de_e: load("sprites-de/face-east.png"),
    wiz_de_s: load("sprites-de/face-south.png"),
    wiz_de_w: load("sprites-de/face-west.png"),

    wiz_de_cast_n: load("sprites-de/cast_back.png"),
    wiz_de_cast_e: load("sprites-de/cast_right.png"),
    wiz_de_cast_s: load("sprites-de/cast_front.png"),
    wiz_de_cast_w: load("sprites-de/cast_left.png"),

    // sus
    wiz_su_n: load("sprites-su/face-north.png"),
    wiz_su_e: load("sprites-su/face-east.png"),
    wiz_su_s: load("sprites-su/face-south.png"),
    wiz_su_w: load("sprites-su/face-west.png"),

    wiz_su_cast_n: load("sprites-su/suscastU.png"),
    wiz_su_cast_e: load("sprites-su/suscastR.png"),
    wiz_su_cast_s: load("sprites-su/suscastD.png"),
    wiz_su_cast_w: load("sprites-su/suscastL.png"),

    // strategic
    wiz_st_n: load("sprites-st/face-north.png"),
    wiz_st_e: load("sprites-st/face-east.png"),
    wiz_st_s: load("sprites-st/face-south.png"),
    wiz_st_w: load("sprites-st/face-west.png"),

    wiz_st_cast_n: load("sprites-st/gray-north.png"),
    wiz_st_cast_e: load("sprites-st/gray-east.png"),
    wiz_st_cast_s: load("sprites-st/gray-south.png"),
    wiz_st_cast_w: load("sprites-st/gray-west.png"),

    item_health: load("sprites-items/flask-health.png"),
    item_aether: load("sprites-items/flask-aether.png"),

    rune_health: load("sprites-items/heal.png"),
    rune_tele: load("sprites-items/teleport.png"),
    rune_explode: load("sprites-items/lightning.png"),
    rune_charge: load("sprites-items/poison.png"),
    // rune_stone: load("wall.png"),
    statue: load("sprites-items/grasstouched.png"),

    spell_punch: load("sprites-spells/punch.png"),
    spell_flame: load("sprites-spells/firefist.png"),
    spell_rock: load("sprites-spells/rock.png"),
    spell_water: load("sprites-spells/waterblastseg.png"),

    particle_health: load("Rune_Particles/Heal_Rune_Particle.png"),
    particle_charge: load("Rune_Particles/Explosion_Rune_Particle.png"),
    particle_explode: load("Rune_Particles/Lightning_Rune_Particle.png"),
    particle_tele: load("Rune_Particles/Teleport_Rune_Particle.png"),

    // <<-- /Creer-Merge: resources -->>
});
