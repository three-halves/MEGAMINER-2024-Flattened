# MMAI 27: [Magomachy]

## Game Description
Magomachy is a two-player, tile-based game in which two wizards selected by each player face off in a duel to the death. At the start of the game, players choose 1 of 4 different types of wizards, then attempt to kill the other wizard by using their aether pool to cast a variety of spells. A wizard wins by reducing the other wizard to 0 health; however, if they themselves reach 0 health before this, or reach 0 aether without killing the enemy, they lose instead.

### [Map][Map]
- Tile-based
- Fairly small, around 10 x 10
- Two types of tiles: floor and wall
- Enclosed arena with pillars and cover
- Multiple layouts, handcrafted and chosen ahead of time
- Players spawn on opposite sides
- Health and aether items are placed near the center

### Win Conditions
Kill the other player's wizard without running out of health or aether to win. 

Otherwise:
1. The player with the most health wins.
2. The player with the most aether wins.
3. A random player wins.
4. There is also a fourth, secret win condition involving a specific wizard!

Additionally, after 200 turns (cumulative between both wizards), the game automatically ends and picks a winner based on the above comditions.

## How to Play
To play the game, you must create an AI using the Joueur program provided in this repo. To do this, select a Joueur folder corresponding to the programming language you'd like to use and then navigate to the Magomachy folder. Edit the name function to return your team's name, and then put your acual logic in the runTurn function. (The other functions are either basic accessors or optional skeletons to help organize your code). 

**Do not edit any other files in your Joueur folder.** The files in the Magomachy folder give you key information for playing the game and will be explained in the next section, while the other files handle communications with our game server. Tampering with these files could break your AI at best or the entire game at worst, either of which may disqualify you from MegaMiner!

## Game Objects
While your AI logic is stored in your ai file, the functions and variables you'll need to access are actually listed in the other files of the Magomachy folder. They define the **Game Objects** you'll need to interact with to play the game. These are automatically synchronized with the game server, so there's no need to worry about unexpected disconnects between what your AI sees vs what is actually happening in the game, unless you mess with the connection itself.

Because of this, just as you shouldn't edit the Jouer files, **you should not directly edit game objects in your code**. To be clear, referencing an object is fine, reading its variables is fine, calling its functions is (almost always) fine. The issues come from attempting to replace the object or modify any of its attributes; that's the server's job! So don't directly change any attributes of the objects, and always keep track of whether you are passing by value or passing by reference.

A more detailed list of these objects is provided below:

### [Game][Map]
When the server matches you with an opponent, a single, top-level Game object will be created. This represents the current state of the game at a high level and sort of acts as the "master" object storing the rest of the game pieces. If you see a lot of variable initializations at the top, ignore them; they will be overwritten by the server almost immediately upon matching with an opponent. Instead, the main use of this file for you is to provide several accessor functions storing global variables like the turn count or tile map. (Read the function documentation in the game file for more information). Your AI file comes with a reference to this object.

Note that, from now on, this master object will be referred to as the Game.

### [Game_Object]
Confusing name aside, this is more of a niche extension of the Game rather than its own thing. It's meant to store debug variables like game IDs or output logs. Probably not very useful to you, but feel free to check it out anyway.

### [Player]
The next-highest tier of objects in the game hierarchy are the Players, objects containing information about the clients participating in the game. Each Game contains two such objects, one representing you and the other made for your opponent. You are provided a reference to the former in your ai file, which in turn stores a reference to the latter as a member variable.

For you, the most important parts of this object are the parts referring to your wizard. In addition to the actual object (which will be explained in its own section), you are provided a chooseWizard() function for picking a wizard specialty on your first turn. 

You'll only ever *need* to call this function once per game, but if you call it a second time in the exact same way, your console will print an ASCII representation of the game board! It doesn't provide any information you couldn't get elsewhere, but it's great for debugging purposes. Here's a chart straight from the source code explaining what each character means:

| Character | Meaning |
| - | -- |
| A | aggressive mage |
| D | defensive mage |
| U | sustaining mage |
| S | strategic mage |
| h | health |
| a | aether |
| e | explosion rune |
| r | healing rune |
| t | teleport rune |
| 1-9 | charge rune turns before explosion |
| s | stone |
| # | wall |
| . | floor |
| x | Wizard 1 spawn |
| y | Wizard 2 spawn |

Most of the other variables in Player refer to client-side information to help with connecting to the server or telling you how you performed once the game ends. Since your client console should already display this information, these variables probably are not very helpful, but they're there if you want them.

