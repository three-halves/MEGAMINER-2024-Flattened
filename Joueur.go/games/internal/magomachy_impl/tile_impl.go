package impl

import (
	"errors"
	"joueur/base"
	"joueur/games/magomachy"
)

// TileImpl is the struct that implements the container for Tile instances
// in Magomachy.
type TileImpl struct {
	GameObjectImpl

	objectImpl    magomachy.Item
	tileEastImpl  magomachy.Tile
	tileNorthImpl magomachy.Tile
	tileSouthImpl magomachy.Tile
	tileWestImpl  magomachy.Tile
	typeImpl      string
	wizardImpl    magomachy.Wizard
	xImpl         int64
	yImpl         int64
}

// Object returns the Item on this Tile if present, otherwise nil.
//
// Value can be returned as a nil pointer.
func (tileImpl *TileImpl) Object() magomachy.Item {
	return tileImpl.objectImpl
}

// TileEast returns the Tile to the 'East' of this one (x+1, y). Nil if out
// of bounds of the map.
//
// Value can be returned as a nil pointer.
func (tileImpl *TileImpl) TileEast() magomachy.Tile {
	return tileImpl.tileEastImpl
}

// TileNorth returns the Tile to the 'North' of this one (x, y-1). Nil if
// out of bounds of the map.
//
// Value can be returned as a nil pointer.
func (tileImpl *TileImpl) TileNorth() magomachy.Tile {
	return tileImpl.tileNorthImpl
}

// TileSouth returns the Tile to the 'South' of this one (x, y+1). Nil if
// out of bounds of the map.
//
// Value can be returned as a nil pointer.
func (tileImpl *TileImpl) TileSouth() magomachy.Tile {
	return tileImpl.tileSouthImpl
}

// TileWest returns the Tile to the 'West' of this one (x-1, y). Nil if out
// of bounds of the map.
//
// Value can be returned as a nil pointer.
func (tileImpl *TileImpl) TileWest() magomachy.Tile {
	return tileImpl.tileWestImpl
}

// Type returns the type of Tile this is (i.e Grass, Wall).
//
// Literal Values: "floor" or "wall"
func (tileImpl *TileImpl) Type() string {
	return tileImpl.typeImpl
}

// Wizard returns the Wizard on this Tile if present, otherwise nil.
//
// Value can be returned as a nil pointer.
func (tileImpl *TileImpl) Wizard() magomachy.Wizard {
	return tileImpl.wizardImpl
}

// X returns the x (horizontal) position of this Tile.
func (tileImpl *TileImpl) X() int64 {
	return tileImpl.xImpl
}

// Y returns the y (vertical) position of this Tile.
func (tileImpl *TileImpl) Y() int64 {
	return tileImpl.yImpl
}

// InitImplDefaults initializes safe defaults for all fields in Tile.
func (tileImpl *TileImpl) InitImplDefaults() {
	tileImpl.GameObjectImpl.InitImplDefaults()

	tileImpl.objectImpl = nil
	tileImpl.tileEastImpl = nil
	tileImpl.tileNorthImpl = nil
	tileImpl.tileSouthImpl = nil
	tileImpl.tileWestImpl = nil
	tileImpl.typeImpl = ""
	tileImpl.wizardImpl = nil
	tileImpl.xImpl = 0
	tileImpl.yImpl = 0
}

// DeltaMerge merges the delta for a given attribute in Tile.
func (tileImpl *TileImpl) DeltaMerge(
	deltaMerge base.DeltaMerge,
	attribute string,
	delta interface{},
) (bool, error) {
	merged, err := tileImpl.GameObjectImpl.DeltaMerge(
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
	case "object":
		tileImpl.objectImpl = magomachyDeltaMerge.Item(delta)
		return true, nil
	case "tileEast":
		tileImpl.tileEastImpl = magomachyDeltaMerge.Tile(delta)
		return true, nil
	case "tileNorth":
		tileImpl.tileNorthImpl = magomachyDeltaMerge.Tile(delta)
		return true, nil
	case "tileSouth":
		tileImpl.tileSouthImpl = magomachyDeltaMerge.Tile(delta)
		return true, nil
	case "tileWest":
		tileImpl.tileWestImpl = magomachyDeltaMerge.Tile(delta)
		return true, nil
	case "type":
		tileImpl.typeImpl = magomachyDeltaMerge.String(delta)
		return true, nil
	case "wizard":
		tileImpl.wizardImpl = magomachyDeltaMerge.Wizard(delta)
		return true, nil
	case "x":
		tileImpl.xImpl = magomachyDeltaMerge.Int(delta)
		return true, nil
	case "y":
		tileImpl.yImpl = magomachyDeltaMerge.Int(delta)
		return true, nil
	}

	return false, nil // no errors in delta merging
}

// -- Tiled Game Utils -- \\

// GetNeighbors returns an array of the neighbors of this Tile.
func (tileImpl *TileImpl) GetNeighbors() []magomachy.Tile {
	neighbors := []magomachy.Tile{}

	if tileImpl.tileNorthImpl != nil {
		neighbors = append(neighbors, tileImpl.tileNorthImpl)
	}

	if tileImpl.tileEastImpl != nil {
		neighbors = append(neighbors, tileImpl.tileEastImpl)
	}

	if tileImpl.tileSouthImpl != nil {
		neighbors = append(neighbors, tileImpl.tileSouthImpl)
	}

	if tileImpl.tileWestImpl != nil {
		neighbors = append(neighbors, tileImpl.tileWestImpl)
	}

	return neighbors
}

// IsPathable returns if the Tile is pathable for FindPath
func (tileImpl *TileImpl) IsPathable() bool {
	// <<-- Creer-Merge: is-pathable -->>
	return false // TODO: developer add game logic here!
	// <<-- /Creer-Merge: is-pathable -->>
}

// HasNeighbor checks if this Tile has a specific neighboring Tile.
func (tileImpl *TileImpl) HasNeighbor(tile magomachy.Tile) bool {
	return tile != nil &&
		(tileImpl.tileNorthImpl == tile ||
			tileImpl.tileEastImpl == tile ||
			tileImpl.tileSouthImpl == tile ||
			tileImpl.tileWestImpl == tile)
}
