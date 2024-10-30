// Package impl contains all the Magomachy game implimentation logic.
package impl

// To start coding your AI please open ./ai.go

import (
	"errors"
	"joueur/base"
	"joueur/games/magomachy"
)

// MagomachyNamespace is the collection of implimentation logic for the Magomachy game.
type MagomachyNamespace struct{}

// Name returns the name of the Magomachy game.
func (*MagomachyNamespace) Name() string {
	return "Magomachy"
}

// Version returns the current version hash as last generated for the Magomachy game.
func (*MagomachyNamespace) Version() string {
	return "65acc66b7843108091108f5cbd212836c6c154d3b2bc4c5e186d4a36d35e5257"
}

// PlayerName returns the desired name of the AI in the Magomachy game.
func (*MagomachyNamespace) PlayerName() string {
	return magomachy.PlayerName()
}

// CreateGameObject is the factory method for all GameObject instances in the Magomachy game.
func (*MagomachyNamespace) CreateGameObject(gameObjectName string) (base.DeltaMergeableGameObject, error) {
	switch gameObjectName {
	case "GameObject":
		newGameObject := GameObjectImpl{}
		newGameObject.InitImplDefaults()
		return &newGameObject, nil
	case "Item":
		newItem := ItemImpl{}
		newItem.InitImplDefaults()
		return &newItem, nil
	case "Player":
		newPlayer := PlayerImpl{}
		newPlayer.InitImplDefaults()
		return &newPlayer, nil
	case "Tile":
		newTile := TileImpl{}
		newTile.InitImplDefaults()
		return &newTile, nil
	case "Wizard":
		newWizard := WizardImpl{}
		newWizard.InitImplDefaults()
		return &newWizard, nil
	}
	return nil, errors.New("no game object named '" + gameObjectName + "' for game 'Magomachy' can be created")
}

// CreateGame is the factory method for Game the Magomachy game.
func (*MagomachyNamespace) CreateGame() base.DeltaMergeableGame {
	game := GameImpl{}
	game.InitImplDefaults()
	return &game
}

// CreateAI is the factory method for the AI in the Magomachy game.
func (*MagomachyNamespace) CreateAI() (base.AI, *base.AIImpl) {
	ai := magomachy.AI{}
	return &ai, &ai.AIImpl
}

func (*MagomachyNamespace) CreateDeltaMerge(deltaMergeImpl *base.DeltaMergeImpl) base.DeltaMerge {
	return &DeltaMergeImpl{
		DeltaMergeImpl: *deltaMergeImpl,
	}
}

// OrderAI handles an order for the AI in the Magomachy game.
func (*MagomachyNamespace) OrderAI(baseAI base.AI, functionName string, args []interface{}) (interface{}, error) {
	ai, validAI := baseAI.(*magomachy.AI)
	if !validAI {
		return nil, errors.New("AI is not a valid magomachy.AI to order!")
	}
	switch functionName {
	case "Action":
		arg0 := args[0].(magomachy.Wizard)
		return (*ai).Action(arg0), nil
	case "Move":
		arg0 := args[0].(magomachy.Wizard)
		return (*ai).Move(arg0), nil
	case "runTurn":
		return (*ai).RunTurn(), nil
	}

	return nil, errors.New("Cannot find functionName " + functionName + " to run in S{game_name} AI")
}
