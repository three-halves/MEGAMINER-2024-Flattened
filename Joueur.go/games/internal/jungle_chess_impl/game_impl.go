package impl

import (
	"errors"
	"joueur/base"
	"joueur/games/jungle_chess"
)

// GameImpl is the struct that implements the container for Game instances
// in JungleChess.
type GameImpl struct {
	base.GameImpl

	gameObjectsImpl map[string]junglechess.GameObject
	historyImpl     []string
	jungleFenImpl   string
	playersImpl     []junglechess.Player
	sessionImpl     string
}

// GameObjects returns a mapping of every game object's ID to the actual
// game object. Primarily used by the server and client to easily refer to
// the game objects via ID.
func (gameImpl *GameImpl) GameObjects() map[string]junglechess.GameObject {
	return gameImpl.gameObjectsImpl
}

// History returns the array of [known] moves that have occurred in the
// game, in a format. The first element is the first move, with the last
// element being the most recent.
func (gameImpl *GameImpl) History() []string {
	return gameImpl.historyImpl
}

// JungleFen returns the jungleFen is similar to the chess FEN, the order
// looks like this, board (split into rows by '/'), whose turn it is, half
// move, and full move.
func (gameImpl *GameImpl) JungleFen() string {
	return gameImpl.jungleFenImpl
}

// Players returns array of all the players in the game.
func (gameImpl *GameImpl) Players() []junglechess.Player {
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

	gameImpl.gameObjectsImpl = make(map[string]junglechess.GameObject)
	gameImpl.historyImpl = []string{}
	gameImpl.jungleFenImpl = ""
	gameImpl.playersImpl = []junglechess.Player{}
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

	junglechessDeltaMerge, ok := deltaMerge.(DeltaMerge)
	if !ok {
		return false, errors.New(
			"deltaMerge is not the expected type of: " +
				"'junglechess.impl.DeltaMerge'",
		)
	}

	switch attribute {
	case "gameObjects":
		gameImpl.gameObjectsImpl = junglechessDeltaMerge.MapOfStringToGameObject(&gameImpl.gameObjectsImpl, delta)
		return true, nil
	case "history":
		gameImpl.historyImpl = junglechessDeltaMerge.ArrayOfString(&gameImpl.historyImpl, delta)
		return true, nil
	case "jungleFen":
		gameImpl.jungleFenImpl = junglechessDeltaMerge.String(delta)
		return true, nil
	case "players":
		gameImpl.playersImpl = junglechessDeltaMerge.ArrayOfPlayer(&gameImpl.playersImpl, delta)
		return true, nil
	case "session":
		gameImpl.sessionImpl = junglechessDeltaMerge.String(delta)
		return true, nil
	}

	return false, nil // no errors in delta merging
}
