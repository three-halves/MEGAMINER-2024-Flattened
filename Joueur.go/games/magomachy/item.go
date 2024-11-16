package magomachy

// Item is objects that help the players.
type Item interface {
	// Parent interfaces
	GameObject

	// -- Attributes -- \\

	// Form is the type of Item this is.
	Form() string

	// Lifetime is how many turns this item has existed for.
	Lifetime() int64

	// MaxLife is how long the item is allowed to last for.
	//
	// Value can be returned as a nil pointer.
	MaxLife() int64

	// ObjectSpawn is what item spawns on this tile.
	//
	// Value can be returned as a nil pointer.
	ObjectSpawn() string

	// SpawnTimer is turns until item should spawn.
	//
	// Value can be returned as a nil pointer.
	SpawnTimer() int64

	// Tile is the Tile this Item is on.
	Tile() Tile
}
