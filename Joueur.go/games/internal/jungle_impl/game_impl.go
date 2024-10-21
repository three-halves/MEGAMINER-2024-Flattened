package impl

import (
	"errors"
	"joueur/base"
	"joueur/games/jungle"
)

// GameImpl is the struct that implements the container for Game instances
// in Jungle.
type GameImpl struct {
	base.GameImpl

	fenImpl         string
	gameObjectsImpl map[string]jungle.GameObject
	historyImpl     []string
	playersImpl     []jungle.Player
	sessionImpl     string
}

// Fen returns forsyth-Edwards Notation (fen), a notation that describes
// the game board state.
func (gameImpl *GameImpl) Fen() string {
	return gameImpl.fenImpl
}

// GameObjects returns a mapping of every game object's ID to the actual
// game object. Primarily used by the server and client to easily refer to
// the game objects via ID.
func (gameImpl *GameImpl) GameObjects() map[string]jungle.GameObject {
	return gameImpl.gameObjectsImpl
}

// History returns the array of [known] moves that have occurred in the
// game, in a format. The first element is the first move, with the last
// element being the most recent.
func (gameImpl *GameImpl) History() []string {
	return gameImpl.historyImpl
}

// Players returns array of all the players in the game.
func (gameImpl *GameImpl) Players() []jungle.Player {
	return gameImpl.playersImpl
}

// Session returns a unique identifier for the game instance that is being
// played.
func (gameImpl *GameImpl) Session() string {
	return gameImpl.sessionImpl
}

// InitImplDefaults initializes safe defaults for all fields in Game.
func (gameImpl *GameImpl) InitImplDefaults() {
	gameImpl.GameImpl.InitImplDefaults()

	gameImpl.fenImpl = ""
	gameImpl.gameObjectsImpl = make(map[string]jungle.GameObject)
	gameImpl.historyImpl = []string{}
	gameImpl.playersImpl = []jungle.Player{}
	gameImpl.sessionImpl = ""
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

	jungleDeltaMerge, ok := deltaMerge.(DeltaMerge)
	if !ok {
		return false, errors.New(
			"deltaMerge is not the expected type of: " +
				"'jungle.impl.DeltaMerge'",
		)
	}

	switch attribute {
	case "fen":
		gameImpl.fenImpl = jungleDeltaMerge.String(delta)
		return true, nil
	case "gameObjects":
		gameImpl.gameObjectsImpl = jungleDeltaMerge.MapOfStringToGameObject(&gameImpl.gameObjectsImpl, delta)
		return true, nil
	case "history":
		gameImpl.historyImpl = jungleDeltaMerge.ArrayOfString(&gameImpl.historyImpl, delta)
		return true, nil
	case "players":
		gameImpl.playersImpl = jungleDeltaMerge.ArrayOfPlayer(&gameImpl.playersImpl, delta)
		return true, nil
	case "session":
		gameImpl.sessionImpl = jungleDeltaMerge.String(delta)
		return true, nil
	}

	return false, nil // no errors in delta merging
}
