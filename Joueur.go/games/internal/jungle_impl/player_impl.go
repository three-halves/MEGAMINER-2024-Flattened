package impl

import (
	"errors"
	"joueur/base"
	"joueur/games/jungle"
)

// PlayerImpl is the struct that implements the container for Player
// instances in Jungle.
type PlayerImpl struct {
	GameObjectImpl

	clientTypeImpl    string
	colorImpl         string
	lostImpl          bool
	nameImpl          string
	opponentImpl      jungle.Player
	reasonLostImpl    string
	reasonWonImpl     string
	timeRemainingImpl float64
	wonImpl           bool
}

// ClientType returns what type of client this is, e.g. 'Python',
// 'JavaScript', or some other language. For potential data mining
// purposes.
func (playerImpl *PlayerImpl) ClientType() string {
	return playerImpl.clientTypeImpl
}

// Color returns a coin flip will decide if 'player1' or 'player2' will go
// first.
//
// Literal Values: "Player1" or "Player2"
func (playerImpl *PlayerImpl) Color() string {
	return playerImpl.colorImpl
}

// Lost returns if the player lost the game or not.
func (playerImpl *PlayerImpl) Lost() bool {
	return playerImpl.lostImpl
}

// Name returns the name of the player.
func (playerImpl *PlayerImpl) Name() string {
	return playerImpl.nameImpl
}

// Opponent returns this player's opponent in the game.
func (playerImpl *PlayerImpl) Opponent() jungle.Player {
	return playerImpl.opponentImpl
}

// ReasonLost returns the reason why the player lost the game.
func (playerImpl *PlayerImpl) ReasonLost() string {
	return playerImpl.reasonLostImpl
}

// ReasonWon returns the reason why the player won the game.
func (playerImpl *PlayerImpl) ReasonWon() string {
	return playerImpl.reasonWonImpl
}

// TimeRemaining returns the amount of time (in ns) remaining for this AI
// to send commands.
func (playerImpl *PlayerImpl) TimeRemaining() float64 {
	return playerImpl.timeRemainingImpl
}

// Won returns if the player won the game or not.
func (playerImpl *PlayerImpl) Won() bool {
	return playerImpl.wonImpl
}

// InitImplDefaults initializes safe defaults for all fields in Player.
func (playerImpl *PlayerImpl) InitImplDefaults() {
	playerImpl.GameObjectImpl.InitImplDefaults()

	playerImpl.clientTypeImpl = ""
	playerImpl.colorImpl = ""
	playerImpl.lostImpl = true
	playerImpl.nameImpl = ""
	playerImpl.opponentImpl = nil
	playerImpl.reasonLostImpl = ""
	playerImpl.reasonWonImpl = ""
	playerImpl.timeRemainingImpl = 0
	playerImpl.wonImpl = true
}

// DeltaMerge merges the delta for a given attribute in Player.
func (playerImpl *PlayerImpl) DeltaMerge(
	deltaMerge base.DeltaMerge,
	attribute string,
	delta interface{},
) (bool, error) {
	merged, err := playerImpl.GameObjectImpl.DeltaMerge(
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
	case "clientType":
		playerImpl.clientTypeImpl = jungleDeltaMerge.String(delta)
		return true, nil
	case "color":
		playerImpl.colorImpl = jungleDeltaMerge.String(delta)
		return true, nil
	case "lost":
		playerImpl.lostImpl = jungleDeltaMerge.Boolean(delta)
		return true, nil
	case "name":
		playerImpl.nameImpl = jungleDeltaMerge.String(delta)
		return true, nil
	case "opponent":
		playerImpl.opponentImpl = jungleDeltaMerge.Player(delta)
		return true, nil
	case "reasonLost":
		playerImpl.reasonLostImpl = jungleDeltaMerge.String(delta)
		return true, nil
	case "reasonWon":
		playerImpl.reasonWonImpl = jungleDeltaMerge.String(delta)
		return true, nil
	case "timeRemaining":
		playerImpl.timeRemainingImpl = jungleDeltaMerge.Float(delta)
		return true, nil
	case "won":
		playerImpl.wonImpl = jungleDeltaMerge.Boolean(delta)
		return true, nil
	}

	return false, nil // no errors in delta merging
}
