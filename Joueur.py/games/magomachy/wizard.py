# Wizard: The wizard default.

# DO NOT MODIFY THIS FILE
# Never try to directly create an instance of this class, or modify its member variables.
# Instead, you should only be reading its variables and calling its functions.

from typing import Optional
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
        self._health = 0
        self._owner = None
        self._specialty = ""
        self._speed = 0
        self._x = 0
        self._y = 0

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
    def health(self) -> int:
        """int: The amount of health this player has.
        """
        return self._health

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
    def x(self) -> int:
        """int: The x coordinate of the wizard.
        """
        return self._x

    @property
    def y(self) -> int:
        """int: The y coordinate of the wizard.
        """
        return self._y


    # <<-- Creer-Merge: functions -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
    # if you want to add any client side logic (such as state checking functions) this is where you can add them
    # <<-- /Creer-Merge: functions -->>
