package impl

import (
	"joueur/base"
	"joueur/games/jungleChess"
)

// DeltaMerge is the set of functions that can delta merge a
// JungleChess game.
type DeltaMerge interface {
	base.DeltaMerge

	GameObject(interface{}) junglechess.GameObject
	Player(interface{}) junglechess.Player

	ArrayOfPlayer(*[]junglechess.Player, interface{}) []junglechess.Player
	ArrayOfString(*[]string, interface{}) []string
	MapOfStringToGameObject(*map[string]junglechess.GameObject, interface{}) map[string]junglechess.GameObject
}

// DeltaMergeImpl is the implimentation struct for the DeltaMerge interface.
type DeltaMergeImpl struct {
	base.DeltaMergeImpl
}

// -- JungleChess Game Object Deltas -- \\

// GameObject attempts to return the instance of GameObject
// for the given Delta.
func (deltaMergeImpl *DeltaMergeImpl) GameObject(delta interface{}) jungleChess.GameObject {
	baseGameObject := (*deltaMergeImpl).BaseGameObject(delta)
	if baseGameObject == nil {
		return nil
	}

	asGameObject, isGameObject := baseGameObject.(jungleChess.GameObject)
	if !isGameObject {
		(*deltaMergeImpl).CannotConvertDeltaTo("jungleChess.GameObject", delta)
	}

	return asGameObject
}

// Player attempts to return the instance of Player
// for the given Delta.
func (deltaMergeImpl *DeltaMergeImpl) Player(delta interface{}) jungleChess.Player {
	baseGameObject := (*deltaMergeImpl).BaseGameObject(delta)
	if baseGameObject == nil {
		return nil
	}

	asPlayer, isPlayer := baseGameObject.(jungleChess.Player)
	if !isPlayer {
		(*deltaMergeImpl).CannotConvertDeltaTo("jungleChess.Player", delta)
	}

	return asPlayer
}

// -- Deep Deltas -- \\

// ArrayOfPlayer delta attempts to merge
// deep structures of this type.
func (deltaMergeImpl *DeltaMergeImpl) ArrayOfPlayer(state *[]junglechess.Player, delta interface{}) []junglechess.Player {
	deltaList, listLength := (*deltaMergeImpl).ToDeltaArray(delta)
	newArray := make([]junglechess.Player, listLength) // resize array with new copy
	copy(newArray, *state)
	for deltaIndex, deltaValue := range deltaList {
		newArray[deltaIndex] = deltaMergeImpl.Player(deltaValue)
	}
	return newArray
}

// ArrayOfString delta attempts to merge
// deep structures of this type.
func (deltaMergeImpl *DeltaMergeImpl) ArrayOfString(state *[]string, delta interface{}) []string {
	deltaList, listLength := (*deltaMergeImpl).ToDeltaArray(delta)
	newArray := make([]string, listLength) // resize array with new copy
	copy(newArray, *state)
	for deltaIndex, deltaValue := range deltaList {
		newArray[deltaIndex] = deltaMergeImpl.String(deltaValue)
	}
	return newArray
}

// MapOfStringToGameObject delta attempts to merge
// deep structures of this type.
func (deltaMergeImpl *DeltaMergeImpl) MapOfStringToGameObject(state *map[string]junglechess.GameObject, delta interface{}) map[string]junglechess.GameObject {
	deltaMap := (*deltaMergeImpl).ToDeltaMap(delta)
	for deltaKey, deltaValue := range deltaMap {
		if (*deltaMergeImpl).IsDeltaRemoved(deltaValue) {
			delete(*state, deltaKey)
		} else {
			(*state)[deltaKey] = deltaMergeImpl.GameObject(deltaValue)
		}
	}
	return *state
}
