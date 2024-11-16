-- Wizard: The wizard default.
-- DO NOT MODIFY THIS FILE
-- Never try to directly create an instance of this class, or modify its member variables.
-- Instead, you should only be reading its variables and calling its functions.


local class = require("joueur.utilities.class")
local GameObject = require("games.magomachy.gameObject")

-- <<-- Creer-Merge: requires -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
-- you can add additional require(s) here
-- <<-- /Creer-Merge: requires -->>

--- The wizard default.
-- @classmod Wizard
local Wizard = class(GameObject)

-- initializes a Wizard with basic logic as provided by the Creer code generator
function Wizard:init(...)
    GameObject.init(self, ...)

    -- The following values should get overridden when delta states are merged, but we set them here as a reference for you to see what variables this class has.

    --- The amount of spell resources this Player has.
    self.aether = 0
    --- The attack value of the player.
    self.attack = 0
    --- The defense value of the player.
    self.defense = 0
    --- The direction this Wizard is facing.
    self.direction = 0
    --- The turns remaining on each active effects on Wizard.
    self.effectTimes = Table()
    --- The names of active effects on the Wizard.
    self.effects = Table()
    --- Whether or not this Wizard has cast a spell this turn.
    self.hasCast = false
    --- Whether or not this Wizard has cast a teleport spell this turn.
    self.hasTeleported = false
    --- The amount of health this player has.
    self.health = 0
    --- The spell this wizard just casted. Undefined if no spell was cast.
    self.lastSpell = ""
    --- The tile this wizard just cast to. Undefined if no tile was targeted.
    self.lastTargetTile = nil
    --- Max aether of wizard.
    self.maxAether = 0
    --- Max health of wizard.
    self.maxHealth = 0
    --- How much movement the wizard has left.
    self.movementLeft = 0
    --- The Player that owns and can control this Unit, or nil if the Unit is neutral.
    self.owner = nil
    --- Specific type of Wizard.
    self.specialty = ""
    --- The speed of the player.
    self.speed = 0
    --- Where the wizard has a teleport rune out, undefined otherwise.
    self.teleportTile = nil
    --- The Tile that this Wizard is on.
    self.tile = nil

    --- (inherited) String representing the top level Class that this game object is an instance of. Used for reflection to create new instances on clients, but exposed for convenience should AIs want this data.
    -- @field[string] self.gameObjectName
    -- @see GameObject.gameObjectName

    --- (inherited) A unique id for each instance of a GameObject or a sub class. Used for client and server communication. Should never change value after being set.
    -- @field[string] self.id
    -- @see GameObject.id

    --- (inherited) Any strings logged will be stored here. Intended for debugging.
    -- @field[{string, ...}] self.logs
    -- @see GameObject.logs


end

--- Casts a spell on a Tile in range.
-- @tparam string spellName The name of the spell to cast.
-- @tparam Tile tile The Tile to aim the spell toward.
-- @treturn bool True if successfully cast, false otherwise.
function Wizard:cast(spellName, tile)
    return not not (self:_runOnServer("cast", {
        spellName = spellName,
        tile = tile,
    }))
end

--- Check if a tile can be reached with a projectile spell.
-- @tparam Tile tile The Tile to aim the projectile toward.
-- @treturn {Tile, ...} True if Tile can be hit, false otherwise.
function Wizard:checkBressenham(tile)
    return (self:_runOnServer("checkBressenham", {
        tile = tile,
    }))
end

--- Moves this Wizard from its current Tile to another empty Tile.
-- @tparam Tile tile The Tile this Wizard should move to.
-- @treturn bool True if it moved, false otherwise.
function Wizard:move(tile)
    return not not (self:_runOnServer("move", {
        tile = tile,
    }))
end

--- Check the next tile along a line defined by two other tiles.
-- @tparam Tile tileZero Starting point of line.
-- @tparam Tile tileOne Ending point of line.
-- @tparam Tile current The last Tile used to approximate line.
-- @treturn Tile Next tile that approximates line.
function Wizard:simpleBressenham(tileZero, tileOne, current)
    return (self:_runOnServer("simpleBressenham", {
        tileZero = tileZero,
        tileOne = tileOne,
        current = current,
    }))
end

--- (inherited) Adds a message to this GameObject's logs. Intended for your own debugging purposes, as strings stored here are saved in the gamelog.
-- @function Wizard:log
-- @see GameObject:log
-- @tparam string message A string to add to this GameObject's log. Intended for debugging.



-- <<-- Creer-Merge: functions -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
-- if you want to add any client side logic this is where you can add them
-- <<-- /Creer-Merge: functions -->>

return Wizard
