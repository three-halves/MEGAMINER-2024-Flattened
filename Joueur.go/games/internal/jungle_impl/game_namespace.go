// Package impl contains all the Jungle game implimentation logic.
package impl

// To start coding your AI please open ./ai.go

import (
	"errors"
	"joueur/base"
	"joueur/games/jungle"
)

// JungleNamespace is the collection of implimentation logic for the Jungle game.
type JungleNamespace struct{}

// Name returns the name of the Jungle game.
func (*JungleNamespace) Name() string {
	return "Jungle"
}

// Version returns the current version hash as last generated for the Jungle game.
func (*JungleNamespace) Version() string {
	return "28f5663518c163e31771d87c52277b0c3f74033d97f89c1a234de5e6a15f6390"
}

// PlayerName returns the desired name of the AI in the Jungle game.
func (*JungleNamespace) PlayerName() string {
	return jungle.PlayerName()
}

// CreateGameObject is the factory method for all GameObject instances in the Jungle game.
func (*JungleNamespace) CreateGameObject(gameObjectName string) (base.DeltaMergeableGameObject, error) {
	switch gameObjectName {
	case "GameObject":
		newGameObject := GameObjectImpl{}
		newGameObject.InitImplDefaults()
		return &newGameObject, nil
	case "Player":
		newPlayer := PlayerImpl{}
		newPlayer.InitImplDefaults()
		return &newPlayer, nil
	}
	return nil, errors.New("no game object named '" + gameObjectName + "' for game 'Jungle' can be created")
}

// CreateGame is the factory method for Game the Jungle game.
func (*JungleNamespace) CreateGame() base.DeltaMergeableGame {
	game := GameImpl{}
	game.InitImplDefaults()
	return &game
}

// CreateAI is the factory method for the AI in the Jungle game.
func (*JungleNamespace) CreateAI() (base.AI, *base.AIImpl) {
	ai := jungle.AI{}
	return &ai, &ai.AIImpl
}

func (*JungleNamespace) CreateDeltaMerge(deltaMergeImpl *base.DeltaMergeImpl) base.DeltaMerge {
	return &DeltaMergeImpl{
		DeltaMergeImpl: *deltaMergeImpl,
	}
}

// OrderAI handles an order for the AI in the Jungle game.
func (*JungleNamespace) OrderAI(baseAI base.AI, functionName string, args []interface{}) (interface{}, error) {
	ai, validAI := baseAI.(*jungle.AI)
	if !validAI {
		return nil, errors.New("AI is not a valid jungle.AI to order!")
	}
	switch functionName {
	case "makeMove":
		return (*ai).MakeMove(), nil
	}

	return nil, errors.New("Cannot find functionName " + functionName + " to run in S{game_name} AI")
}
