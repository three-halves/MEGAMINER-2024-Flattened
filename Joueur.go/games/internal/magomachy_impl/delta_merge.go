package impl

import (
	"joueur/base"
	"joueur/games/magomachy"
)

// DeltaMerge is the set of functions that can delta merge a
// Magomachy game.
type DeltaMerge interface {
	base.DeltaMerge

	GameObject(interface{}) magomachy.GameObject
	Item(interface{}) magomachy.Item
	Player(interface{}) magomachy.Player
	Tile(interface{}) magomachy.Tile
	Wizard(interface{}) magomachy.Wizard

	ArrayOfInt(*[]int64, interface{}) []int64
	ArrayOfPlayer(*[]magomachy.Player, interface{}) []magomachy.Player
	ArrayOfString(*[]string, interface{}) []string
	ArrayOfTile(*[]magomachy.Tile, interface{}) []magomachy.Tile
	MapOfStringToGameObject(*map[string]magomachy.GameObject, interface{}) map[string]magomachy.GameObject
}

// DeltaMergeImpl is the implimentation struct for the DeltaMerge interface.
type DeltaMergeImpl struct {
	base.DeltaMergeImpl
}

// -- Magomachy Game Object Deltas -- \\

// GameObject attempts to return the instance of GameObject
// for the given Delta.
func (deltaMergeImpl *DeltaMergeImpl) GameObject(delta interface{}) magomachy.GameObject {
	baseGameObject := (*deltaMergeImpl).BaseGameObject(delta)
	if baseGameObject == nil {
		return nil
	}

	asGameObject, isGameObject := baseGameObject.(magomachy.GameObject)
	if !isGameObject {
		(*deltaMergeImpl).CannotConvertDeltaTo("magomachy.GameObject", delta)
	}

	return asGameObject
}

// Item attempts to return the instance of Item
// for the given Delta.
func (deltaMergeImpl *DeltaMergeImpl) Item(delta interface{}) magomachy.Item {
	baseGameObject := (*deltaMergeImpl).BaseGameObject(delta)
	if baseGameObject == nil {
		return nil
	}

	asItem, isItem := baseGameObject.(magomachy.Item)
	if !isItem {
		(*deltaMergeImpl).CannotConvertDeltaTo("magomachy.Item", delta)
	}

	return asItem
}

// Player attempts to return the instance of Player
// for the given Delta.
func (deltaMergeImpl *DeltaMergeImpl) Player(delta interface{}) magomachy.Player {
	baseGameObject := (*deltaMergeImpl).BaseGameObject(delta)
	if baseGameObject == nil {
		return nil
	}

	asPlayer, isPlayer := baseGameObject.(magomachy.Player)
	if !isPlayer {
		(*deltaMergeImpl).CannotConvertDeltaTo("magomachy.Player", delta)
	}

	return asPlayer
}

// Tile attempts to return the instance of Tile
// for the given Delta.
func (deltaMergeImpl *DeltaMergeImpl) Tile(delta interface{}) magomachy.Tile {
	baseGameObject := (*deltaMergeImpl).BaseGameObject(delta)
	if baseGameObject == nil {
		return nil
	}

	asTile, isTile := baseGameObject.(magomachy.Tile)
	if !isTile {
		(*deltaMergeImpl).CannotConvertDeltaTo("magomachy.Tile", delta)
	}

	return asTile
}

// Wizard attempts to return the instance of Wizard
// for the given Delta.
func (deltaMergeImpl *DeltaMergeImpl) Wizard(delta interface{}) magomachy.Wizard {
	baseGameObject := (*deltaMergeImpl).BaseGameObject(delta)
	if baseGameObject == nil {
		return nil
	}

	asWizard, isWizard := baseGameObject.(magomachy.Wizard)
	if !isWizard {
		(*deltaMergeImpl).CannotConvertDeltaTo("magomachy.Wizard", delta)
	}

	return asWizard
}

// -- Deep Deltas -- \\

// ArrayOfInt delta attempts to merge
// deep structures of this type.
func (deltaMergeImpl *DeltaMergeImpl) ArrayOfInt(state *[]int64, delta interface{}) []int64 {
	deltaList, listLength := (*deltaMergeImpl).ToDeltaArray(delta)
	newArray := make([]int64, listLength) // resize array with new copy
	copy(newArray, *state)
	for deltaIndex, deltaValue := range deltaList {
		newArray[deltaIndex] = deltaMergeImpl.Int(deltaValue)
	}
	return newArray
}

// ArrayOfPlayer delta attempts to merge
// deep structures of this type.
func (deltaMergeImpl *DeltaMergeImpl) ArrayOfPlayer(state *[]magomachy.Player, delta interface{}) []magomachy.Player {
	deltaList, listLength := (*deltaMergeImpl).ToDeltaArray(delta)
	newArray := make([]magomachy.Player, listLength) // resize array with new copy
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

// ArrayOfTile delta attempts to merge
// deep structures of this type.
func (deltaMergeImpl *DeltaMergeImpl) ArrayOfTile(state *[]magomachy.Tile, delta interface{}) []magomachy.Tile {
	deltaList, listLength := (*deltaMergeImpl).ToDeltaArray(delta)
	newArray := make([]magomachy.Tile, listLength) // resize array with new copy
	copy(newArray, *state)
	for deltaIndex, deltaValue := range deltaList {
		newArray[deltaIndex] = deltaMergeImpl.Tile(deltaValue)
	}
	return newArray
}

// MapOfStringToGameObject delta attempts to merge
// deep structures of this type.
func (deltaMergeImpl *DeltaMergeImpl) MapOfStringToGameObject(state *map[string]magomachy.GameObject, delta interface{}) map[string]magomachy.GameObject {
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
