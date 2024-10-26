package impl

import (
	"errors"
	"joueur/base"
	"joueur/games/magomachy"
)

// PlayerImpl is the struct that implements the container for Player
// instances in Magomachy.
type PlayerImpl struct {
	GameObjectImpl

	clientTypeImpl    string
	lostImpl          bool
	nameImpl          string
	opponentImpl      magomachy.Player
	reasonLostImpl    string
	reasonWonImpl     string
	timeRemainingImpl float64
	wizardImpl        magomachy.Wizard
	wonImpl           bool
}

// ClientType returns what type of client this is, e.g. 'Python',
// 'JavaScript', or some other language. For potential data mining
// purposes.
func (playerImpl *PlayerImpl) ClientType() string {
	return playerImpl.clientTypeImpl
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
func (playerImpl *PlayerImpl) Opponent() magomachy.Player {
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

// Wizard returns the specific wizard owned by the player.
//
// Value can be returned as a nil pointer.
func (playerImpl *PlayerImpl) Wizard() magomachy.Wizard {
	return playerImpl.wizardImpl
}

// Won returns if the player won the game or not.
func (playerImpl *PlayerImpl) Won() bool {
	return playerImpl.wonImpl
}

// ChooseWizard runs logic that this is called when you need to pick your
// wizard class.
func (playerImpl *PlayerImpl) ChooseWizard(wizardClass string) bool {
	return playerImpl.RunOnServer("chooseWizard", map[string]interface{}{
		"wizardClass": wizardClass,
	}).(bool)
}

// InitImplDefaults initializes safe defaults for all fields in Player.
func (playerImpl *PlayerImpl) InitImplDefaults() {
	playerImpl.GameObjectImpl.InitImplDefaults()

	playerImpl.clientTypeImpl = ""
	playerImpl.lostImpl = true
	playerImpl.nameImpl = ""
	playerImpl.opponentImpl = nil
	playerImpl.reasonLostImpl = ""
	playerImpl.reasonWonImpl = ""
	playerImpl.timeRemainingImpl = 0
	playerImpl.wizardImpl = nil
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

	magomachyDeltaMerge, ok := deltaMerge.(DeltaMerge)
	if !ok {
		return false, errors.New(
			"deltaMerge is not the expected type of: " +
				"'magomachy.impl.DeltaMerge'",
		)
	}

	switch attribute {
	case "clientType":
		playerImpl.clientTypeImpl = magomachyDeltaMerge.String(delta)
		return true, nil
	case "lost":
		playerImpl.lostImpl = magomachyDeltaMerge.Boolean(delta)
		return true, nil
	case "name":
		playerImpl.nameImpl = magomachyDeltaMerge.String(delta)
		return true, nil
	case "opponent":
		playerImpl.opponentImpl = magomachyDeltaMerge.Player(delta)
		return true, nil
	case "reasonLost":
		playerImpl.reasonLostImpl = magomachyDeltaMerge.String(delta)
		return true, nil
	case "reasonWon":
		playerImpl.reasonWonImpl = magomachyDeltaMerge.String(delta)
		return true, nil
	case "timeRemaining":
		playerImpl.timeRemainingImpl = magomachyDeltaMerge.Float(delta)
		return true, nil
	case "wizard":
		playerImpl.wizardImpl = magomachyDeltaMerge.Wizard(delta)
		return true, nil
	case "won":
		playerImpl.wonImpl = magomachyDeltaMerge.Boolean(delta)
		return true, nil
	}

	return false, nil // no errors in delta merging
}
