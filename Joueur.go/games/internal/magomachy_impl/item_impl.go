package impl

import (
	"errors"
	"joueur/base"
	"joueur/games/magomachy"
)

// ItemImpl is the struct that implements the container for Item instances
// in Magomachy.
type ItemImpl struct {
	GameObjectImpl

	formImpl        string
	lifetimeImpl    int64
	maxLifeImpl     int64
	objectSpawnImpl string
	spawnTimerImpl  int64
	tileImpl        magomachy.Tile
}

// Form returns the type of Item this is.
func (itemImpl *ItemImpl) Form() string {
	return itemImpl.formImpl
}

// Lifetime returns how many turns this item has existed for.
func (itemImpl *ItemImpl) Lifetime() int64 {
	return itemImpl.lifetimeImpl
}

// MaxLife returns how long the item is allowed to last for.
//
// Value can be returned as a nil pointer.
func (itemImpl *ItemImpl) MaxLife() int64 {
	return itemImpl.maxLifeImpl
}

// ObjectSpawn returns what item spawns on this tile.
//
// Value can be returned as a nil pointer.
func (itemImpl *ItemImpl) ObjectSpawn() string {
	return itemImpl.objectSpawnImpl
}

// SpawnTimer returns turns until item should spawn.
//
// Value can be returned as a nil pointer.
func (itemImpl *ItemImpl) SpawnTimer() int64 {
	return itemImpl.spawnTimerImpl
}

// Tile returns the Tile this Item is on.
func (itemImpl *ItemImpl) Tile() magomachy.Tile {
	return itemImpl.tileImpl
}

// InitImplDefaults initializes safe defaults for all fields in Item.
func (itemImpl *ItemImpl) InitImplDefaults() {
	itemImpl.GameObjectImpl.InitImplDefaults()

	itemImpl.formImpl = ""
	itemImpl.lifetimeImpl = 0
	itemImpl.maxLifeImpl = 0
	itemImpl.objectSpawnImpl = ""
	itemImpl.spawnTimerImpl = 0
	itemImpl.tileImpl = nil
}

// DeltaMerge merges the delta for a given attribute in Item.
func (itemImpl *ItemImpl) DeltaMerge(
	deltaMerge base.DeltaMerge,
	attribute string,
	delta interface{},
) (bool, error) {
	merged, err := itemImpl.GameObjectImpl.DeltaMerge(
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
	case "form":
		itemImpl.formImpl = magomachyDeltaMerge.String(delta)
		return true, nil
	case "lifetime":
		itemImpl.lifetimeImpl = magomachyDeltaMerge.Int(delta)
		return true, nil
	case "maxLife":
		itemImpl.maxLifeImpl = magomachyDeltaMerge.Int(delta)
		return true, nil
	case "objectSpawn":
		itemImpl.objectSpawnImpl = magomachyDeltaMerge.String(delta)
		return true, nil
	case "spawnTimer":
		itemImpl.spawnTimerImpl = magomachyDeltaMerge.Int(delta)
		return true, nil
	case "tile":
		itemImpl.tileImpl = magomachyDeltaMerge.Tile(delta)
		return true, nil
	}

	return false, nil // no errors in delta merging
}
