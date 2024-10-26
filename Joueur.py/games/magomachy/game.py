# Game: Wizards fight to the death.

# DO NOT MODIFY THIS FILE
# Never try to directly create an instance of this class, or modify its member variables.
# Instead, you should only be reading its variables and calling its functions.

from typing import Dict, List, Optional
from joueur.base_game import BaseGame

# import game objects
from games.magomachy.game_object import GameObject
from games.magomachy.item import Item
from games.magomachy.player import Player
from games.magomachy.tile import Tile
from games.magomachy.wizard import Wizard

# <<-- Creer-Merge: imports -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
# you can add additional import(s) here
# <<-- /Creer-Merge: imports -->>

class Game(BaseGame):
    """The class representing the Game in the Magomachy game.

    Wizards fight to the death.
    """

    def __init__(self):
        """Initializes a Game with basic logic as provided by the Creer code generator.
        """
        BaseGame.__init__(self)

        # private attributes to hold the properties so they appear read only
        self._current_player = None
        self._current_turn = 0
        self._game_objects = {}
        self._map_height = 0
        self._map_width = 0
        self._max_turns = 100
        self._players = []
        self._session = ""
        self._tiles = []
        self._time_added_per_turn = 0
        self._wizards = []

        self.name = "Magomachy"

        self._game_object_classes = {
            'GameObject': GameObject,
            'Item': Item,
            'Player': Player,
            'Tile': Tile,
            'Wizard': Wizard
        }

    @property
    def current_player(self) -> 'games.magomachy.player.Player':
        """games.magomachy.player.Player: The player whose turn it is currently. That player can send commands. Other players cannot.
        """
        return self._current_player

    @property
    def current_turn(self) -> int:
        """int: The current turn number, starting at 0 for the first player's turn.
        """
        return self._current_turn

    @property
    def game_objects(self) -> Dict[str, 'games.magomachy.game_object.GameObject']:
        """dict[str, games.magomachy.game_object.GameObject]: A mapping of every game object's ID to the actual game object. Primarily used by the server and client to easily refer to the game objects via ID.
        """
        return self._game_objects

    @property
    def map_height(self) -> int:
        """int: The number of Tiles in the map along the y (vertical) axis.
        """
        return self._map_height

    @property
    def map_width(self) -> int:
        """int: The number of Tiles in the map along the x (horizontal) axis.
        """
        return self._map_width

    @property
    def max_turns(self) -> int:
        """int: The maximum number of turns before the game will automatically end.
        """
        return self._max_turns

    @property
    def players(self) -> List['games.magomachy.player.Player']:
        """list[games.magomachy.player.Player]: List of all the players in the game.
        """
        return self._players

    @property
    def session(self) -> str:
        """str: A unique identifier for the game instance that is being played.
        """
        return self._session

    @property
    def tiles(self) -> List['games.magomachy.tile.Tile']:
        """list[games.magomachy.tile.Tile]: All the tiles in the map, stored in Row-major order. Use `x + y * mapWidth` to access the correct index.
        """
        return self._tiles

    @property
    def time_added_per_turn(self) -> float:
        """float: The amount of time (in nano-seconds) added after each player performs a turn.
        """
        return self._time_added_per_turn

    @property
    def wizards(self) -> List[str]:
        """list[str]: List of wizard choices.
        """
        return self._wizards

    def get_tile_at(self, x: int, y: int) -> Optional['games.magomachy.tile.Tile']:
        """Gets the Tile at a specified (x, y) position.

        Args:
            x (int): An integer between 0 and the map_width.
            y (int): An integer between 0 and the map_height.

        Returns:
            games.magomachy.tile.Tile or None: The Tile at (x, y) or None if out of bounds.
        """
        if x < 0 or y < 0 or x >= self.map_width or y >= self.map_height:
            # out of bounds
            return None

        return self.tiles[x + y * self.map_width]

    # <<-- Creer-Merge: functions -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
    # if you want to add any client side logic (such as state checking functions) this is where you can add them
    # <<-- /Creer-Merge: functions -->>
