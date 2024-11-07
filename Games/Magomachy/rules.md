# MMAI 20-something: [Magomachy]

## Game Description
Magomachy is a two-player, tile-based game in which two wizards selected by each player face off in a duel to the death. At the start of the game, players choose 1 of 4 different types of wizards, then attempt to kill the other wizard by using their aether pool to cast a variety of spells. A wizard wins by reducing the other wizard to 0 health; however, if they reach 0 health or 0 aether before this happens, they lose instead.

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

## How to Play
To play the game, you must create an AI using the Jouer program provided in this repo. To do this, select a Jouer folder corresponding to the programming language you'd like to use and then navigate to the Magomachy folder. Edit the name function to return your team's name, and then put your acual logic in the runTurn function. (The other functions are either basic accessors or optional skeletons to help organize your code). 

**Do not edit any other files in your Jouer folder.** The files in the Magomachy folder give you key information for playing the game and will be explained in the next section, while the other files handle communications with our game server. Tampering with these files could break your AI at best or the entire game at worst, either of which may disqualify you from MegaMiner!

## Game Objects
While your AI logic is stored in your ai file, the functions and variables you'll need to access are actually listed in the other files of the Magomachy folder. They define the **Game Objects** you'll need to interact with to play the game. These are automatically synchronized with the game server, so there's no need to worry about unexpected disconnects between what your AI sees vs what is actually happening in the game.

Because of this, just as you shouldn't edit the Jouer files, **you should not directly edit game objects in your code**. To be clear, referencing an object is fine, reading its variables is fine, calling its functions is (usually) fine. The issues come from attempting to replace the object or modify any of its attributes; that's the server's job! So don't directly change any attributes of the objects, and always keep track of whether you are passing by value or passing by reference.

A more detailed list of these objects is provided below:

### Game
When the server matches you with an opponent, a single, top-level Game object will first be created. This represents the current state of the game at a high level and sort of acts as the "master" object storing the rest of the game pieces. If you see a lot of variable initializations at the top, ignore them; they will be overwritten by the server almost immediately upon matching with an opponent. Instead, the main use of this file for you is to provide several accessor functions storing global variables like the turn count or tile map. (Read the function documentation in the game file for more information). Your AI file comes with a reference to this object.

Note that, from now on, this master object will be referred to as the Game.

### Game_Object
Confusing name aside, this is more of a niche extension of the Game rather than its own thing. It's meant to store debug variables like game IDs or output logs. Probably not very useful to you, but feel free to check it out anyway.

### Player
The next-highest tier of objects in the game hierarchy are the Players, objects containing information about the clients participating in the game. Each Game contains two such objects, one representing you and the other made for your opponent. You are provided a reference to the former in your ai file, which in turn stores a reference to the latter as a member variable.

For you, the most important parts of this object are the parts referring to your wizard. In addition to the actual object (which will be explained in their own section), you are provided a chooseWizard() function for picking a wizard specialty on your first turn. You'll only ever *need* to call this function once per game, but if you call it a second time in the exact same way, your console will print an ASCII representation of the game board! It doesn't provide any information you couldn't get elsewhere, but it's great for debugging purposes.

Most of the other variables refer to client-side information to help with connecting to the server or telling you how you performed once the game ends. Since your client console should already display this information, there variables probably are not very helpful, but they're there if you want them.

### Tile
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

### Wizard
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
| Projectile | Tile to aim at | Fires a projectile toward a Tile in range. The projectile moves until it hits an obstacle. The exact path is calculated with the Bressenham algorithm. |
| Rune | empty Tile | Places a rune on a Tile that activates when ANY Wizard steps on it. |

Every Wizard has access to a basic Punch "spell," a zero-aether Targeted (Wizard) spell with 1 range and 1 damage. The rest of the spells you can use depend on your wizard's specialty, as explained below:

#### Aggressive Mage
This wizard aims to be as aggressive as possible, rushing down the enemy and blasting them with powerful fire spells.

| Name | Type | Aether Cost | Damage | Range | Description |
|---|---|---|---|---|---|
| Fire Slash | Targeted (Wizard) | 2 | 3 | 3 | Simple fire attack. Good damage. |
| Thunderous Dash | Buff | 3 | - | 0 | Gives 3 extra speed for 1 turn and lets your Wizard move through the enemy Wizard's. |
| Furious Telekinesis | Targeted (Item) | 4 | - | 1 | Pushes an item or rune away from your Wizard until it hits another item, a wall, or an opponent. Immediately activates the item/rune in that last case, though charge runes are simply dispelled instead. |

#### Defensive Mage
This wizard patiently counters their opponent until an opportunity to retaliate presents itself.

| Name | Type | Aether Cost | Damage | Range | Description |
|---|---|---|---|---|---|
| Rock Lob | Targeted (Wizard) | 2 | 2 | 2* | Throws a rock at an opponent *exactly* two tiles away. |
| Force Push | Targeted (Wizard) | 3 | 2* | 1 | Pushes an enemy Wizard up to 3 spaces away. If they touch an item they can use, they use it. If they hit a wall before moving 3 spaces, they take 2 damage and stop moving. |
| Stone Summon | Rune | 4 | - | 1 | Summons an impassable statue for 10 total turns. |

#### Sustaining Mage
This wizard aims to outlast their opponent in a forced war of attrition.

| Name | Type | Aether Cost | Damage | Range | Description |
|---|---|---|---|---|---|
| Calming Blast | Projectile | 3 | 1 | Infinity | Fires a basic projectile. If it hits an opposing Wizard, decreases their maximum movement by 1 for one turn. |
| Teleport | Targeted (None) | 3 | - | 3 | Immediately moves this Wizard to targeted empty tile, regardless of obstacles in the way. |
| Dispel Magic | Targeted (Item) | 2 | - | 1 | Deletes an Item in range. |

#### Strategic Mage
This wizard doesn't attack directly, but rather places tactical ~~landmines~~ runes all over the map.

| Name | Type | Aether Cost | Damage | Range | Description |
|---|---|---|---|---|---|
| Explosion Rune | Rune | 2 | 4 | 1 | Rune deals 4 damage when activated. |
| Heal Rune | Targeted (Wizard) | 5 | -5 | 1 | Rune heals 5 damage when activated. |
| Teleport Rune | Rune | 3/0 | - | 1/Infinity | Rune cannot be activated normally. When this spell is used a second time, immediately teleports this Wizard to the rune, then destroys it.  |
| Charge Rune | Rune | 4 | 5 | Infinity/3 | Rune cannot be activated normally. After 5 turns, rune deals 5 damage to any wizard within 3 tiles, then is destroyed. |

## Items
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

Example Code Block
```js
ship.shipHealth = 10;
ship.crew = 3 + (1.1 * investment) / 200;
ship.gold = 600 + 1.1 * investment;
```

[Pirates]: https://github.com/siggame/Cerveau/blob/master/games/pirates/
[Map]:  https://github.com/siggame/Cerveau/blob/master/games/pirates/game.js
[Tile]: https://github.com/siggame/Cerveau/blob/master/games/pirates/tile.js
[Unit]: https://github.com/siggame/Cerveau/blob/master/games/pirates/unit.js
[Port]: https://github.com/siggame/Cerveau/blob/master/games/pirates/port.js
