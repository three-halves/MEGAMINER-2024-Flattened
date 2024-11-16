package impl

import (
	"errors"
	"joueur/base"
	"joueur/games/magomachy"
)

// GameImpl is the struct that implements the container for Game instances
// in Magomachy.
type GameImpl struct {
	base.GameImpl

	currentPlayerImpl    magomachy.Player
	currentTurnImpl      int64
	gameObjectsImpl      map[string]magomachy.GameObject
	mapHeightImpl        int64
	mapWidthImpl         int64
	maxTurnsImpl         int64
	playersImpl          []magomachy.Player
	sessionImpl          string
	tilesImpl            []magomachy.Tile
	timeAddedPerTurnImpl float64
	wizardTileOneImpl    magomachy.Tile
	wizardTileTwoImpl    magomachy.Tile
	wizardsImpl          []string
}

// CurrentPlayer returns the player whose turn it is currently. That player
// can send commands. Other players cannot.
func (gameImpl *GameImpl) CurrentPlayer() magomachy.Player {
	return gameImpl.currentPlayerImpl
}

// CurrentTurn returns the current turn number, starting at 0 for the first
// player's turn.
func (gameImpl *GameImpl) CurrentTurn() int64 {
	return gameImpl.currentTurnImpl
}

// GameObjects returns a mapping of every game object's ID to the actual
// game object. Primarily used by the server and client to easily refer to
// the game objects via ID.
func (gameImpl *GameImpl) GameObjects() map[string]magomachy.GameObject {
	return gameImpl.gameObjectsImpl
}

// MapHeight returns the number of Tiles in the map along the y (vertical)
// axis.
func (gameImpl *GameImpl) MapHeight() int64 {
	return gameImpl.mapHeightImpl
}

// MapWidth returns the number of Tiles in the map along the x (horizontal)
// axis.
func (gameImpl *GameImpl) MapWidth() int64 {
	return gameImpl.mapWidthImpl
}

// MaxTurns returns the maximum number of turns before the game will
// automatically end.
func (gameImpl *GameImpl) MaxTurns() int64 {
	return gameImpl.maxTurnsImpl
}

// Players returns array of all the players in the game.
func (gameImpl *GameImpl) Players() []magomachy.Player {
	return gameImpl.playersImpl
}

// Session returns a unique identifier for the game instance that is being
// played.
func (gameImpl *GameImpl) Session() string {
	return gameImpl.sessionImpl
}

// Tiles returns all the tiles in the map, stored in Row-major order. Use
// `x + y * mapWidth` to access the correct index.
func (gameImpl *GameImpl) Tiles() []magomachy.Tile {
	return gameImpl.tilesImpl
}

// TimeAddedPerTurn returns the amount of time (in nano-seconds) added
// after each player performs a turn.
func (gameImpl *GameImpl) TimeAddedPerTurn() float64 {
	return gameImpl.timeAddedPerTurnImpl
}

// WizardTileOne returns where player 1's wizard should be placed.
func (gameImpl *GameImpl) WizardTileOne() magomachy.Tile {
	return gameImpl.wizardTileOneImpl
}

// WizardTileTwo returns where player 2's wizard should be placed.
func (gameImpl *GameImpl) WizardTileTwo() magomachy.Tile {
	return gameImpl.wizardTileTwoImpl
}

// Wizards returns array of wizard choices.
func (gameImpl *GameImpl) Wizards() []string {
	return gameImpl.wizardsImpl
}

// InitImplDefaults initializes safe defaults for all fields in Game.
func (gameImpl *GameImpl) InitImplDefaults() {
	gameImpl.GameImpl.InitImplDefaults()

	gameImpl.currentPlayerImpl = nil
	gameImpl.currentTurnImpl = 0
	gameImpl.gameObjectsImpl = make(map[string]magomachy.GameObject)
	gameImpl.mapHeightImpl = 0
	gameImpl.mapWidthImpl = 0
	gameImpl.maxTurnsImpl = 0
	gameImpl.playersImpl = []magomachy.Player{}
	gameImpl.sessionImpl = ""
	gameImpl.tilesImpl = []magomachy.Tile{}
	gameImpl.timeAddedPerTurnImpl = 0
	gameImpl.wizardTileOneImpl = nil
	gameImpl.wizardTileTwoImpl = nil
	gameImpl.wizardsImpl = []string{}
}

// DeltaMerge merges the delta for a given attribute in Game.
func (gameImpl *GameImpl) DeltaMerge(
	deltaMerge base.DeltaMerge,
	attribute string,
	delta interface{},
) (bool, error) {
	merged, err := gameImpl.GameImpl.DeltaMerge(
		deltaMerge,
		attribute,
		delta,
	)
	if merged || err != nil {
		return merged, err
	}

	magomachyDeltaMerge, ok := deltaMerge.(DeltaMerge)
	if !ok {
		return false, errors.New(
			"deltaMerge is not the expected type of: " +
				"'magomachy.impl.DeltaMerge'",
		)
	}

	switch attribute {
	case "currentPlayer":
		gameImpl.currentPlayerImpl = magomachyDeltaMerge.Player(delta)
		return true, nil
	case "currentTurn":
		gameImpl.currentTurnImpl = magomachyDeltaMerge.Int(delta)
		return true, nil
	case "gameObjects":
		gameImpl.gameObjectsImpl = magomachyDeltaMerge.MapOfStringToGameObject(&gameImpl.gameObjectsImpl, delta)
		return true, nil
	case "mapHeight":
		gameImpl.mapHeightImpl = magomachyDeltaMerge.Int(delta)
		return true, nil
	case "mapWidth":
		gameImpl.mapWidthImpl = magomachyDeltaMerge.Int(delta)
		return true, nil
	case "maxTurns":
		gameImpl.maxTurnsImpl = magomachyDeltaMerge.Int(delta)
		return true, nil
	case "players":
		gameImpl.playersImpl = magomachyDeltaMerge.ArrayOfPlayer(&gameImpl.playersImpl, delta)
		return true, nil
	case "session":
		gameImpl.sessionImpl = magomachyDeltaMerge.String(delta)
		return true, nil
	case "tiles":
		gameImpl.tilesImpl = magomachyDeltaMerge.ArrayOfTile(&gameImpl.tilesImpl, delta)
		return true, nil
	case "timeAddedPerTurn":
		gameImpl.timeAddedPerTurnImpl = magomachyDeltaMerge.Float(delta)
		return true, nil
	case "wizardTileOne":
		gameImpl.wizardTileOneImpl = magomachyDeltaMerge.Tile(delta)
		return true, nil
	case "wizardTileTwo":
		gameImpl.wizardTileTwoImpl = magomachyDeltaMerge.Tile(delta)
		return true, nil
	case "wizards":
		gameImpl.wizardsImpl = magomachyDeltaMerge.ArrayOfString(&gameImpl.wizardsImpl, delta)
		return true, nil
	}

	return false, nil // no errors in delta merging
}

// -- Tiled Game Utils -- \\

// GetTileAt returns the Tile at a give position (x, y).
func (gameImpl *GameImpl) GetTileAt(x int64, y int64) magomachy.Tile {
	if x < 0 || y < 0 || x >= gameImpl.mapWidthImpl || y >= gameImpl.mapHeightImpl {
		// out of bounds
		return nil
	}

	return gameImpl.tilesImpl[x+y*gameImpl.mapWidthImpl]
}
