// Package impl contains all the JungleChess game implimentation logic.
package impl

// To start coding your AI please open ./ai.go

import (
	"errors"
	"joueur/base"
	"joueur/games/jungle_chess"
)

// JungleChessNamespace is the collection of implimentation logic for the JungleChess game.
type JungleChessNamespace struct{}

// Name returns the name of the JungleChess game.
func (*JungleChessNamespace) Name() string {
	return "JungleChess"
}

// Version returns the current version hash as last generated for the JungleChess game.
func (*JungleChessNamespace) Version() string {
	return "0f0b85b33f03a669a391b36c90daa195d028dd1f21f8d4b601adfcf39b23eee2"
}

// PlayerName returns the desired name of the AI in the JungleChess game.
func (*JungleChessNamespace) PlayerName() string {
	return junglechess.PlayerName()
}

// CreateGameObject is the factory method for all GameObject instances in the JungleChess game.
func (*JungleChessNamespace) CreateGameObject(gameObjectName string) (base.DeltaMergeableGameObject, error) {
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
	return nil, errors.New("no game object named '" + gameObjectName + "' for game 'JungleChess' can be created")
}

// CreateGame is the factory method for Game the JungleChess game.
func (*JungleChessNamespace) CreateGame() base.DeltaMergeableGame {
	game := GameImpl{}
	game.InitImplDefaults()
	return &game
}

// CreateAI is the factory method for the AI in the JungleChess game.
func (*JungleChessNamespace) CreateAI() (base.AI, *base.AIImpl) {
	ai := junglechess.AI{}
	return &ai, &ai.AIImpl
}

func (*JungleChessNamespace) CreateDeltaMerge(deltaMergeImpl *base.DeltaMergeImpl) base.DeltaMerge {
	return &DeltaMergeImpl{
		DeltaMergeImpl: *deltaMergeImpl,
	}
}

// OrderAI handles an order for the AI in the JungleChess game.
func (*JungleChessNamespace) OrderAI(baseAI base.AI, functionName string, args []interface{}) (interface{}, error) {
	ai, validAI := baseAI.(*junglechess.AI)
	if !validAI {
		return nil, errors.New("AI is not a valid junglechess.AI to order!")
	}
	switch functionName {
	case "makeMove":
		return (*ai).MakeMove(), nil
	}

	return nil, errors.New("Cannot find functionName " + functionName + " to run in S{game_name} AI")
}