### [Tile]
Tiles form the grid representing the playing field of Magomachy. If you want to access the full map, it is stored in the tiles arrays in the game file. However, be warned that it is NOT a 2D array, but rather a 1D array stored in row-major order.

Most functions you will be using take **references to Tiles** as an argument rather than just their coordinates, so plan accordingly! You could just access them straight from the tiles array in the game class as stated above, but you'll be MUCH better off using the get_tile_at function in that class instead. Alternatively, get familiar with the neighbor functions provided in the tile class by reading the documentation there.

Tiles have the following properties:

| Name | Description |
|---|---|
| Type | Either 'floor' or 'wall' |
| Wizard | The wizard on this tile, if any |
| Object | The item on this tile, if any |
| x | The tile's horizontal coordinate, starting from 0 and increasing left to right |
| y | The tile's vertical coordinate, starting from 0 and increasing top to bottom |
| tile\[direction\] | Adjacent tile in a particular direction: East, North, South, West |

### [Wizard]
The big one! Your Wizard is your main pawn of the game, but you won't have immediate access to it. Instead, you'll use your Player to select a specialty (aggressive, defensive, sustaining, strategic) via chooseWizard() on your first turn, and then use the Player's reference to the newly created Wizard on subsequent turns to actually play the game.

One thing to note is that most Wizard attributes are either meant for our Visualizer or are just not implemented. What you will need to carry about are:
1. tile: the Tile your Wizard is located at
2. aether: resource to be spent on spells
3. health: how much more damage you can take before losing
4. hasCast: whether you cast a spell this turn
5. speed: number of moves per turn
6. movementLeft: number of remaining moves this turn
7. specialty: the exact kind of Wizard you are

On each turn, your Wizard will be allowed to move up to two spaces, barring buffs and debuffs.
To do this, call the Wizard's move() function for each single-tile movement you want to make.

More importantly, you will also be allowed to cast a single spell per turn at any point during your movement. To do so, call the Wizard's cast() function with the spell's name as the first argument and the Tile you wish to target as the second. The exact tile you'll want to aim at depends on the type of spell, as listed below:

| Type | Target | Description |
|---|---|---|
| Targeted (Object) | Tile with a type of Game Object | Directly affects a Game Object in range. |
| Buff | Tile with your Wizard | Temporarily makes your Wizard stronger. |
| Projectile | Tile to aim at | Fires a projectile toward a Tile in range. The projectile moves until it hits a wall or wizard. The exact path is calculated with the Bressenham algorithm. |
| Rune | empty Tile | Places a rune on a Tile that activates when ANY Wizard steps on it. |

Furthermore, Wizards have their own statistics, listed below. Note that spell damage is calculated as (raw_damage + (attacker.attack + defender.defense) / 2), rounded to the nearest integer: FINISH

| Type | Attack | Defense | Health | Aether |
|---|---|---|---|---|
| Aggressive | 15 | 5 | 10 | 10 |
| Defensive | 5 | 15 | 10 | 10 |
| Sustaining | 10 | 10 | 15 | 10 |
| Strategic | N/A | 10 | 10 | 15 |

Every Wizard has access to a basic Punch "spell," a zero-aether Targeted (Wizard) spell with 1 range and 1 damage that completely ignores attack and defense. The rest of the spells you can use depend on your wizard's specialty, as explained below:

#### Aggressive Mage
This wizard aims to be as aggressive as possible, rushing down the enemy and blasting them with powerful fire spells. They do massive amounts of damage and can blast their way through most obstacles, but they take extra damage from most attacks.

| Name | Type | Aether Cost | Damage | Range | Description |
|---|---|---|---|---|---|
| Fire Slash | Targeted (Wizard) | 2 | 3 | 2 | Simple fire attack. Good damage. |
| Thunderous Dash | Buff | 3 | - | 0 | Gives 2 extra speed for 1 turn and allows you to swap places with an enemy if you move into them. |
| Furious Telekinesis | Targeted (Item) | 4 | - | 1 | Pushes an item or rune away from your Wizard until it hits another item, a wall, or an opponent. Immediately activates the item/rune in that last case, though charge runes are simply dispelled instead. |

#### Defensive Mage
This wizard patiently counters their opponent until an opportunity to retaliate presents itself. They're not very mobile, but they can force their opponents into a terrible position.

| Name | Type | Aether Cost | Damage | Range | Description |
|---|---|---|---|---|---|
| Rock Lob | Targeted (Wizard) | 2 | 2 | 2* | Throws a rock at an opponent *exactly* two or three tiles away. |
| Force Push | Targeted (Wizard) | 3 | 2* | 1 | Pushes an enemy Wizard up to 4 spaces away. If they touch an item they can use, they use it. If they hit a wall before moving 3 spaces, they take 2 damage and stop moving. |
| Stone Summon | Rune | 4 | - | 1 | Summons an impassable statue for 10 total turns. |

