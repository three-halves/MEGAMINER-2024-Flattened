// Package impl contains all the Catastrophe game implimentation logic.
package impl

// To start coding your AI please open ./ai.go

import (
	"errors"
	"joueur/base"
	"joueur/games/catastrophe"
)

// CatastropheNamespace is the collection of implimentation logic for the Catastrophe game.
type CatastropheNamespace struct{}

// Name returns the name of the Catastrophe game.
func (*CatastropheNamespace) Name() string {
	return "Catastrophe"
}

// Version returns the current version hash as last generated for the Catastrophe game.
func (*CatastropheNamespace) Version() string {
	return "9505c0bbaa492df4d508af97a43145523484bdaf07c13499b4e0f10c3560ba27"
}

// PlayerName returns the desired name of the AI in the Catastrophe game.
func (*CatastropheNamespace) PlayerName() string {
	return catastrophe.PlayerName()
}

// CreateGameObject is the factory method for all GameObject instances in the Catastrophe game.
func (*CatastropheNamespace) CreateGameObject(gameObjectName string) (base.DeltaMergeableGameObject, error) {
	switch gameObjectName {
	case "GameObject":
		newGameObject := GameObjectImpl{}
		newGameObject.InitImplDefaults()
		return &newGameObject, nil
	case "Job":
		newJob := JobImpl{}
		newJob.InitImplDefaults()
		return &newJob, nil
	case "Player":
		newPlayer := PlayerImpl{}
		newPlayer.InitImplDefaults()
		return &newPlayer, nil
	case "Structure":
		newStructure := StructureImpl{}
		newStructure.InitImplDefaults()
		return &newStructure, nil
	case "Tile":
		newTile := TileImpl{}
		newTile.InitImplDefaults()
		return &newTile, nil
	case "Unit":
		newUnit := UnitImpl{}
		newUnit.InitImplDefaults()
		return &newUnit, nil
	}
	return nil, errors.New("no game object named '" + gameObjectName + "' for game 'Catastrophe' can be created")
}

// CreateGame is the factory method for Game the Catastrophe game.
func (*CatastropheNamespace) CreateGame() base.DeltaMergeableGame {
	game := GameImpl{}
	game.InitImplDefaults()
	return &game
}

// CreateAI is the factory method for the AI in the Catastrophe game.
func (*CatastropheNamespace) CreateAI() (base.AI, *base.AIImpl) {
	ai := catastrophe.AI{}
	return &ai, &ai.AIImpl
}

func (*CatastropheNamespace) CreateDeltaMerge(deltaMergeImpl *base.DeltaMergeImpl) base.DeltaMerge {
	return &DeltaMergeImpl{
		DeltaMergeImpl: *deltaMergeImpl,
	}
}

// OrderAI handles an order for the AI in the Catastrophe game.
func (*CatastropheNamespace) OrderAI(baseAI base.AI, functionName string, args []interface{}) (interface{}, error) {
	ai, validAI := baseAI.(*catastrophe.AI)
	if !validAI {
		return nil, errors.New("AI is not a valid catastrophe.AI to order!")
	}
	switch functionName {
	case "runTurn":
		return (*ai).RunTurn(), nil
	}

	return nil, errors.New("Cannot find functionName " + functionName + " to run in S{game_name} AI")
}
