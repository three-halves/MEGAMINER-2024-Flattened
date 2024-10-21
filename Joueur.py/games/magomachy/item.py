# Item: Objects that help the players.

# DO NOT MODIFY THIS FILE
# Never try to directly create an instance of this class, or modify its member variables.
# Instead, you should only be reading its variables and calling its functions.

from games.magomachy.game_object import GameObject

# <<-- Creer-Merge: imports -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
# you can add additional import(s) here
# <<-- /Creer-Merge: imports -->>

class Item(GameObject):
    """The class representing the Item in the Magomachy game.

    Objects that help the players.
    """

    def __init__(self):
        """Initializes a Item with basic logic as provided by the Creer code generator.
        """
        GameObject.__init__(self)

        # private attributes to hold the properties so they appear read only
        self._tile = None

    @property
    def tile(self) -> 'games.magomachy.item.Item':
        """games.magomachy.item.Item: The Tile this Item is on.
        """
        return self._tile


    # <<-- Creer-Merge: functions -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
    # if you want to add any client side logic (such as state checking functions) this is where you can add them
    # <<-- /Creer-Merge: functions -->>