#### Sustaining Mage
This wizard aims to outlast their opponent in a forced war of attrition. They have massive health pools and can even steal health, but their attacks can't go through walls and do low damage.

| Name | Type | Aether Cost | Damage | Range | Description |
|---|---|---|---|---|---|
| Calming Blast | Projectile | 3 | 1 | Infinity | Fires a basic projectile. If it hits an opposing Wizard, decreases their maximum movement by 1 for one turn, and then heals this wizard for 1 health. |
| Teleport | Targeted (None) | 3 | - | 2 | Immediately moves this Wizard to targeted empty tile, regardless of obstacles in the way. Costs 1 movement but allows one other non-teleport spell to be cast this turn. |
| Dispel Magic | Targeted (Item) | 3 | - | 1 | Deletes an Item in range. |

#### Strategic Mage
This wizard doesn't attack directly, but rather places tactical ~~landmines~~ runes all over the map. Hard to use but their versatility is unparalleled.

| Name | Type | Aether Cost | Damage | Range | Description |
|---|---|---|---|---|---|
| Explosion Rune | Rune | 2 | 4 | 1 | Rune deals 4 damage when activated. |
| Heal Rune | Rune | 5 | -5 | 1 | Rune heals 5 damage when activated. |
| Teleport Rune | Rune | 3/0 | - | 1/Infinity | Rune cannot be activated normally. When this spell is used a second time, immediately teleports this Wizard to the rune, then destroys it.  |
| Charge Rune | Rune | 4 | 5 | Infinity/3 | Rune cannot be activated normally. After 5 turns, rune deals 5 damage to any wizard within 3 tiles, then is destroyed. |
| Force Pull | Projectile | 3 | - | 3 | Fires a projectile in a particular direction, then pulls a hit wizard back along that path, activating runes along the way. |

## [Item]
Any temporary Game Object is treated as an Item. These include healing items spawned in the map such as health or aether flasks as well as runes placed by Wizards. Since most of the logic handling the use of Items is stored on our server, the actual Item class is deceptively light and is just there to store the following attributes:

| Name | Description |
|---|---|
| form | Type of Item |
| lifetime | How long this Item has existed for |
| tile | The Tile containing this Item |
| max_life | How many turns this Item may exist for (undefined if infinite) |

*Generally speaking*, an Item is activated by stepping on top of it. However, certain Items only activate under special conditions instead. More details on each Item you can expect to encounter are provided below:

| Form | Activation | Description |
|---|---|---|
| health flask | Contact | Restores 5 health. |
| aether flask | Contact | Restores 5 aether. |
| explosion rune | Contact | Deals 4 damage. |
| heal rune | Contact | Restores 5 health. |
| teleport rune | Special | Teleports the mage that placed this to the rune when the Teleport Rune spell is used again. |
| charge rune | Special | Deals 5 damage in a 3 Tile radius after 10 turns. |
| stone | Special | Blocks movement; disappears after 10 turns. |

One thing to note is that health and aether flasks will respawn after 7 turns have passed WITHOUT something covering that tile. Note that turn count starts at 0 and increments every time EITHER player ends their turn. That means if one player collects an item, it will probably be the other player's turn when the item respawns!


# Conclusion
That's all you should need to know to play this game. If you have questions or bug reports, send them to the ACM Game members running Megaminer and we'll try to help as soon as we can. Good luck on your travels, young mage!

[Magomachy]: 
https://github.com/three-halves/MEGAMINER-2024-Flattened/tree/master/Cerveau/src/games/magomachy
[Map]:
https://github.com/three-halves/MEGAMINER-2024-Flattened/blob/master/Cerveau/src/games/magomachy/game.ts
[Game_Object]: https://github.com/three-halves/MEGAMINER-2024-Flattened/blob/master/Cerveau/src/games/magomachy/game-object.ts
[Player]: https://github.com/three-halves/MEGAMINER-2024-Flattened/blob/master/Cerveau/src/games/magomachy/player.ts
[Wizard]: https://github.com/three-halves/MEGAMINER-2024-Flattened/blob/master/Cerveau/src/games/magomachy/wizard.ts
[Tile]: https://github.com/three-halves/MEGAMINER-2024-Flattened/blob/master/Cerveau/src/games/magomachy/tile.ts
[Item]: https://github.com/three-halves/MEGAMINER-2024-Flattened/blob/master/Cerveau/src/games/magomachy/item.ts
