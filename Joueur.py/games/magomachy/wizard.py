# Wizard: The wizard default.

# DO NOT MODIFY THIS FILE
# Never try to directly create an instance of this class, or modify its member variables.
# Instead, you should only be reading its variables and calling its functions.

from typing import List, Optional
from games.magomachy.game_object import GameObject

# <<-- Creer-Merge: imports -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
# you can add additional import(s) here
# <<-- /Creer-Merge: imports -->>

class Wizard(GameObject):
    """The class representing the Wizard in the Magomachy game.

    The wizard default.
    """

    def __init__(self):
        """Initializes a Wizard with basic logic as provided by the Creer code generator.
        """
        GameObject.__init__(self)

        # private attributes to hold the properties so they appear read only
        self._aether = 0
        self._attack = 0
        self._defense = 0
        self._direction = 0
        self._effect_times = []
        self._effects = []
        self._has_cast = False
        self._health = 0
        self._last_spell = ""
        self._last_target_tile = None
        self._movement_left = 0
        self._owner = None
        self._specialty = ""
        self._speed = 0
        self._tile = None

    @property
    def aether(self) -> int:
        """int: The amount of spell resources this Player has.
        """
        return self._aether

    @property
    def attack(self) -> int:
        """int: The attack value of the player.
        """
        return self._attack

    @property
    def defense(self) -> int:
        """int: The defense value of the player.
        """
        return self._defense

    @property
    def direction(self) -> int:
        """int: The direction this Wizard is facing.
        """
        return self._direction

    @property
    def effect_times(self) -> List[int]:
        """list[int]: The turns remaining on each active effects on Wizard.
        """
        return self._effect_times

    @property
    def effects(self) -> List[str]:
        """list[str]: The names of active effects on the Wizard.
        """
        return self._effects

    @property
    def has_cast(self) -> bool:
        """bool: Whether or not this Wizard has cast a spell this turn.
        """
        return self._has_cast

    @property
    def health(self) -> int:
        """int: The amount of health this player has.
        """
        return self._health

    @property
    def last_spell(self) -> str:
        """str: The spell this wizard just casted. Undefined if no spell was cast.
        """
        return self._last_spell

    @property
    def last_target_tile(self) -> Optional['games.magomachy.tile.Tile']:
        """games.magomachy.tile.Tile or None: The tile this wizard just cast to. Undefined if no tile was targeted.
        """
        return self._last_target_tile

    @property
    def movement_left(self) -> int:
        """int: How much movement the wizard has left.
        """
        return self._movement_left

    @property
    def owner(self) -> Optional['games.magomachy.player.Player']:
        """games.magomachy.player.Player or None: The Player that owns and can control this Unit, or None if the Unit is neutral.
        """
        return self._owner

    @property
    def specialty(self) -> str:
        """'aggressive', 'defensive', 'sustaining', or 'strategic': Specific type of Wizard.
        """
        return self._specialty

    @property
    def speed(self) -> int:
        """int: The speed of the player.
        """
        return self._speed

    @property
    def tile(self) -> Optional['games.magomachy.tile.Tile']:
        """games.magomachy.tile.Tile or None: The Tile that this Wizard is on.
        """
        return self._tile

    def cast(self, spell_name: str, tile: 'games.magomachy.tile.Tile') -> bool:
        """Casts a spell on a Tile in range.

        Args:
            spell_name (str): The name of the spell to cast.
            tile (games.magomachy.tile.Tile): The Tile to aim the spell toward.

        Returns:
            bool: True if successfully cast, False otherwise.
        """
        return self._run_on_server('cast', {
            'spellName': spell_name,
            'tile': tile
        })

    def move(self, tile: 'games.magomachy.tile.Tile') -> bool:
        """Moves this Wizard from its current Tile to another empty Tile.

        Args:
            tile (games.magomachy.tile.Tile): The Tile this Wizard should move to.

        Returns:
            bool: True if it moved, False otherwise.
        """
        return self._run_on_server('move', {
            'tile': tile
        })


    # <<-- Creer-Merge: functions -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
    # if you want to add any client side logic (such as state checking functions) this is where you can add them
    # <<-- /Creer-Merge: functions -->>
